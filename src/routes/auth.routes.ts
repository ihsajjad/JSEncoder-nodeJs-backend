/**
 * Title: Authentication Routes
 * Description: This file defines routes related to user authentication, such as login, registration, and logout.
 * Author: MD Iftekher Hossen Sajjad
 * Date: 10/5/2024
 */

import express from "express";
import { check } from "express-validator";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/auth.controllers";

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isString(),
    check("password", "Password is required").isString(),
  ],
  loginUser
);

// register user
router.post(
  "/register",
  [
    check("fullName", "Full Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isString(),
  ],
  registerUser
);

// logout user
router.post("/logout", logoutUser);

export default router;
