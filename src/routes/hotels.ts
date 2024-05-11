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
/**
 * @openapi
 * /:
 *   get:
 *     summary: Get all hotels
 *     description: Retrieve a list of all hotels.
 *     responses:
 *       '200':
 *         description: A list of hotels
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The unique identifier for the hotel
 *                   name:
 *                     type: string
 *                     description: The name of the hotel
 *                   // Add other properties of a hotel here
 *     // Add other response codes and descriptions as needed
 */
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
  check("hotelId", "Hotel Id is required").isHexadecimal(),
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
