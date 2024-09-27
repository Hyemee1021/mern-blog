// middleware/errorHandler.js
export const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
// errorhandler func create and return new error obj- it is passed to the next middleware
