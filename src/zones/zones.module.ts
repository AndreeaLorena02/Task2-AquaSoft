import { Module } from '@nestjs/common';
import { ZonesController } from './zones.controller';
import { ZonesService } from './zones.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Zones } from 'src/models/zones.model';

@Module({
  imports: [SequelizeModule.forFeature([Zones])],
  controllers: [ZonesController],
  providers: [ZonesService],
  exports: [ZonesService],
})
export class ZonesModule { }
