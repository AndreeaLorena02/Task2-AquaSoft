import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { Cities } from '../models/cities.model';

@Module({
  imports: [SequelizeModule.forFeature([Cities])],
  controllers: [CitiesController],
  providers: [CitiesService],
  exports: [CitiesService],
})
export class CitiesModule { }
