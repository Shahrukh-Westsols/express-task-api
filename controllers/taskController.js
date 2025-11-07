const express = require('express');

// controllers/taskController.js

let tasks = [
  { id: 1, title: "Fix login bug", status: "Pending", priority: "High" },
  { id: 2, title: "Update homepage UI", status: "Completed", priority: "Medium" },
  { id: 3, title: "Write API documentation", status: "In Progress", priority: "Low" }
];

const getAllTasks = (req, res) => {
  res.json({ success: true, data: tasks });
};

const getTaskById = (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ success: false, message: "Task not found" });
  res.json({ success: true, data: task });
};

const createTask = (req, res) => {
  const { title, status, priority } = req.body;
  const newTask = {
    id: tasks.length + 1,
    title,
    status,
    priority
  };
  tasks.push(newTask);
  res.status(201).json({ success: true, message: "Task created", data: newTask });
};

const updateTask = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, status, priority } = req.body;
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ success: false, message: "Task not found" });

  task.title = title || task.title;
  task.status = status || task.status;
  task.priority = priority || task.priority;

  res.json({ success: true, message: "Task updated", data: task });
};

const deleteTask = (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ success: false, message: "Task not found" });

  tasks.splice(index, 1);
  res.json({ success: true, message: "Task deleted" });
};


module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
