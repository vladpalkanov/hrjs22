import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Room } from './room.schema';

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

  async createRoom(hotelId: number, roomData: Partial<Room>): Promise<Room> {
    const newRoom = new this.roomModel({ ...roomData, hotelId });
    return newRoom.save();
  }

  async getRoomById(hotelId: number, roomId: string): Promise<Room> {
    if (!isValidObjectId(roomId)) {
      throw new NotFoundException('Invalid roomId');
    }
    const room = await this.roomModel.findOne({ hotelId, _id: roomId }).exec();
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    return room;
  }

  async updateRoom(
      hotelId: number,
      roomId: string,
      updateData: Partial<Room>,
  ): Promise<Room> {
    if (!isValidObjectId(roomId)) {
      throw new NotFoundException('Invalid roomId');
    }
    const updatedRoom = await this.roomModel
        .findOneAndUpdate({ hotelId, _id: roomId }, updateData, { new: true })
        .exec();
    if (!updatedRoom) {
      throw new NotFoundException('Room not found');
    }
    return updatedRoom;
  }

  async deleteRoom(hotelId: number, roomId: string): Promise<void> {
    if (!isValidObjectId(roomId)) {
      throw new NotFoundException('Invalid roomId');
    }
    const result = await this.roomModel
        .findOneAndDelete({ hotelId, _id: roomId })
        .exec();
    if (!result) {
      throw new NotFoundException('Room not found');
    }
  }

  async listRooms(
      hotelId: number,
      filters: any,
  ): Promise<{ rooms: Room[]; total: number }> {
    const query = { hotelId, ...filters };
    const rooms = await this.roomModel.find(query).exec();
    const total = await this.roomModel.countDocuments(query).exec();
    return { rooms, total };
  }
}
