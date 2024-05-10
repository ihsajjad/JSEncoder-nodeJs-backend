import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI as string, { dbName: "hotelDB" })
  .then(() => console.log("DB is connected"));

app.listen(3000, () => console.log("Server is running on port : 3000"));
