// middleware/errorHandler.js
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};
// errorhandler func create and return new error obj- it is passed to the next middleware
