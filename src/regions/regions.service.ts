import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Regions } from '../models/regions.model';

@Injectable()
export class RegionsService {
    constructor(@InjectModel(Regions) private regionModel: typeof Regions) { }

    async findAll(): Promise<Regions[]> {
        return await this.regionModel.findAll();
    }

    async findOne(id: number): Promise<Regions> {
        return await this.regionModel.findByPk(id);
    }

    async create(region: Partial<Regions>): Promise<Regions> {
        return await this.regionModel.create(region);
    }

    async update(id: number, region: Regions): Promise<Regions> {
        const existingRegion = await this.regionModel.findByPk(id);
        return existingRegion.update(region);
    }

    async delete(id: number): Promise<void> {
        const region = await this.regionModel.findByPk(id);
        await region.destroy();
    }
}
