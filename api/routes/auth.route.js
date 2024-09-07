import express from "express";
import { signup } from "../controllers/auth.controller.js";

const router = express.Router();

// make http request
// http://localhost:3000/api/auth as start

router.post("/signup", signup);
//I will use it in index.js
export default router;
