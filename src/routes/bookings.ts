import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import Booking from "../models/Booking";
import Hotel from "../models/Hotel";

const router = express.Router();

// get all bookings for admin
router.get("/", async (req: Request, res: Response) => {
  try {
    // todo: validate the admin
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    console.log(__filename, error);
    res.status(500).json({ message: "Internal server error" });
  }
});

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

// check-in booking by Id
router.patch(
  "/check-in/:bookingId",
  check("bookingId", "Invalid bookingId").isHexadecimal().isLength({ min: 24 }),
  async (req: Request, res: Response) => {
    try {
      const bookingId = req.params.bookingId;

      // validate bookingId, existence of booking, and expire date
      const error = await validateHotelIdAndBooking(req); // this Fn located at bottom
      if (!!error) return res.status(400).json(error);

      await Booking.findByIdAndUpdate(bookingId, {
        $set: { status: "Checked-In" },
      });

      res.json({ message: "Checked-In successfully" });
    } catch (error) {
      console.log(__filename, error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// check-out booking by Id
router.patch(
  "/check-out/:bookingId",
  check("bookingId", "Invalid bookingId").isHexadecimal().isLength({ min: 24 }),
  async (req: Request, res: Response) => {
    try {
      const bookingId = req.params.bookingId;

      // validate bookingId, existence of booking, and expire date
      const error = await validateHotelIdAndBooking(req); // this Fn located at bottom
      if (!!error) return res.status(400).json(error);

      await Booking.findByIdAndUpdate(bookingId, {
        $set: { status: "Checked-Out" },
      });

      res.json({ message: "Checked-Out successfully" });
    } catch (error) {
      console.log(__filename, error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// cancel booking by Id
router.patch(
  "/cancel/:bookingId",
  check("bookingId", "Invalid bookingId").isHexadecimal().isLength({ min: 24 }),
  async (req: Request, res: Response) => {
    try {
      const bookingId = req.params.bookingId;

      // validate bookingId, existence of booking, and expire date
      const error = await validateHotelIdAndBooking(req); // this Fn located at bottom
      if (!!error) return res.status(400).json(error);

      await Booking.findByIdAndUpdate(bookingId, {
        $set: { status: "Canceled" },
      });

      res.json({ message: "Booking was canceled successfully" });
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

async function validateHotelIdAndBooking(req: Request) {
  const bookingId = req.params.bookingId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) return { message: errors.array() };

  // todo: validate userId
  const booking = await Booking.findById(bookingId);
  if (!booking) return { message: "Booking doesn't exist" };

  const isExpiredBooking = new Date() >= booking.checkOutDate;
  if (isExpiredBooking) return { message: "The Booking is expired!" };
}

export default router;
