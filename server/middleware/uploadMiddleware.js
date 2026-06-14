const multer = require("multer");

// Configure file storage location and filename
const storage = multer.diskStorage({
  // Save uploaded files inside uploads folder
  destination(req, file, cb) {
    cb(null, "uploads/");
  },

  // Add timestamp to avoid duplicate filenames
  filename(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Create multer upload middleware
const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

module.exports = upload;
