import { Request, Response } from "express";
import { HotelService } from "./hotel.service";
import { logger } from "./config/loggerConfig";

export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  async getAllHotels(_req: Request, res: Response) {
    try {
      logger.info("Getting all hotels");
      const hotels = await this.hotelService.findAll();
      res.status(200).json({ hotels });
    } catch (err: any) {
      logger.error(err.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async createHotel(req: Request, res: Response) {
    try {
      logger.info("Creating a new hotel");
      const hotel = await this.hotelService.createOne(req.body);
      res.status(201).json({
        message: "Hotel created successfully",
        hotel
      });
    } catch (error: any) {
      logger.error(error.message);
      res.status(400).json({ message: error.message });
    }
  }

  async getHotelById(req: Request, res: Response) {
    try {
      logger.info("Getting hotel by ID");
      const idParam = req.params.id;
      if (!idParam) {
        logger.error("Hotel ID is not provided");
        res.status(400).json({ message: "Hotel ID is required" });
        return;
      }

      const hotel = await this.hotelService.findOneById(idParam);
      if (!hotel) {
        res.status(404).json({ message: "Hotel not found" });
        return;
      }

      res.status(200).json(hotel);
    } catch (err: any) {
      logger.error(err.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateHotel(req: Request, res: Response) {
    try {
      logger.info("Updating hotel by ID");
      const idParam = req.params.id;
      if (!idParam) {
        logger.error("Hotel ID is not provided");
        res.status(400).json({ message: "Hotel ID is required" });
        return;
      }

      const exists = await this.hotelService.exists(idParam);
      if (!exists) {
        res.status(404).json({ message: "Hotel not found" });
        return;
      }

      const hotel = await this.hotelService.updateOneById(idParam, req.body);
      res.status(200).json(hotel);
    } catch (err: any) {
      logger.error(err.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async deleteHotel(req: Request, res: Response) {
    try {
      logger.info("Deleting hotel by ID");
      const idParam = req.params.id;
      if (!idParam) {
        logger.error("Hotel ID is not provided");
        res.status(400).json({ message: "Hotel ID is required" });
        return;
      }

      const hotel = await this.hotelService.deleteOneById(idParam);
      if (!hotel) {
        res.status(404).json({ message: "Hotel not found" });
        return;
      }

      res.status(204).send();
    } catch (err: any) {
      logger.error(err.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}