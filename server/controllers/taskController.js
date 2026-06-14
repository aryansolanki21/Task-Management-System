const Task = require("../models/Task");
const mongoose = require("mongoose");

const Notification = require("../models/Notification");

// Create new task
const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, category, dueDate } =
      req.body;

    // Validate Title
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Task title is required",
      });
    }

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      category,
      dueDate,

      // User from JWT Middleware
      user: req.user.userId,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get tasks with filters, search and pagination
const getTasks = async (req, res) => {
  try {
    const {
      status,
      category,
      priority,
      search,
      sort,
      page = 1,
      limit = 5,
    } = req.query;

    // Build query for logged in user
    const query = {
      user: req.user.userId,
    };

    // Status Filter
    if (status) {
      query.status = status;
    }

    // Priority Filter
    if (priority) {
      query.priority = priority;
    }

    // Category Filter
    if (category) {
      query.category = category;
    }

    // Search by Title
    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    const currentPage = Number(page);
    const pageLimit = Number(limit);

    if (currentPage < 1 || pageLimit < 1) {
      return res.status(400).json({
        success: false,
        message: "Page and limit must be greater than 0",
      });
    }

    // Calculate pagination values
    const skip = (currentPage - 1) * pageLimit;

    let taskQuery = Task.find(query).select("-__v");

    // Sorting
    if (sort === "oldest") {
      taskQuery = taskQuery.sort({
        createdAt: 1,
      });
    } else if (sort === "high") {
      taskQuery = taskQuery.sort({
        priority: -1,
      });
    } else if (sort === "low") {
      taskQuery = taskQuery.sort({
        priority: 1,
      });
    } else {
      taskQuery = taskQuery.sort({
        createdAt: -1,
      });
    }

    taskQuery = taskQuery.skip(skip).limit(pageLimit);

    const tasks = await taskQuery;

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    // Create notifications for due and overdue tasks
    for (const task of tasks) {
      if (!task.dueDate) continue;

      const due = new Date(task.dueDate);

      due.setHours(0, 0, 0, 0);

      // Due Today Notification
      if (due.getTime() === today.getTime()) {
        const alreadyExists = await Notification.findOne({
          user: task.user,
          title: "Task Due Today",
          message: `${task.title} is due today`,
        });

        if (!alreadyExists) {
          await Notification.create({
            user: task.user,
            title: "Task Due Today",
            message: `${task.title} is due today`,
          });
        }
      }

      // Overdue Notification
      if (due < today && task.status !== "Completed") {
        const alreadyExists = await Notification.findOne({
          user: task.user,
          title: "Overdue Task",
          message: `${task.title} is overdue`,
        });

        if (!alreadyExists) {
          await Notification.create({
            user: task.user,
            title: "Overdue Task",
            message: `${task.title} is overdue`,
          });
        }
      }
    }

    const totalTasks = await Task.countDocuments(query);

    const totalPages = Math.ceil(totalTasks / pageLimit);

    res.status(200).json({
      success: true,

      pagination: {
        totalTasks,
        totalPages,
        currentPage,
        pageLimit,
      },

      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Update task details
const updateTask = async (req, res) => {
  try {
    // Validate task id
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Task ID",
      });
    }

    const task = await Task.findById(req.params.id);

    // Check task exists
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Check task ownership
    if (task.user.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this task",
      });
    }

    const updateData = {
      ...req.body,
    };

    // Save completion date when task is completed
    if (req.body.status === "Completed") {
      updateData.completedAt = new Date();
    }

    if (req.body.status && req.body.status !== "Completed") {
      updateData.completedAt = null;
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    // Create completion notification
    if (task.status !== "Completed" && updatedTask.status === "Completed") {
      const alreadyExists = await Notification.findOne({
        user: updatedTask.user,
        title: "Task Completed",
        message: `${updatedTask.title} completed successfully`,
      });

      if (!alreadyExists) {
        await Notification.create({
          user: updatedTask.user,
          title: "Task Completed",
          message: `${updatedTask.title} completed successfully`,
        });
      }
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Task ID",
      });
    }

    const task = await Task.findById(req.params.id);

    // Check task exists
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Ownership validation
    if (task.user.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this task",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get dashboard statistics
const getTaskStats = async (req, res) => {
  try {
    const userId = req.user.userId;

    const totalTasks = await Task.countDocuments({
      user: userId,
    });

    const pendingTasks = await Task.countDocuments({
      user: userId,
      status: "Pending",
    });

    const inProgressTasks = await Task.countDocuments({
      user: userId,
      status: "In Progress",
    });

    const completedTasks = await Task.countDocuments({
      user: userId,
      status: "Completed",
    });

    const highPriorityTasks = await Task.countDocuments({
      user: userId,
      priority: "High",
    });

    const mediumPriorityTasks = await Task.countDocuments({
      user: userId,
      priority: "Medium",
    });

    const lowPriorityTasks = await Task.countDocuments({
      user: userId,
      priority: "Low",
    });

    res.status(200).json({
      success: true,
      stats: {
        totalTasks,
        pendingTasks,
        inProgressTasks,
        completedTasks,
        highPriorityTasks,
        mediumPriorityTasks,
        lowPriorityTasks,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get overdue tasks
const getOverdueTasks = async (req, res) => {
  try {
    const today = new Date();

    const overdueTasks = await Task.find({
      user: req.user.userId,

      dueDate: {
        $lt: today,
      },

      status: {
        $ne: "Completed",
      },
    }).sort({
      dueDate: 1,
    });

    res.status(200).json({
      success: true,
      count: overdueTasks.length,
      tasks: overdueTasks,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get tasks due within next 7 days
const getUpcomingTasks = async (req, res) => {
  try {
    const today = new Date();

    const nextWeek = new Date();

    nextWeek.setDate(today.getDate() + 7);

    const upcomingTasks = await Task.find({
      user: req.user.userId,

      dueDate: {
        $gte: today,
        $lte: nextWeek,
      },

      status: {
        $ne: "Completed",
      },
    }).sort({
      dueDate: 1,
    });

    res.status(200).json({
      success: true,
      count: upcomingTasks.length,
      tasks: upcomingTasks,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get task analytics data
const getTaskAnalytics = async (req, res) => {
  try {
    const userId = req.user.userId;

    const now = new Date();

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const tasksCreatedThisMonth = await Task.countDocuments({
      user: userId,

      createdAt: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
    });

    const completedThisMonth = await Task.countDocuments({
      user: userId,

      status: "Completed",

      createdAt: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
    });

    const totalTasks = await Task.countDocuments({
      user: userId,
    });

    const completedTasks = await Task.countDocuments({
      user: userId,
      status: "Completed",
    });

    const completionRate =
      totalTasks === 0
        ? 0
        : Number(((completedTasks / totalTasks) * 100).toFixed(2));

    res.status(200).json({
      success: true,

      analytics: {
        tasksCreatedThisMonth,
        completedThisMonth,
        completionRate,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Upload task attachment
const uploadAttachment = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    if (task.user.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    // Save uploaded file details
    task.attachments.push({
      fileName: req.file.originalname,
      fileUrl: `/uploads/${req.file.filename}`,
    });

    await task.save();

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Upload failed",
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  uploadAttachment,
  deleteTask,
  getTaskAnalytics,
  getTaskStats,
  getOverdueTasks,
  getUpcomingTasks,
};
