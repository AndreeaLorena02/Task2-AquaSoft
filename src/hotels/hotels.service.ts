import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Hotels } from '../models/hotels.model';
import { Airports } from '../models/airports.model';
import { PriceOffers } from 'src/models/priceOffers.model';

@Injectable()
export class HotelsService {
    constructor(@InjectModel(Hotels) private readonly hotelModel: typeof Hotels,
        @InjectModel(Airports) private airportsModel: typeof Airports,
        @InjectModel(PriceOffers) private priceOffersModel: typeof PriceOffers) { }

    private haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const toRad = (value: number) => (value * Math.PI) / 180;

        const R = 6371;
        const differenceLat = toRad(lat2 - lat1);
        const differenceLon = toRad(lon2 - lon1);
        const a =
            Math.sin(differenceLat / 2) * Math.sin(differenceLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(differenceLon / 2) * Math.sin(differenceLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    async getOffersByAirport(airportId: number): Promise<any[]> {
        const airport = await this.airportsModel.findByPk(airportId);
        if (!airport) {
            throw new Error('Airport not found!');
        }

        const { Latitude: airportLat, Longitude: airportLon } = airport;

        const hotels = await this.hotelModel.findAll();
        const hotelsDist = hotels.map(hotel => {
            const distance = this.haversine(
                airportLat,
                airportLon,
                hotel.Latitude,
                hotel.Longitude,
            );
            return { ...hotel.toJSON(), distance };
        });

        const closestHotels = hotelsDist.filter(hotel => hotel.distance <= 50);

        if (closestHotels.length === 0) {
            return [];
        }

        const ids = closestHotels.map(hotel => hotel.HotelID);
        const offers = await this.priceOffersModel.findAll({
            where: { HotelID: ids },
        });

        const result = offers.map(offer => {
            const hotel = closestHotels.find(h => h.HotelID === offer.HotelID);
            return {
                hotelName: hotel.HotelName,
                category: offer.category_name,
                price: offer.price,
                distance: hotel.distance,
            };
        });

        return result.sort((hotel1, hotel2) => hotel1.price - hotel2.price);
    }

    async findAll(): Promise<Hotels[]> {
        return await this.hotelModel.findAll();
    }

    async findByName(name: string): Promise<Hotels | null> {
        return await this.hotelModel.findOne({
            where: { hotelName: name },
        });
    }

    async create(hotelData: Partial<Hotels>): Promise<Hotels> {
        return await this.hotelModel.create(hotelData);
    }

    async update(id: number, hotelData: Partial<Hotels>): Promise<Hotels> {
        const hotel = await this.hotelModel.findByPk(id);
        if (!hotel) {
            throw new NotFoundException(`Hotel with ID ${id} not found.`);
        }
        return await hotel.update(hotelData);
    }

    async delete(id: number): Promise<void> {
        const hotel = await this.hotelModel.findByPk(id);
        if (!hotel) {
            throw new NotFoundException(`Hotel with ID ${id} not found.`);
        }
        await hotel.destroy();
    }
    async deleteHotelByName(name: string) {
        const hotel = await this.hotelModel.findOne({ where: { HotelName: name } });
        if (!hotel) {
            throw new NotFoundException(`Hotel with name ${name} not found`);
        }
        await hotel.destroy();
        return { message: `Hotel with name ${name} deleted successfully` };
    }

}
