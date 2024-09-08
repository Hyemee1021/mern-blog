import express from "express";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

// router
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import { errorHandler } from "./middleware/error.js";

// main Express setup
dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("MongoDB is connected"))
  .catch((error) => console.log(error.mesage));

// Middleware to parse JSON
app.use(express.json());

// making api routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// Error handling middleware should be the last middleware
// after all of routes and other middleware to catch errors for them
//integrating error handling middleware
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000!!");
});
