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
import { UpdateCarDto } from './dto/update-car.dto'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { Car } from './interfaces/car.interface'

@Controller('cars')
@ApiTags('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}
  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  getAllCars(): Car[] {
    return this.carsService.findAll()
  }

  @Get(':id')
  getCarById(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.findOneById(id)
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The created car',
  })
  createCar(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto)
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    return this.carsService.update(id, updateCarDto)
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.delete(id)
  }
}
