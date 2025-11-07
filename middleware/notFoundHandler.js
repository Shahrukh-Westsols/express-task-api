

function notFoundHandler(req, res, next) {
  console.warn(`[404] Resource not found: ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: 'Resource not found',
    path: req.originalUrl,
  });
}

module.exports = notFoundHandler;
