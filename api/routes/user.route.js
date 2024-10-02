import express from "express";
import {
  deleteUser,
  test,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyUser.js";
import verify from "jsonwebtoken/verify.js";

const router = express.Router();

//localhost:3000/api/user
router.get("/", test);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
export default router;
