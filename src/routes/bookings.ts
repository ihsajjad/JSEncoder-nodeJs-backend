import express from "express";
import { check } from "express-validator";
import {
  changeStatusToCanceled,
  changeStatusToCheckIn,
  changeStatusToCheckOut,
  createNewBooking,
  getAllBookings,
  getBookingById,
} from "../controllers/bookings.controller";
import { validateToken } from "../middleware/validateToken";

const router = express.Router();

// get all bookings for admin
router.get("/", getAllBookings); // not used validateToken

// get single booking by id
router.get(
  "/:bookingId",
  check("bookingId", "Invalid bookingId").isHexadecimal(),
  getBookingById
);

// create new booking
router.post(
  "/create-booking",
  validateBookingData(),
  validateToken,
  createNewBooking
);

// check-in booking by Id
router.patch(
  "/check-in/:bookingId",
  checkBookingId(),
  // validateToken,
  changeStatusToCheckIn
);

// check-out booking by Id
router.patch(
  "/check-out/:bookingId",
  checkBookingId(),
  // validateToken,
  changeStatusToCheckOut
);

// cancel booking by Id
router.patch(
  "/cancel/:bookingId",
  checkBookingId(),
  // validateToken,
  changeStatusToCanceled
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

// valadinging bookingId
function checkBookingId() {
  return check("bookingId", "Invalid bookingId")
    .isHexadecimal()
    .isLength({ min: 24 });
}

export default router;
