import express from "express";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";

// router
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

// main Express setup
dotenv.config();

const app = express();

const corsOptions = {
  origin: true,
};

mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("MongoDB is connected"))
  .catch((error) => console.log(error.message));

const __dirname = path.resolve();

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
// making api routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// Error handling middleware should be the last middleware
// after all of routes and other middleware to catch errors for them

app.listen(3000, () => {
  console.log("Server is running on port 3000!!");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
