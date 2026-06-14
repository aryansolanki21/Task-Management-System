// Load environment variables from .env file
require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

// Connect to database
connectDB();

// Application port
const PORT = process.env.PORT || 5000;

// Start Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
