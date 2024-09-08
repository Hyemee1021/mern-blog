import express from "express";
import { signup } from "../controllers/auth.controller.js";
import { validateSignup } from "../middleware/validateSignup.js";

const router = express.Router();

// make http request
// http://localhost:3000/api/auth as start

//validateSignup middleware before signup route handles data for further processing

router.post("/signup", validateSignup, signup);
//I will use it in index.js
export default router;
