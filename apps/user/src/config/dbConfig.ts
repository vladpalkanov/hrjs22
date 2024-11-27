import mongoose from "mongoose";
import { logger } from "./loggerConfig";

export async function connectDB() {
  try {
    const link = process.env.MONGODB_LINK;
    if (!link) {
      throw new Error("MONGODB_LINK environment variable is not defined");
    }
    await mongoose.connect(link);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
}

["SIGINT", "SIGTERM", "SIGQUIT"].forEach((signal) =>
  process.on(signal, async () => {
    await mongoose.connection.close();
    process.exit();
  }),
);
