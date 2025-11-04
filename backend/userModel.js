// backend/src/models/userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    pin: {
      type: String,
    },
    loginType: {
      type: String, // e.g. "email", "google", "biometric"
    },
    role: {
      type: String,
      default: "",
    },
    subRole: {
      type: String,
      default: "",
    },
    customPurpose: {
      type: String, // for custom diary purpose
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
