import mongoose from "mongoose";
import { userSchema } from "./schemas/user.schema";

export const UserModel = mongoose.model("User", userSchema);
