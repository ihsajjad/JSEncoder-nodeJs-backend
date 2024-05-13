/**
 * Title: Hotels Controllers
 * Description: This file contains controller functions for managing hotel-related operations, such as fetching hotel data, creating, updating, and deleting hotels.
 * Author: MD Iftekher Hossen
 * Date: 11/5/2024
 */

import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Hotel from "../models/Hotel.model";

export const getAllHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    console.log(__filename, error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSingleHotelById = async (req: Request, res: Response) => {
  try {
    const hotelId = req.params.hotelId;

    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array() });

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ message: "Hotel doesn't exist" });

    res.json(hotel);
  } catch (error) {
    console.log(__filename);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addNewHotel = async (req: Request, res: Response) => {
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
};

export const updateHotelById = async (req: Request, res: Response) => {
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
};

export const deleteHotelById = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array() });

    const hotel = await Hotel.findById(req.params.hotelId);
    if (!hotel) return res.status(404).json({ message: "Hotel doesn't exist" });

    await Hotel.findByIdAndDelete(hotel._id);

    res.json({ message: "Hotel was deleted successfully" });
  } catch (error) {
    console.log(__filename, error);
    res.status(500).json({ message: "Internal server error" });
  }
};
