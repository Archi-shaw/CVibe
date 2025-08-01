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

app.use(express.json());

// Middleware
const allowedOrigins = [
  'https://cvibe.onrender.com',
  'http://localhost:5173', // keep this for local dev
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Serve static uploads folder with CORS header
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {
  setHeaders: (res, path) => {
    res.set("Access-Control-Allow-Origin", "*");
  },
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);



// Start server
const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
