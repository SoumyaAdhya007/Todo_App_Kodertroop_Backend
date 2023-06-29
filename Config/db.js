const mongoose = require("mongoose");
require("dotenv").config();

// Establish connection to MongoDB using the provided MongoDB connection URL
const connection = mongoose
  .connect(process.env.mongoURL) // Connect to the MongoDB database
  .then(() => {
    console.log("Connected to the MongoDB database");
  })
  .catch((error) => {
    console.log("Connection error:", error);
  });

module.exports = {
  connection,
};
