const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    // Track notification status
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    // Automatically add createdAt and updatedAt
    timestamps: true,
  },
);

notificationSchema.index({
  user: 1,
});

module.exports = mongoose.model("Notification", notificationSchema);
