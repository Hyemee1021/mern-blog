import { errorHandler } from "./error.js";

export const validateSignup = (req, res, next) => {
  const { username, password, email } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username.trim() === "" ||
    email.trim() === "" ||
    password.trim() === ""
  ) {
    return next(
      errorHandler({
        statusCode: 400,
        message: "All feilds are required for signup.",
      })
    );
  }

  next();
};
