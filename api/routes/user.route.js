import express from "express";
import { test, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyUser.js";

const router = express.Router();

//localhost:3000/api/user
router.get("/", test);
router.put("/update/:userId", verifyToken, updateUser);
export default router;
