import { Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Regions } from './regions.model';

@Table({ tableName: 'Zones', timestamps: false })
export class Zones extends Model {
    @PrimaryKey
    @Column
    RegionID: number;

    @Column
    zoneName: string;

    @ForeignKey(() => Regions)
    @Column
    regionId: number;
}
