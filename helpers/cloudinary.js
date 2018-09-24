
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name:'amelr',
  api_key:'755617399984554' ,
  api_secret: 'aYpsb4XySqX7U2AO70OQhYVSePI'
});

var storage = cloudinaryStorage({
  cloudinary,
  folder: 'Profile_pictures', // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png','jpeg'],
  filename: (req, file, cb)=> {
    cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
  }
});

const uploadCloud = multer({ storage:storage});

module.exports = uploadCloud;