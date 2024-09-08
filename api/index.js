import express from "express";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

// router
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("MongoDB is connected"))
  .catch((error) => console.log(error.mesage));

const app = express();

// this will allow json format to backend
app.use(express.json());
app.listen(3000, () => {
  console.log("Server is running on port 3000!!");
});

// making api endpoint
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

//error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Sever Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
