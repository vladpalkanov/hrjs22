import express from "express";
import { router } from "./user.routes";
import { connectDB } from "./config/dbConfig";
import dotenv from "dotenv";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use("/api/users", router);

const port = Number(process.env.PORT) || 3000;

app.listen(port, "127.0.0.1", () => {
  console.log("The server is listening the port:" + port);
});
