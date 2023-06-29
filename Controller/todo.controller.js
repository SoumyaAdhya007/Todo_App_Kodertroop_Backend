const { TodoModel } = require("../Model/todo.model");
require("dotenv").config();
const { createClient } = require("redis");

const client = createClient({
  password: process.env.RedisPass,
  socket: {
    host: process.env.RedisHost,
    port: 11137,
  },
});
client.connect();
const getTodo = async (req, res) => {
  try {
    // const todos = await TodoModel.find({});
    const todos = await client.LRANGE("todoos", 0, -1);
    const alltodos = todos.map(JSON.parse);
    res.status(200).send(alltodos);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
const searchTodo = async (req, res) => {
  const query = req.query.q;
  try {
    const results = await TodoModel.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const createTodo = async (req, res) => {
  const payload = req.body;
  try {
    if (!payload.title) {
      res.status(400).send({
        message: "Please provide the title of the todo",
      });
    }
    const newTodo = new TodoModel(payload);
    await newTodo.save();
    // Save the task to Redis
    await client.RPUSH("todoos", JSON.stringify(newTodo));
    res.status(200).send(newTodo);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateTodo = async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  try {
    if (!id) {
      res.status(400).send({ message: "Please provied id" });
    }
    await TodoModel.findByIdAndUpdate({ _id: id }, payload);
    res.status(200).send({ message: "Todo updated successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
const deleteTodo = async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) {
      res.status(400).send({ message: "Please provied id" });
    }
    await TodoModel.findByIdAndDelete({ _id: id });
    await client.LREM("todoos", 0, id);
    res.status(204).send({ message: "Todo updated successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { getTodo, searchTodo, createTodo, updateTodo, deleteTodo };
