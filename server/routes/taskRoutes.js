const express = require("express");

const router = express.Router();

// JWT authentication middleware
const protect = require("../middleware/authMiddleware");

// File upload middleware
const upload = require("../middleware/uploadMiddleware");

// Task controller functions
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskStats,
  getOverdueTasks,
  getUpcomingTasks,
  getTaskAnalytics,
  uploadAttachment,
} = require("../controllers/taskController");

// Task CRUD routes
router.post("/", protect, createTask);

router.get("/", protect, getTasks);

router.put("/:id", protect, updateTask);

router.delete("/:id", protect, deleteTask);

// Task statistics and analytics routes
router.get("/stats", protect, getTaskStats);

router.get("/analytics", protect, getTaskAnalytics);

// Due date related routes
router.get("/overdue", protect, getOverdueTasks);

router.get("/upcoming", protect, getUpcomingTasks);

// Upload task attachment
router.post("/:id/upload", protect, upload.single("file"), uploadAttachment);

module.exports = router;
