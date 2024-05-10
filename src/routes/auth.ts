import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/User";

const router = express.Router();

// register user
router.post(
  "/register",
  [
    check("fullName", "Full Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isString(),
  ],
  async (req: Request, res: Response) => {
    try {
      const userData = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }

      // checking user exists or not using the email
      const isUserExists = await User.findOne({ email: userData.email });
      if (isUserExists)
        return res.status(400).json({ message: "The email is already in use" });

      const user = new User(userData);
      await user.save();

      res.json({ message: "User was created successfully" });
    } catch (error) {
      console.log(__dirname, error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
