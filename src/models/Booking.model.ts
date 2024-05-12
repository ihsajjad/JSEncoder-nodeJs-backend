import mongoose from "mongoose";
import { BookingDataType } from "../shared/types";

const BookingSchema = new mongoose.Schema<BookingDataType>({
  hotelId: { type: String, required: true },
  userId: { type: String, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  numberOfNights: { type: Number, required: true },
  updatedAt: { type: Date, required: true },
  status: {
    type: String,
    enum: ["Checked-In", "Checked-Out", "Canceled", "Pending"],
    default: "Pending",
  },
});

const Booking = mongoose.model<BookingDataType>("Booking", BookingSchema);

export default Booking;
