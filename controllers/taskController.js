const tasks = require('../data/tasks');

const validStatuses = ["pending", "in-progress", "completed"];
const validPriorities = ["low", "medium", "high"];

function validateTaskInput(data) {
  const errors = [];

  if (!data.title || data.title.trim() === "") {
    errors.push("Title is required.");
  } else if (data.title.length < 3 || data.title.length > 100) {
    errors.push("Title must be between 3 and 100 characters.");
  }

  if (data.description && data.description.length > 500) {
    errors.push("Description cannot exceed 500 characters.");
  }

  if (!data.status || !validStatuses.includes(data.status.toLowerCase())) {
    errors.push(`Status must be one of: ${validStatuses.join(", ")}.`);
  }

  if (!data.priority || !validPriorities.includes(data.priority.toLowerCase())) {
    errors.push(`Priority must be one of: ${validPriorities.join(", ")}.`);
  }

  return errors;
}

const getAllTasks = (req, res) => {
  res.json({ success: true, data: tasks });
};

const getTaskById = (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({
      success: false,
      error: "Not Found",
      message: "Task not found"
    });
  }
  res.json({ success: true, data: task });
};

const newTaskId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

const createTask = (req, res) => {
  const errors = validateTaskInput(req.body);
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: "Validation Error",
      message: errors.join(" ")
    });
  }

  const { title, description, status, priority } = req.body;

  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
    title,
    description: description || "",
    status: status.toLowerCase(),
    priority: priority.toLowerCase(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  tasks.push(newTask);

  res.status(201).json({ success: true, message: "Task created", data: newTask });
};

const updateTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({
      success: false,
      error: "Not Found",
      message: "Task not found"
    });
  }

  const errors = [];
  if (req.body.title && (req.body.title.length < 3 || req.body.title.length > 100)) {
    errors.push("Title must be between 3 and 100 characters.");
  }
  if (req.body.description && req.body.description.length > 500) {
    errors.push("Description cannot exceed 500 characters.");
  }
  if (req.body.status && !validStatuses.includes(req.body.status.toLowerCase())) {
    errors.push(`Status must be one of: ${validStatuses.join(", ")}.`);
  }
  if (req.body.priority && !validPriorities.includes(req.body.priority.toLowerCase())) {
    errors.push(`Priority must be one of: ${validPriorities.join(", ")}.`);
  }
  if (errors.length > 0) {
    return res.status(400).json({ success: false, error: "Validation Error", message: errors.join(" ") });
  }

  const { title, description, status, priority } = req.body;

  task.title = title || task.title;
  task.description = description || task.description;
  task.status = status ? status.toLowerCase() : task.status;
  task.priority = priority ? priority.toLowerCase() : task.priority;
  task.updatedAt = new Date().toISOString();

  res.json({ success: true, message: "Task updated", data: task });
};

const deleteTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === taskId);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: "Not Found",
      message: "Task not found"
    });
  }

  tasks.splice(index, 1);
  res.json({
    success: true,
    message: "Task deleted",
    data: null
  });
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};


// const tasks = require('../data/tasks');

// const validStatuses = ["pending", "in-progress", "completed"];
// const validPriorities = ["low", "medium", "high"];

// function validateTaskInput(data) {
//   const errors = [];

//   if (!data.title || data.title.trim() === "") {
//     errors.push("Title is required.");
//   } else if (data.title.length < 3 || data.title.length > 100) {
//     errors.push("Title must be between 3 and 100 characters.");
//   }

//   if (data.description && data.description.length > 500) {
//     errors.push("Description cannot exceed 500 characters.");
//   }

//   if (!data.status || !validStatuses.includes(data.status.toLowerCase())) {
//     errors.push(`Status must be one of: ${validStatuses.join(", ")}.`);
//   }

//   if (!data.priority || !validPriorities.includes(data.priority.toLowerCase())) {
//     errors.push(`Priority must be one of: ${validPriorities.join(", ")}.`);
//   }

//   return errors;
// }

// const getAllTasks = (req, res) => {
//   res.json({ success: true, data: tasks });
// };

// const getTaskById = (req, res) => {
//   const task = tasks.find(t => t.id === parseInt(req.params.id));
//   if (!task) return res.status(404).json({ success: false, message: "Task not found" });
//   res.json({ success: true, data: task });
// };

// const createTask = (req, res) => {
//   const { title, description, status, priority } = req.body;
//   const newTask = {
//     id: tasks.length + 1,
//     title,
//     description: description || "",
//     status,
//     priority,
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString()
//   };
//   tasks.push(newTask);
//   res.status(201).json({ success: true, message: "Task created", data: newTask });
// };

// const updateTask = (req, res) => {
//   const id = parseInt(req.params.id);
//   const { title, description, status, priority } = req.body;
//   const task = tasks.find(t => t.id === id);
//   if (!task) return res.status(404).json({ success: false, message: "Task not found" });

//   task.title = title || task.title;
//   task.description = description || task.description;
//   task.status = status || task.status;
//   task.priority = priority || task.priority;
//   task.updatedAt = new Date().toISOString();

//   res.json({ success: true, message: "Task updated", data: task });
// };

// const deleteTask = (req, res) => {
//   const id = parseInt(req.params.id);
//   const index = tasks.findIndex(t => t.id === id);
//   if (index === -1) return res.status(404).json({ success: false, message: "Task not found" });

//   tasks.splice(index, 1);
//   res.json({ success: true, message: "Task deleted" });
// };

// module.exports = {
//   getAllTasks,
//   getTaskById,
//   createTask,
//   updateTask,
//   deleteTask,
// };