import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { generateJWTToken } from "../lib/utils";
import User from "../models/User";

// user login
export const loginUser = async (req: Request, res: Response) => {
  try {
    const loginData = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array() });

    const user = await User.findOne({ email: loginData.email });
    if (!user) return res.status(400).json({ message: "User doesn't exist" });

    const isMatchedPassword = await bcrypt.compare(
      loginData.password,
      user.password
    );

    if (!isMatchedPassword)
      return res.status(400).json({ message: "Invalid password" });

    // built-in utils function to generate token
    const token = generateJWTToken(user?._id.toString(), user.role);

    // setting token to the browser cookie for authentication
    res.cookie("auth_token", token, {
      httpOnly: true,
      expires: new Date(86400000),
    });

    res.json({ message: "User login successfull" });
  } catch (error) {
    console.log(__filename, error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// user ragister
export const registerUser = async (req: Request, res: Response) => {
  try {
    // validate user data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    // checking user exists or not using the email
    const isUserExists = await User.findOne({ email: req.body.email });
    if (isUserExists)
      return res.status(400).json({ message: "The email is already in use" });

    const user = new User(req.body);
    await user.save();

    // built-in utils function to generate token
    const token = generateJWTToken(user?._id.toString(), user.role);

    res.cookie("auth_token", token, {
      httpOnly: true,
      expires: new Date(86400000),
    });

    res.json({ message: "User was created successfully" });
  } catch (error) {
    console.log(__dirname, error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// user logout
export const logoutUser = async (req: Request, res: Response) => {
  try {
    // remove the token from client's browser
    res
      .cookie("auth_token", "", { expires: new Date(0) })
      .json({ message: "User logged out successfull" });
  } catch (error) {
    console.log(__filename, error);
    res.status(500).json({ message: "Internal server error" });
  }
};
