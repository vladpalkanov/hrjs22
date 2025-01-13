import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserSchema, UpdateUserSchema } from './dto/user.schemas';
import { ZodValidationPipe } from './pipes/zodValidation.pipe';
import { User } from './user.schema';
import { UndefinedUserError, UsedEmailError } from './utils/errors';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<{ users: Partial<User>[] }> {
    const users = await this.userService.getAllUsers();
    const updatedUsers = users.map(
      ({ id, firstName, lastName, email, phone }) => ({
        id,
        firstName,
        lastName,
        email,
        phone,
      }),
    );

    return { users: updatedUsers };
  }

  @Post()
  async createUser(
    @Body(new ZodValidationPipe(CreateUserSchema)) createUserDto: User,
  ) {
    try {
      const user = await this.userService.createUser(createUserDto);

      return {
        message: 'User created successfully',
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      };
    } catch (error: unknown) {
      if (error instanceof UsedEmailError) {
        throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getUserByID(
    @Param('id') id: string,
  ): Promise<Partial<User> & { id: number }> {
    try {
      const user = await this.userService.getUserByID(id);

      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (err: unknown) {
      if (err instanceof UndefinedUserError) {
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateUserSchema)) updateUserDto: Partial<User>,
  ) {
    try {
      const user = await this.userService.updateUser(id, updateUserDto);

      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (error: unknown) {
      if (error instanceof UndefinedUserError) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string): Promise<void> {
    try {
      await this.userService.deleteUser(id);
    } catch (err: unknown) {
      if (err instanceof UndefinedUserError) {
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
