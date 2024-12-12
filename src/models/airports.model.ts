import { Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Cities } from './cities.model';

@Table({ tableName: 'Airports', timestamps: false })
export class Airports extends Model {
    @PrimaryKey
    @Column
    AirportID: number;

    @Column
    iata_code: string;

    @Column
    airport_name: string;

    @ForeignKey(() => Cities)
    @Column
    CityID: number;

    @Column
    Latitude: number;

    @Column
    Longitude: number;
}
