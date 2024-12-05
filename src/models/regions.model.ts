import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'Regions', timestamps: false })
export class Regions extends Model {
    @PrimaryKey
    @Column
    RegionID: number;

    @Column
    regionName: string;

    @Column
    country: string;
}
