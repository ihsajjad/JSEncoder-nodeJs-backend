import mongoose from "mongoose";
import { UserDataType } from "../shared/types";

const UserSchema = new mongoose.Schema<UserDataType>({
  fullName: { type: String, required: [true, "Full Name is required"] },
  email: { type: String, required: [true, "Email is required"] },
  password: { type: String, required: [true, "Password is required"] },
  role: { type: String, enum: ["User", "Admin"], default: "User" },
  bookings: { type: String },
});

const User = mongoose.model<UserDataType>("User", UserSchema);

export default User;
