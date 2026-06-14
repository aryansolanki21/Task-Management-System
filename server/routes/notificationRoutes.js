const express = require("express");

const router = express.Router();

// Notification controller functions
const {
  getNotifications,
  markAsRead,
} = require("../controllers/notificationController");

// Authentication middleware
const protect = require("../middleware/authMiddleware");

// Get all notifications
router.get("/", protect, getNotifications);

// Mark notification as read
router.put("/:id/read", protect, markAsRead);

module.exports = router;
