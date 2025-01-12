import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { UndefinedUserError, UsedEmailError } from './utils/errors';
import { hashPassword } from './utils/hashPassword';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAllUsers() {
    return this.userModel.find().exec();
  }

  async createUser(userData: User) {
    const { email, password } = userData;

    const doesUserExist = await this.userModel.findOne({ email });
    if (doesUserExist) {
      throw new UsedEmailError();
    }
    const hashedPassword = await hashPassword(password);

    const user = {
      ...userData,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newUser = new this.userModel(user);
    await newUser.save();

    return newUser;
  }

  async getUserByID(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new UndefinedUserError();
    }
    return user;
  }

  async updateUser(id: string, updateUserDto: Partial<User>) {
    const user = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();

    if (!user) {
      throw new UndefinedUserError();
    }
    return user;
  }

  async deleteUser(id: string) {
    const result = await this.userModel.deleteOne({ _id: id });

    if (!result.deletedCount) {
      throw new UndefinedUserError();
    }
  }
}
