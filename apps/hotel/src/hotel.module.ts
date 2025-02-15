import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelSchema } from '../schemas/hotel.schema';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Hotel', schema: HotelSchema }]),
  ],
  providers: [HotelService],
  controllers: [HotelController],
})
export class HotelModule {}
