import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateBrandDto } from './dto/create-brand.dto'
import { UpdateBrandDto } from './dto/update-brand.dto'
import { Brand } from './entities/brand.entity'
import { randomUUID } from 'crypto'

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    // {
    //   id: randomUUID(),
    //   name: 'Toyota',
    //   createdAt: new Date().getTime(),
    // },
  ]

  create(createBrandDto: CreateBrandDto) {
    const { name } = createBrandDto
    const brand: Brand = {
      id: randomUUID(),
      name: name.toLocaleLowerCase(),
      createdAt: new Date().getTime(),
    }
    this.brands.push(brand)
    return brand
  }

  findAll() {
    return this.brands
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => brand.id === id)
    if (!brand) throw new NotFoundException(`Brand with id ${id} not found `)
    return brand
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandDb = this.findOne(id)
    this.brands = this.brands.map((brand) => {
      if (brand.id === id) {
        brandDb.updatedAt = new Date().getTime()
        brandDb = { ...brandDb, ...updateBrandDto, id }
        return brandDb
      }
      return brand
    })
    return brandDb
  }

  remove(id: string) {
    this.brands = this.brands.filter((brand) => brand.id == id)
  }

  fillBrandsWithSeedData(brands: Brand[]) {
    this.brands = brands
  }
}
