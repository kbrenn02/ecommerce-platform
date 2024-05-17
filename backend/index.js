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
        return cb(null, `${file.filename}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

// Creating upload endpoint for images
app.use('/images', express.static('upload/images'))

app.post("/upload", upload.single('product', (req, res)=>{
    res.json({
        success:1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
}))

// get a message in the terminal to tell you if the app is running successfully on the given port, or if there are errors
app.listen(port, (error)=> {
    if(!error) {
        console.log("Server Running on Port " + port)
    }
    else {
        console.log("Error: " + error)
    }
})