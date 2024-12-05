import { Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Regions } from './regions.model';
import { Cities } from './cities.model';

@Table({ tableName: 'Hotels', timestamps: false })
export class Hotels extends Model {
    @PrimaryKey
    @Column
    HotelID: number;

    @Column
    HotelName: string;

    @Column
    Latitude: number;

    @Column
    Longitude: number;

    @ForeignKey(() => Regions)
    @Column
    RegionID: number;

    @ForeignKey(() => Cities)
    @Column
    CityID: number;

    @Column
    Address: string;
}
