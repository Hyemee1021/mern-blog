// functions work with server or database needs time so asyncronous

import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
export const signup = async (req, res, next) => {
  //I got data from front and I handle it here as obj form
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All filds are required"));
  }

  const hashPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });

  //   saves a new instance newUser in database

  try {
    await newUser.save();
    res.status(201).json({ message: " New user is created" });
  } catch (error) {
    next(error);
  }
};
