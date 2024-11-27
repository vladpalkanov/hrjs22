import { Request, Response } from "express";
import {
  createUserService,
  deleteUserByIdService,
  getAllUsersService,
  getUserByIDService,
  updateUserByIDService,
} from "./user.service";
import {
  UndefinedUserError,
  UsedEmailError,
  ValidationError,
} from "./utils/errors";
import { logger } from "./config/loggerConfig";

export async function getAllUsers(_req: Request, res: Response) {
  try {
    logger.info("Getting all users");
    const users = await getAllUsersService();

    const updatedUsers = users.map((user) => {
      const { id, firstName, lastName, email, phone } = user;
      return { id, firstName, lastName, email, phone };
    });

    res.status(200).json({ users: updatedUsers });
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createUser(req: Request, res: Response): Promise<void> {
  try {
    logger.info("Creating a new user");
    const data = req.body;
    const user = await createUserService(data);
    const { id, firstName, lastName, phone, email, createdAt, updatedAt } =
      user;
    res.status(201).json({
      message: "User created successfully",
      user: { id, firstName, lastName, phone, email, createdAt, updatedAt },
    });
  } catch (error: any) {
    if (error instanceof ValidationError) {
      res.status(400).json({ message: error.message });
    } else if (error instanceof UsedEmailError) {
      res.status(409).json({ message: "Email is already in use" });
    } else {
      logger.error(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export async function getUserByID(req: Request, res: Response) {
  try {
    logger.info("Getting user by ID");
    const idParam = req.params.id;
    if (!idParam) {
      logger.error("User ID is not provided");
      res.status(400).json({ message: "User ID is required" });
      return;
    }
    const user = await getUserByIDService(idParam);
    const { id, firstName, lastName, phone, email, createdAt, updatedAt } =
      user;
    res.send({
      id,
      firstName,
      lastName,
      phone,
      email,
      createdAt,
      updatedAt,
    });
  } catch (err: any) {
    if (err instanceof UndefinedUserError) {
      res.status(404).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    logger.info("Updating user by ID");
    const idParam = req.params.id;
    if (!idParam) {
      logger.error("User ID is not provided");
      res.status(400).json({ message: "User ID is required" });
      return;
    }
    const data = req.body;
    const user = await updateUserByIDService(idParam, data);
    const { id, firstName, lastName, phone, email, createdAt, updatedAt } =
      user;
    res.send({
      id,
      firstName,
      lastName,
      phone,
      email,
      createdAt,
      updatedAt,
    });
  } catch (err: any) {
    if (err instanceof UndefinedUserError) {
      res.status(404).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export async function deleteUserById(req: Request, res: Response) {
  try {
    logger.info("Deleting user by Id")

    const idParam = req.params.id;

    if (!idParam) {
      logger.error("User ID is not provided");
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    await deleteUserByIdService(idParam);

    res.status(204).send();
  } catch (err: any) {
    if (err instanceof UndefinedUserError) {
      res.status(404).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
