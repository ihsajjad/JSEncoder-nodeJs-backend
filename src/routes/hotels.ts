import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import Hotel from "../models/Hotel";

const router = express.Router();

// get all hotels
router.get("/", async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    console.log(__filename, error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// add new hotel
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

router.put(
  "/update/:hotelId",
  check("hotelId", "Invalid HotelId").isHexadecimal(),
  validateAddHotelData(),
  async (req: Request, res: Response) => {
    try {
      const hotelData = req.body;
      const hotelId = req.params.hotelId;

      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ message: errors.array() });

      const isHotelExist = await Hotel.findById(hotelId);
      if (!isHotelExist)
        return res.status(404).json({ message: "Hotel doex't exist!" });

      await Hotel.findByIdAndUpdate(hotelId, hotelData);

      res.json({ message: "Hotel was updated successfully" });
    } catch (error) {
      console.log(__filename, error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// delete single hotel by Id
router.delete(
  "/delete/:hotelId",
  check("hotelId", "Hotel Id is required").isHexadecimal(),
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty())
        return res.status(400).json({ message: errors.array() });

      const hotel = await Hotel.findById(req.params.hotelId);
      if (!hotel)
        return res.status(404).json({ message: "Hotel doesn't exist" });

      await Hotel.findByIdAndDelete(hotel._id);

      res.json({ message: "Hotel was deleted successfully" });
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
