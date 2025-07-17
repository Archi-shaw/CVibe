const mongoose = require('mongoose');

const connectDb = async () => {
    try{
       await mongoose.connect(process.env.MONGODB_URL, {});
       console.log('Mongodb Connected');
    }
    catch(err){
       console.err("Error connecting to Mongodb" , err);
       process.exit(1);
    }
};

module.exports = connectDb;

