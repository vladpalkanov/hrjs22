import express from "express";
import {createUser, deleteUserById, getAllUsers, getUserByID, updateUser} from "./user.controller";

export const router = express.Router();

router.get("/", getAllUsers)

router.get("/:id", getUserByID);

router.post("/", createUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUserById)
