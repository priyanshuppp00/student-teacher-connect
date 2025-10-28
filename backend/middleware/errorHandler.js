// backend/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  // Log detailed error information
  console.error("❌ Error occurred:");
  console.error("  - Message:", err.message);
  console.error("  - Stack:", err.stack);
  console.error("  - Status:", err.status);
  console.error("  - Method:", req.method);
  console.error("  - URL:", req.url);
  console.error("  - IP:", req.ip);
  console.error("  - Timestamp:", new Date().toISOString());

  // Handle specific error types
  let statusCode = err.status || 500;
  if (err.name === "ValidationError") statusCode = 400;
  if (err.name === "CastError") statusCode = 400;
  if (err.code === 11000) statusCode = 409; // Duplicate key

  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV !== "production";
  const errorMessage = isDevelopment ? err.message : "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message: errorMessage,
    ...(isDevelopment && { stack: err.stack }),
  });
};

module.exports = errorHandler;
