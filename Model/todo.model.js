const mongoose = require("mongoose");
// Define the todo schema
const todoSchema = mongoose.Schema({
  title: { type: String, required: true }, // Title of the todo (required field)
  description: { type: String }, // Description of the todo (optional field)
});

// Create the todo model using the schema
const TodoModel = mongoose.model("todo", todoSchema);

module.exports = { TodoModel };
