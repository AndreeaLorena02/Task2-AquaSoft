import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cities } from '../models/cities.model';

@Injectable()
export class CitiesService {
    constructor(@InjectModel(Cities) private cityModel: typeof Cities) { }

    async findAll(): Promise<Cities[]> {
        return await this.cityModel.findAll();
    }

    async findOne(id: number): Promise<Cities> {
        return await this.cityModel.findByPk(id);
    }

    async create(city: Partial<Cities>): Promise<Cities> {
        return await this.cityModel.create(city);
    }

    async update(id: number, city: Cities): Promise<Cities> {
        const existingCity = await this.cityModel.findByPk(id);
        return existingCity.update(city);
    }

    async delete(id: number): Promise<void> {
        const city = await this.cityModel.findByPk(id);
        await city.destroy();
    }
}
