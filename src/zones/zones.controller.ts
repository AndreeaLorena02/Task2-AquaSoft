import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ZonesService } from './zones.service';
import { Zones } from '../models/zones.model';

@Controller('Zones')
export class ZonesController {
    constructor(private zonesService: ZonesService) { }

    @Get()
    async findAll() {
        return await this.zonesService.findAll();
    }

    @Get('/:id')
    async findOne(@Param('id') id: number) {
        return await this.zonesService.findOne(id);
    }

    @Post()
    async create(@Body() zone: Partial<Zones>): Promise<Zones> {
        return await this.zonesService.create(zone);
    }

    @Put('/:id')
    async update(@Param('id') id: number, @Body() zone: Zones) {
        return await this.zonesService.update(id, zone);
    }
    @Delete('/:id')
    async delete(@Param('id') id: number) {
        await this.zonesService.delete(id);
        return { message: `Zone with ID ${id} has been deleted.` };
    }
}
