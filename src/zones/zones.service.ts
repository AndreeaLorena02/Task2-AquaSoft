import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Zones } from '../models/zones.model';

@Injectable()
export class ZonesService {
    constructor(@InjectModel(Zones) private zoneModel: typeof Zones) { }

    async findAll(): Promise<Zones[]> {
        return await this.zoneModel.findAll();
    }

    async findOne(id: number): Promise<Zones> {
        return await this.zoneModel.findByPk(id);
    }

    async create(zone: Partial<Zones>): Promise<Zones> {
        return await this.zoneModel.create(zone);
    }

    async update(id: number, zone: Zones): Promise<Zones> {
        const existingZone = await this.zoneModel.findByPk(id);
        return existingZone.update(zone);
    }

    async delete(id: number): Promise<void> {
        const zone = await this.zoneModel.findByPk(id);
        await zone.destroy();
    }
}
