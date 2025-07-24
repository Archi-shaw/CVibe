const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const path = require('path')

const app = express();

// Connect to MongoDB
connectDb();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));


app.use("/uploads",
    express.static(path.join(__dirname, "uploads"), {
        setHeaders: (res,path) => {
            res.set("Access-Control-Allow-Origin", "http://localhost:5173");
        },
    })
);


// Server start
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
