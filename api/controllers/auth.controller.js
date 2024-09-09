// functions work with server or database needs time so asyncronous

import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../middleware/error.js";

export const signup = async (req, res, next) => {
  //I got data from front and I handle it here as obj form
  const { username, email, password } = req.body;

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

//2:45
export const signin = async (req, res, next) => {
  //I got data from front and I handle it here as obj form
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fileds are required."));
  }

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, "USer not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(400, "Invalid Information."));
    }

    //token will be encrpted
    const token = jwt.sign(
      {
        id: validUser._id,
      },
      process.env.JWT_SECRET
    );

    //I would like to seperate the password. so later I dont want to send the password
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
