const tasks = require('../data/tasks');

const getAllTasks = (req, res) => {
  res.json({ success: true, data: tasks });
};

const getTaskById = (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ success: false, message: "Task not found" });
  res.json({ success: true, data: task });
};

const createTask = (req, res) => {
  const { title, description, status, priority } = req.body;
  const newTask = {
    id: tasks.length + 1,
    title,
    description: description || "",
    status,
    priority,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  tasks.push(newTask);
  res.status(201).json({ success: true, message: "Task created", data: newTask });
};

const updateTask = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, status, priority } = req.body;
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ success: false, message: "Task not found" });

  task.title = title || task.title;
  task.description = description || task.description;
  task.status = status || task.status;
  task.priority = priority || task.priority;
  task.updatedAt = new Date().toISOString();

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