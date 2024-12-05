import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { Regions } from '../models/regions.model';

@Controller('Regions')
export class RegionsController {
    constructor(private regionsService: RegionsService) { }

    @Get()
    async findAll() {
        return await this.regionsService.findAll();
    }

    @Get('/:id')
    async findOne(@Param('id') id: number) {
        return await this.regionsService.findOne(id);
    }

    @Post()
    async create(@Body() region: Partial<Regions>): Promise<Regions> {
        return await this.regionsService.create(region);
    }

    @Put('/:id')
    async update(@Param('id') id: number, @Body() region: Regions) {
        return await this.regionsService.update(id, region);
    }
    @Delete('/:id')
    async delete(@Param('id') id: number) {
        await this.regionsService.delete(id);
        return { message: `Region with ID ${id} has been deleted.` };
    }
}
