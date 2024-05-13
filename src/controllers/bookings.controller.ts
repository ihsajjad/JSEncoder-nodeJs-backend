/**
 * Title: Booking Controllers
 * Description: This file contains controller functions for managing hotel booking operations, such as creating, updating, and canceling bookings, as well as retrieving booking information.
 * Date: 10/5/2024
 * Note: I commented some authorization codes because swagger does'nt allow browser cookie for authentication because of securety reasons.
 */

import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Booking from "../models/Booking.model";
import Hotel from "../models/Hotel.model";

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    // setted userRole while validating token
    // if (req.userRole !== "Admin")
    //   return res.status(401).json({ message: "Unauthorized access" });

    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    console.log(__filename, error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  try {
    const bookingId = req.params.bookingId;

    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array() });

    const booking = await Booking.findById(bookingId);
    if (!booking)
      return res.status(404).json({ message: "Booking doesn't exist" });

    res.json(booking);
  } catch (error) {
    console.log(__filename, error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// /api/bookings/create-booking
export const createNewBooking = async (req: Request, res: Response) => {
  try {
    const bookingData = req.body;

    // validate incoming booking data
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array() });

    const hotel = await Hotel.findById(req.body.hotelId);
    if (!hotel) return res.status(404).json({ message: "Hotel doesn't exist" });

    bookingData.updatedAt = new Date();
    bookingData.status = "Pending";
    const booking = new Booking({
      ...bookingData,
      // Giving a static userId instead of original userId because the Swagger doesn't allow cookie authorization

      userId: "609def9c8c20c31200cf5ef8",
    });
    await booking.save();

    res.json({ message: "Hotel was booked successfully" });
  } catch (error) {
    console.log(__filename, error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// check-in booking by Id
export const changeStatusToCheckIn = async (req: Request, res: Response) => {
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
};

// check-out booking by Id
export const changeStatusToCheckOut = async (req: Request, res: Response) => {
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
};

// cancel booking by Id
export const changeStatusToCanceled = async (req: Request, res: Response) => {
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
};

// doing some validation to update booking status
async function validateHotelIdAndBooking(req: Request) {
  const bookingId = req.params.bookingId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) return { status: 400, message: errors.array() };

  const booking = await Booking.findById(bookingId);
  if (!booking) return { status: 404, message: "Booking doesn't exist" };

  // commented this code because swagger doesn't allow cookie authorization.
  // if (booking.userId !== req?.userId)
  //   return {
  //     status: 401,
  //     message: "Unauthorized access",
  //   };

  // const isExpiredBooking = new Date() >= booking.checkOutDate;
  // if (isExpiredBooking)
  //   return { status: 400, message: "Check-out date is expired!" };
}
