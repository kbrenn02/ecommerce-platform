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


// get a message in the terminal to tell you if the app is running successfully on the given port, or if there are errors
app.listen(port, (error)=> {
    if(!error) {
        console.log("Server Running on Port " + port)
    }
    else {
        console.log("Error: " + error)
    }
})