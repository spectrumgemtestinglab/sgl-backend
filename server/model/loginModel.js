// userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: String },
  otpCreatedAt: { type: Date },
  username: { type: String, required: true },
  whatsapp: { type: String },
  image: { type: String, required: true },
  address: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

export default User;
