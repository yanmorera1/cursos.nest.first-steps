import { randomUUID } from 'crypto'
import { Brand } from 'src/brands/entities/brand.entity'

export const BRANDS_SEED: Brand[] = [
  {
    id: randomUUID(),
    name: 'Toyota',
    createdAt: new Date().getTime(),
  },
  {
    id: randomUUID(),
    name: 'Honda',
    createdAt: new Date().getTime(),
  },
  {
    id: randomUUID(),
    name: 'Jeep',
    createdAt: new Date().getTime(),
  },
]
