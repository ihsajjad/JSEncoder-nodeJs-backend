import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import bookingRoutes from "./routes/bookings";
import hotelRoutes from "./routes/hotels";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI as string, { dbName: "hotelDB" })
  .then(() => console.log("DB is connected"));

app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (_, res) => {
  res.json({ message: "Server is running on port : 3000" });
});

app.listen(3000, () => console.log("Server is running on port : 3000"));
