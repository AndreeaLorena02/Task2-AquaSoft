import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Hotels } from './models/hotels.model';
import { Cities } from './models/cities.model';
import { Regions } from './models/regions.model';
import { Zones } from './models/zones.model';
import { HotelsModule } from './hotels/hotels.module';
import { CitiesModule } from './cities/cities.module';
import { RegionsModule } from './regions/regions.module';
import { ZonesModule } from './zones/zones.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [SequelizeModule.forRoot({
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'Hotels',
    autoLoadModels: true,
    synchronize: true,
  }),
  SequelizeModule.forFeature([Hotels, Regions, Cities, Zones]),
    HotelsModule,
    CitiesModule,
    RegionsModule,
    ZonesModule,
    AuthModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
