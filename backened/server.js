const dotenv= require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDb = require('./config/db')

const app = express();

// Middleware to handle cors 
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST" ,"PUT" ,"DELETE"],
        allowedHeaders: ["Content-Type" , "Authorization"],
    })
);


connectDb();

app.use(express.json());



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is runing at port ${PORT}`));

