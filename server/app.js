const express = require("express");

// Enable cross-origin requests
const cors = require("cors");

// Route files
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

// Enable CORS
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Check whether the TaskFlow API is running.
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "TaskFlow API is running",
  });
});

// Serve uploaded files publicly
app.use("/uploads", express.static("uploads"));

// API health check route
app.get("/", (req, res) => {
  res.send("TaskFlow API Running");
});

// Authentication routes
app.use("/api/auth", authRoutes);

// Task management routes
app.use("/api/tasks", taskRoutes);

// Notification routes
app.use("/api/notifications", notificationRoutes);

module.exports = app;
