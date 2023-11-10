import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Car } from './interfaces/car.interface'
import { randomUUID } from 'node:crypto'
import { CreateCarDto, UpdateCarDto } from './dto'

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: randomUUID(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: randomUUID(),
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: randomUUID(),
      brand: 'Jeep',
      model: 'Cherokee',
    },
  ]

  public findAll() {
    return this.cars
  }

  public findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id)
    if (!car) throw new NotFoundException(`Car with id ${id} not found`)
    return car
  }

  public create(createCarDto: CreateCarDto) {
    const car: Car = {
      id: randomUUID(),
      ...createCarDto,
    }
    this.cars.push(car)
    return car
  }

  public update(id: string, updateCarDto: UpdateCarDto) {
    let carDb = this.findOneById(id)
    if (updateCarDto.id && updateCarDto.id !== id)
      throw new BadRequestException('Car id is not valid inside body')
    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDb = {
          ...carDb,
          ...updateCarDto,
          id,
        }
        return carDb
      }
      return car
    })
    return carDb
  }

  public delete(id: string) {
    const carDb = this.findOneById(id)
    this.cars = this.cars.filter((car) => car !== carDb)
  }
}
