import express from "express";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

dotenv.config();
mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("MongoDB is connected"))
  .catch((error) => console.log(error.mesage));
const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000!!");
});
//1:01:19
