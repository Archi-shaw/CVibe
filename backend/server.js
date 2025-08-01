const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const path = require('path');

const app = express();

// Connect to MongoDB
connectDb();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://cvibe-frontend.vercel.app'],
  credentials: true,
}));


// Serve static uploads folder with CORS header
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {
  setHeaders: (res, path) => {
    res.set("Access-Control-Allow-Origin", "http://localhost:5173");
  },
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);



// Start server
const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
