import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Hotels } from '../models/hotels.model';

@Injectable()
export class HotelsService {
    constructor(@InjectModel(Hotels) private readonly hotelModel: typeof Hotels) { }

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
