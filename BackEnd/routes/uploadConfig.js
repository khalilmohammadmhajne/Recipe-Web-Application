// uploadConfig.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the 'images' directory exists
const uploadDir = path.join(__dirname, '../images');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Save to 'images' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp as filename
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
