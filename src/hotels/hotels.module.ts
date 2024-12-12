import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { Hotels } from 'src/models/hotels.model';
import { Airports } from 'src/models/airports.model';
import { PriceOffers } from 'src/models/priceOffers.model';

@Module({
  imports: [SequelizeModule.forFeature([Hotels, Airports, PriceOffers])],
  controllers: [HotelsController],
  providers: [HotelsService],
  exports: [HotelsService],
})
export class HotelsModule { }
