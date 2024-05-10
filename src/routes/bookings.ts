import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import Booking from "../models/Booking";
import Hotel from "../models/Hotel";

const router = express.Router();

router.post(
  "/create-booking",
  validateBookingData(),
  async (req: Request, res: Response) => {
    try {
      const bookingData = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ message: errors.array() });

      const hotel = await Hotel.findById(req.body.hotelId);
      if (!hotel)
        return res.status(404).json({ message: "Hotel doesn't exist" });

      bookingData.updatedAt = new Date();
      const booking = new Booking(bookingData);
      await booking.save();

      res.json({ message: "Hotel was booked successfully" });
    } catch (error) {
      console.log(__filename, error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

function validateBookingData() {
  return [
    check("hotelId", "Invalid hotelId").isHexadecimal(),
    check("userId", "Invalid userId").isHexadecimal(),
    check("checkInDate", "Invalid chackInDate").isDate(),
    check("checkOutDate", "Invalid chackOutDate").isDate(),
    check("numberOfNights", "Invalid numberOfNights").isNumeric(),
  ];
}

export default router;
