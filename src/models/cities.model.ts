import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'Cities', timestamps: false })
export class Cities extends Model {
    @PrimaryKey
    @Column
    CityID: number;

    @Column
    CityName: string;

    @Column
    Country: string;
}
