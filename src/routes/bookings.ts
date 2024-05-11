import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import Booking from "../models/Booking";
import Hotel from "../models/Hotel";

const router = express.Router();

// create new booking
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

// check-in booking
router.patch(
  "/check-in/:bookingId",
  check("bookingId", "Invalid bookingId").isHexadecimal().isLength({ min: 24 }),
  async (req: Request, res: Response) => {
    try {
      const bookingId = req.params.bookingId;
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ message: errors.array() });

      // todo: validate userId
      const booking = await Booking.findById(bookingId);
      if (!booking)
        return res.status(404).json({ message: "Booking doesn't exist" });

      await Booking.findByIdAndUpdate(booking, {
        $set: { status: "Checked-In" },
      });
      console.log(booking);

      res.json({ message: "Checked-In successfully" });
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
