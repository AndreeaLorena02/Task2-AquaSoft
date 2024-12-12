import { Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Hotels } from './hotels.model';

@Table({ tableName: 'PriceOffers', timestamps: false })
export class PriceOffers extends Model {
    @PrimaryKey
    @Column
    OfferID: number;

    @ForeignKey(() => Hotels)
    @Column
    HotelID: number;

    @Column
    category_name: string;

    @Column
    price: number;
}
