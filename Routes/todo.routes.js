const express = require("express");
const {
  getTodo,
  searchTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../Controller/todo.controller");
const TodoRouter = express.Router();
// Endpoint to get all todos
TodoRouter.get("/gettodo", getTodo);
// Endpoint to get search todos
TodoRouter.get("/searchtodo", searchTodo);

// Endpoint to create a new todo
TodoRouter.post("/createtodo", createTodo);

// Endpoint to delete a todo
TodoRouter.delete("/deletetodo/:id", deleteTodo);

// Endpoint to update a todo
TodoRouter.patch("/updateTodo/:id", updateTodo);

module.exports = { TodoRouter };
