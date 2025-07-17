const express = require('express');
const {registerUser, loginUser, getUserProfile} = require('../controllers/authControllers');
const {protect} = require('../middlewares/authMiddleware');

const router = express.Router();

// Auth user
router.post('/register', registerUser); //Register User
router.post('/login',loginUser); // Login User
router.get('/profile' , protect, getUserProfile); // Get user profile

module.exports = router;
