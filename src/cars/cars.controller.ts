import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common'
import { CarsService } from './cars.service'
import { CreateCarDto } from './dto/create-car.dto'

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}
  @Get()
  getAllCars() {
    return this.carsService.findAll()
  }

  @Get(':id')
  getCarById(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.findOneById(id)
  }

  @Post()
  createCar(@Body() createCarDto: CreateCarDto) {
    return createCarDto
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() createCarDto: CreateCarDto) {
    return { id, ...createCarDto }
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return { id }
  }
}
