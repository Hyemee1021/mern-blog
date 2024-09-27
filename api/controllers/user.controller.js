//functions I can use in routes
import bcryptjs from "bcryptjs";
import { errorHandler } from "../middleware/error.js";

import User from "../models/user.model.js";

export const test = (req, res) => {
  res.json({
    message: "API is working",
  });
};
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }
  if (req.body.password) {
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (req.body.username.includes(" ")) {
    return next(errorHandler(400, "Username cannot contain spaces"));
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      {
        new: true,
      }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
