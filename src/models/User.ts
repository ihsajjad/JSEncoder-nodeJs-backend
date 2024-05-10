import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { UserDataType } from "../shared/types";

const UserSchema = new mongoose.Schema<UserDataType>({
  fullName: { type: String, required: [true, "Full Name is required"] },
  email: { type: String, required: [true, "Email is required"], unique: true },
  password: { type: String, required: [true, "Password is required"] },
  role: { type: String, enum: ["User", "Admin"], default: "User" },
  bookings: { type: String },
});

// hassing the password before storing to the database
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model<UserDataType>("User", UserSchema);

export default User;
