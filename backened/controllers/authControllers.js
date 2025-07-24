const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Generate json web tokens
const generatetokens = (userId) => {
    return jwt.sign({ id: userId } , process.env.JWT_SECRET , {expiresIn: "7days"});
};

// @desc Register a new user
// @route POST/api/auth/register
// @access Public

const registerUser = async(req,res) => {
        try{
            const {name,email,password,profileImageUrl} = req.body;

            // Checks if user exist 
            const userExist = await User.findOne({ email });
            if(userExist){
                return res.status(404).json({ message: "User already exist" });
            }

            //Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt);
 
            // Create user 
            const user = await User.create({
                email,
                name,
                password : hashedPassword,
                profileImageUrl,
            });

            // Return User data with JWT
            res.status(201).json({
                id: user._id,
                name: user.name,
                email: user.email,
                profileImageUrl: user.profileImageUrl,
                token: generatetokens(user._id),
            }) ;
        }
        catch(error){
          res.status(500).json({ message: "server error" , error: error.message});
        }
}

// @desc Login a new user
// @route POST/api/auth/login
// @access Public

const loginUser = async(req,res) => {
      try {
        const {email,password} = req.body;
        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({ message: "Invalid Email or password "});
        }
        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched){
            return res.status(404).json({ message: " Invalid password "});
        }
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generatetokens(user._id),
        })

       } catch (error) {
      res.status(500).json({ message: "server error" , error: error.message});
       }
}

// @desc Get user Profile
// @route GET/api/auth/profile
// @access Private {Requires JWT}

const getUserProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Not authorized, user not found in request" });
    }

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found in database" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



module.exports = {registerUser , getUserProfile, loginUser};

