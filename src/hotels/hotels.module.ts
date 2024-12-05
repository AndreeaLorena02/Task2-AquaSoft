import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { Hotels } from 'src/models/hotels.model';

@Module({
  imports: [SequelizeModule.forFeature([Hotels])],
  controllers: [HotelsController],
  providers: [HotelsService],
  exports: [HotelsService],
})
export class HotelsModule { }
