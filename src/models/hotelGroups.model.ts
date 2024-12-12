import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'HotelGroups', timestamps: false })
export class HotelGroups extends Model {
    @PrimaryKey
    @Column
    GroupID: number;

    @Column
    group_name: string;
}
