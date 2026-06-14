const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Establish database connection
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("Database Connection Failed");
    console.error(error.message);

    // Stop server if database connection fails
    process.exit(1);
  }
};

module.exports = connectDB;
