const express = require('express');
const {registerUser, loginUser, getUserProfile} = require('../controllers/authControllers');
const {protect} = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

// Auth user
router.post('/register', registerUser); //Register User
router.post('/login',loginUser); // Login User
router.get('/profile' , protect, getUserProfile); // Get user profile

router.post('/upload-image', upload.single('image'), (req,res) => {
    if(!req.file){
        return res.status(404).json({ message: "No file uploaded"});
    }
    const imageurl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(200).json({ imageurl});
});

module.exports = router;
