import { Schema, Document, Types } from "mongoose";

export interface Room extends Document {
  hotelId: Types.ObjectId; 
  roomType: string;
  roomNumber: string;
  description?: string;
  pricePerNight: number;
  capacity: number;
  amenities?: string[];
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const RoomSchema = new Schema<Room>(
  {
    hotelId: { type: Schema.Types.ObjectId, ref: "Hotel", required: true }, 
    roomType: { type: String, required: true },
    roomNumber: { type: String, required: true, unique: true },
    description: { type: String },
    pricePerNight: { type: Number, required: true },
    capacity: { type: Number, required: true },
    amenities: { type: [String] }, 
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

