import express from "express";
import { signup, signin } from "../controllers/auth.controller.js";
import { validateSignup } from "../middleware/validateSignup.js";

const router = express.Router();

// make http request
// http://localhost:3000/api/auth as start

//validateSignup middleware before signup route handles data for further processing

router.post("/signup", validateSignup, signup);
router.post("/signin", signin);

export default router; //I will use it in index.js
