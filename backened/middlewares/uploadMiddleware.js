const multer = require('multer');

//Configure storage 
const storage = multer.diskStorage({
    destination: (req,res,cb) => {
        cb(null, 'uploads/');
    },
     filename: (req,file,cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
     }
})

// File Filter
const filefilter = (req,file,cb) => {
    const allowedTYpes = ['image/jpeg' , 'image/png' , 'image/jpg'];
    if(allowedTYpes.includes(file.mimetype)){
        cb(null,true);
    }
    else{
        cb(new Error('Only jpeg, png, jpg files are allowd'),false);
    }
}

const upload = multer({ storage, filefilter });

module.exports = upload;