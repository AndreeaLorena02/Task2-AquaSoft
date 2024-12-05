import { Module } from '@nestjs/common';
import { RegionsController } from './regions.controller';
import { RegionsService } from './regions.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Regions } from 'src/models/regions.model';

@Module({
  imports: [SequelizeModule.forFeature([Regions])],
  controllers: [RegionsController],
  providers: [RegionsService],
  exports: [RegionsService],
})
export class RegionsModule { }
