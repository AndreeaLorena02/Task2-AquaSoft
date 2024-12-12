import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { Hotels } from '../models/hotels.model';
import { JwtAuthGuard } from 'src/jwt/jwt.guard';


@Controller('hotels')
export class HotelsController {
    constructor(private hotelsService: HotelsService) { }

    @Get('/best-offers-airport')
    async getBestOffers(
        @Query('airportId') airportId: number,
    ) {
        return await this.hotelsService.getOffersByAirport(airportId);
    }

    @Get()
    async getAllHotels(): Promise<Hotels[]> {
        return await this.hotelsService.findAll();
    }

    @Get('/by-name')
    async getHotelByName(@Query('name') name: string): Promise<Hotels | null> {
        return await this.hotelsService.findByName(name);
    }

    @Post()
    async createHotel(@Body() hotelData: Partial<Hotels>): Promise<Hotels> {
        return await this.hotelsService.create(hotelData);
    }

    @Put('/:id')
    async updateHotel(
        @Param('id') id: number,
        @Body() hotelData: Partial<Hotels>,
    ): Promise<Hotels> {
        return await this.hotelsService.update(id, hotelData);
    }

    @Delete('/:id')
    async deleteHotel(@Param('id') id: number): Promise<{ message: string }> {
        await this.hotelsService.delete(id);
        return { message: `Hotel with ID ${id} has been deleted.` };
    }

    @UseGuards(JwtAuthGuard)
    @Delete('name/:name')
    async deleteHotelByName(@Param('name') name: string) {
        return this.hotelsService.deleteHotelByName(name);
    }
}


