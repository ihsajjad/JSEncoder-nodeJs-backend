import mongoose from "mongoose";
import { HotelDataType } from "../shared/types";

const HotelSchema = new mongoose.Schema<HotelDataType>({
  hotelName: { type: String, required: true },
  description: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  address: { type: String, required: true },
  starRating: { type: Number, required: true },
  facilities: [{ type: String, required: true }],
  images: [{ type: String, required: true }],
  updatedAt: { type: Date, required: true },
});

const Hotel = mongoose.model<HotelDataType>("Hotel", HotelSchema);

export default Hotel;
