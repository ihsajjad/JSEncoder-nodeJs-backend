/**
 * Title: Node-Express Project Index File
 * Description: This file serves as the entry point for the Node.js Express application. It initializes the server and sets up routing and middleware.
 * Author: MD Iftekher Hossen Sajjad
 * Date: 10/5/2024
 */

import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import swaggerDocs from "./lib/docs/swagger";
import authRoutes from "./routes/auth.routes";
import bookingRoutes from "./routes/bookings.routes";
import hotelRoutes from "./routes/hotels.routes";
import surveyRutes from "./routes/survey.routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// connect mongodb database
mongoose
  .connect(process.env.MONGODB_URI as string, { dbName: "hotelDB" })
  .then(() => console.log("DB is connected"));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/survey", surveyRutes);

// swagger docs function
swaggerDocs(app, parseInt(port.toString()));

app.get("/", (_, res) => {
  res.json({ message: "Server is running on port : 3000" });
});

app.listen(port, () =>
  console.log(`Server is running on port : http://localhost:${port}`)
);
