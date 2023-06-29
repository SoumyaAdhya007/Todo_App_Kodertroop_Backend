const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const { connection } = require("./Config/db");
const { TodoRouter } = require("./Routes/todo.routes");
const PORT = process.env.PORT || 9000;
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json()); // Parse JSON request bodies

app.use("/", TodoRouter); // Mount TodoRouter at the root URL
// Start the server
app.listen(PORT, async () => {
  try {
    await connection; // Wait for the database connection to be established
    console.log(`Server is running on ${PORT}`);
  } catch (error) {
    console.log(error.message);
  }
});
