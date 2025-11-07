# Express.js Task API

## Description
Basic Express.js REST API project implementing custom middleware, request/response logging, error handling, and CRUD operations with mock task data.

## Installation

Clone the repository:

git clone https://github.com/Shahrukh-Westsols/express-task-api.git
cd express-task-api

Install dependencies:

npm install

Start the server locally using nodemon:
npm run devstart
The server will run on http://localhost:3000.

API Endpoints
Health Check

GET /health
Returns server status with timestamp.

Tasks

GET /api/tasks
Returns an array of all tasks.

GET /api/tasks/:id
Returns a single task by its ID.

POST /api/tasks
Creates a new task.
Request Body Example:
{
  "title": "New Task",
  "status": "Pending",
  "priority": "High"
}

PUT /api/tasks/:id
Updates an existing task by ID.
Request Body Example:
{
  "title": "Updated Task",
  "status": "Completed",
  "priority": "Medium"
}
DELETE /api/tasks/:id
Deletes a task by ID.

Response Format
Success
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}

Error
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message if any"
}

Postman Testing

You can test all endpoints using Postman. Import the collection and try:

Positive scenarios: valid inputs for all CRUD operations

Negative scenarios: invalid inputs or missing task IDs

Notes

This project uses in-memory storage for tasks. All data will reset when the server restarts.

Custom middleware logs request and response details in the console.

Error handling ensures consistent JSON responses for 400, 404, and 500 errors.
