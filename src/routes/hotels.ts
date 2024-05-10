import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import Hotel from "../models/Hotel";

const router = express.Router();

router.post(
  "/add-hotel",
  validateAddHotelData(), // validating hotel data | the function is at bottom
  async (req: Request, res: Response) => {
    const hotelData = req.body;
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty())
        return res.status(400).json({ message: errors.array() });

      hotelData.updatedAt = new Date();
      const hotel = new Hotel(hotelData);
      await hotel.save();

      res.json({ message: "Hotel was added successfully" });
    } catch (error) {
      console.log(__filename, error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

function validateAddHotelData() {
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
