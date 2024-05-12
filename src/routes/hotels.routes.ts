/**
 * Title: Hotels Routes
 * Description: This file defines routes related to hotel management, including CRUD operations for hotels and related functionalities.
 * Author: MD Iftekher Hossen Sajjad
 * Date: 11/5/2024
 */

import express from "express";
import { check } from "express-validator";
import {
  addNewHotel,
  deleteHotelById,
  getAllHotels,
  getSingleHotelById,
  updateHotelById,
} from "../controllers/hotels.controller";

const router = express.Router();

// get all hotels
router.get("/", getAllHotels);

// get single hotel by Id
router.get(
  "/:hotelId",
  check("hotelId", "Invalid hotelId").isHexadecimal(),
  getSingleHotelById
);

// add new hotel
router.post("/add-hotel", validateHotelData(), addNewHotel);

// update single hotel by hotel Id
router.put(
  "/update/:hotelId",
  check("hotelId", "Invalid HotelId").isHexadecimal(),
  validateHotelData(),
  updateHotelById
);

// delete single hotel by Id
router.delete(
  "/delete/:hotelId",
  check("hotelId", "Invalid HotelId").isHexadecimal(),
  deleteHotelById
);

// common function for validating hotel data
function validateHotelData() {
  return [
    check("hotelName", "Hotel Name is required").isString(),
    check("description", "Description is required").isString(),
    check("pricePerNight", "PricePerNight is required").isNumeric(),
    check("address", "Address is required").isString(),
    check("starRating", "Star Rating is required").isNumeric(),
    check("facilities", "Facilities is required").isArray(),
    check("images", "Images is required").isArray(),
  ];
}

export default router;
