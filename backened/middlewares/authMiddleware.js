const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async(req,res,next) => {
    try{
        let token = req.headers.authorization;
        if(token && token.startWIth("Bearer")){
            token = token.spilt("")[1]; // Extract token 
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("password");
            next();
        }
        else{
            res.status(401).json({ message : "Not authorized, No token"})
        }
    }
    catch(err) {
            res.status(401).json({ message: "Token failed" , error: error.message});
    }
}

module.exports = {protect};