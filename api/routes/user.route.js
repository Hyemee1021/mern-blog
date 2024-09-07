import express from "express";
import { test } from "../controllers/user.controller.js";

const router = express.Router();

//localhost:3000/api/user
router.get("/", test);

export default router;
