import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { Cities } from '../models/cities.model';

@Controller('Cities')
export class CitiesController {
    constructor(private citiesService: CitiesService) { }

    @Get()
    async findAll() {
        return await this.citiesService.findAll();
    }

    @Get('/:id')
    async findOne(@Param('id') id: number) {
        return await this.citiesService.findOne(id);
    }

    @Post()
    async create(@Body() city: Partial<Cities>): Promise<Cities> {
        return await this.citiesService.create(city);
    }

    @Put('/:id')
    async update(@Param('id') id: number, @Body() city: Cities) {
        return await this.citiesService.update(id, city);
    }
    @Delete('/:id')
    async delete(@Param('id') id: number) {
        await this.citiesService.delete(id);
        return { message: `City with ID ${id} has been deleted.` };
    }
}
