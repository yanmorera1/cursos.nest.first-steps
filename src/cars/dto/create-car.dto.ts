import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateCarDto {
  @IsString()
  @ApiProperty()
  readonly brand: string
  @IsString()
  @ApiProperty()
  readonly model: string
}
