const Notification = require("../models/Notification");

const getNotifications = async (req, res) => {
  try {
    // Find notifications and show latest first
    const notifications = await Notification.find({
      user: req.user.userId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Mark notification as read
const markAsRead = async (req, res) => {
  try {
    // Update notification status
    await Notification.findByIdAndUpdate(req.params.id, {
      isRead: true,
    });

    res.status(200).json({
      success: true,
      message: "Notification updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getNotifications,
  markAsRead,
};
