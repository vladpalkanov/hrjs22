import mongoose from "mongoose";
import { TUser } from "./types/user";

const userSchema = new mongoose.Schema<TUser>({
  id: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true },
});

export const User = mongoose.model("User", userSchema);
