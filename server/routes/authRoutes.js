const express = require("express");

const router = express.Router();

// Authentication controller functions
const {
  registerUser,
  loginUser,
  getCurrentUser,
  updateProfile,
  changePassword,
} = require("../controllers/authController");

// JWT authentication middleware
const protect = require("../middleware/authMiddleware");

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/me", protect, getCurrentUser);
router.put("/profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);

module.exports = router;
