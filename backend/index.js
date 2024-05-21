const port = 4000;
// Have to initialize dependencies and modules that we imported
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json()); // whatever request we get through response will be automatically parsed through json
app.use(cors()); // our ReactJS project will connect to express app we made on port 4000

// initialize DB
// Database connection with MongoDB. Added "e-commerce" at the end
mongoose.connect("mongodb+srv://kevdev:WhatNowH0H@cluster0.qfgwvnt.mongodb.net/ecommerce")

// API endpoint creation
// Go to home page and ensure the app is running
app.get("/", (req, res)=> {
    res.send("Express App is Running")
})

// Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage:storage })

// Creating upload endpoint for images
app.use('/images', express.static('upload/images'))

app.post("/upload", upload.single('product'), (req, res)=>{
    res.json({
        success:1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

// Schema for Creating Products (in MongoDB)
const Product = mongoose.model("Product", {
    id:{
        type: Number,
        require: true,
    },
    name:{
        type: String,
        require: true,
    },
    image:{
        type: String,
        require: true,
    },
    category:{
        type: String,
        require: true,
    },
    new_price:{
        type: Number,
        require: true,
    },
    old_price:{
        type: Number,
        require: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    available:{
        type: Boolean,
        default: true,
    },
})

app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if(products.length > 0){
        // this gets the last product added to the array
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } 
    else{
        id = 1;
    }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    // save product in database.
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name,
    })
})

// Creating API For Deleting Products
app.post('/removeproduct', async (req, res)=>{
    await Product.findOneAndDelete({id: req.body.id});
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name,
    });
})

// Creating API for getting all products
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})


// Schema creation for User Model
const Users = mongoose.model('Users', {
    name:{
        type: String,
    },
    email:{
        type: String,
        unique: true,
    },
    password:{
        type: String,
    },
    cartData:{
        type: Object,
    },
    date:{
        type: Date,
        default: Date.now,
    }
})

// Creating Endpoint for registering the User
app.post('/signup', async (req, res) => {

    let check = await Users.findOne({email: req.body.email});
    // check to see if an account with the given email exists. Throw an error if it does
    if (check) {
        return res.status(400).json({success: false, errors:"Existing user found with input email address"})
    }
    // create cart object and make it empty
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    // create user
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })

    // save user to DB
    await user.save();

    const data = {
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data,'secret_ecom');
    res.json({success: true, token})

})

// Creating Endpoint for user login
app.post('/login', async (req, res) => {
    // search for the user associated with the email id
    let user = await Users.findOne({email: req.body.email});

    if(user){
        // compare if the password in the request and the password saved in the DB are the same. If so, then passCompare = true
        const passCompare = req.body.password === user.password;
        if (passCompare){
            // if password is correct, create user object. Give a success message and the token for the action
            const data = {
                user:{
                    id: user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success: true, token})
        }
        else{
            res.json({success: false, errors:"Wrong password."});
        }
    }
    else{
        res.json({success: false, errors:"Wrong email address."})
    }
})

// Creating Endpoint for New Collection Data
app.get('/newcollections', async (req, res) => {
    let products = await Product.find({});
    // the .slice(-8) gets the 8 most recent products
    let newcollection = products.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection);
})


// Creating Endpoint for Popular in Women Section
app.get('/popularinwomen', async (req, res) => {
    let products = await Product.find({category: 'women'});
    let popular_in_women = products.slice(0, 4);
    console.log("popular in women fetched");
    res.send(popular_in_women);
})


// Creating middleware to fetch user
    const fetchUser = async (req, res, next) => {
        const token = req.header('auth-token');
        if (!token) {
            res.status(401).send({errors:"Please authenticate using valid token"})
        }
        else {
            try {
                // check if the auth token is legitimate (it's a user who signed up) and get the user data from the req
                const data = jwt.verify(token, 'secret_ecom');
                req.user = data.user;
                next();
            } catch(error) {
                res.status(401).send({errors:"Please authenticate using a valid token"})
            }
        }
    }


// Creating Endpoint for Adding Products in CartData
app.post('/addtocart', fetchUser, async (req, res) => {
    console.log("Added ", req.body.itemId)
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData: userData.cartData});
    res.send("Added")
})


// Creating Endpoint to Remove Product from CartData
app.post('/removefromcart', fetchUser, async (req, res) => {
    console.log("Removed ", req.body.itemId)
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData: userData.cartData});
    res.send("Removed")
})


// get a message in the terminal to tell you if the app is running successfully on the given port, or if there are errors
app.listen(port, (error)=> {
    if(!error) {
        console.log("Server Running on Port " + port)
    }
    else {
        console.log("Error: " + error)
    }
})