let tasks = [
  {
    id: 1,
    title: "Fix login bug",
    description: "Fix the issue with user login failing on Safari",
    status: "pending",
    priority: "high",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Update homepage UI",
    description: "Redesign the hero section with new branding",
    status: "completed",
    priority: "medium",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

module.exports = tasks;
