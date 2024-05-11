import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { validateToken } from "../middleware/validateToken";
import Booking from "../models/Booking";
import Hotel from "../models/Hotel";

const router = express.Router();

// get all bookings for admin
router.get("/", validateToken, async (req: Request, res: Response) => {
  try {
    // setted userRole while validating token
    if (req.userRole !== "Admin")
      return res.status(401).json({ message: "Unauthorized access" });

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
  validateToken,
  async (req: Request, res: Response) => {
    try {
      const bookingData = req.body;

      // validate incoming booking data
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ message: errors.array() });

      const hotel = await Hotel.findById(req.body.hotelId);
      if (!hotel)
        return res.status(404).json({ message: "Hotel doesn't exist" });

      bookingData.updatedAt = new Date();
      const booking = new Booking({ ...bookingData, userId: req.userId });
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
  validateToken,
  async (req: Request, res: Response) => {
    try {
      const bookingId = req.params.bookingId;

      // validate bookingId, existence of booking, and expire date
      const error = await validateHotelIdAndBooking(req); // this Fn located at bottom
      if (!!error)
        return res.status(error.status).json({ message: error.message });

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
  validateToken,
  async (req: Request, res: Response) => {
    try {
      const bookingId = req.params.bookingId;

      // validate bookingId, existence of booking, and expire date
      const error = await validateHotelIdAndBooking(req); // this Fn located at bottom
      if (!!error)
        return res.status(error.status).json({ message: error.message });

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
  validateToken,
  async (req: Request, res: Response) => {
    try {
      const bookingId = req.params.bookingId;

      // validate bookingId, existence of booking, and expire date
      const error = await validateHotelIdAndBooking(req); // this Fn located at bottom
      if (!!error)
        return res.status(error.status).json({ message: error.message });

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

// validating for add new booking or update a booking
function validateBookingData() {
  return [
    check("hotelId", "Invalid hotelId").isHexadecimal(),
    check("checkInDate", "Invalid chackInDate").isDate(),
    check("checkOutDate", "Invalid chackOutDate").isDate(),
    check("numberOfNights", "Invalid numberOfNights").isNumeric(),
  ];
}

// doing some validation to update booking status
async function validateHotelIdAndBooking(req: Request) {
  const bookingId = req.params.bookingId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) return { status: 400, message: errors.array() };

  const booking = await Booking.findById(bookingId);
  if (!booking) return { status: 404, message: "Booking doesn't exist" };

  if (booking.userId !== req.userId)
    return {
      status: 401,
      message: "Unauthorized access",
    };

  const isExpiredBooking = new Date() >= booking.checkOutDate;
  if (isExpiredBooking)
    return { status: 400, message: "The Booking is expired!" };
}

export default router;
