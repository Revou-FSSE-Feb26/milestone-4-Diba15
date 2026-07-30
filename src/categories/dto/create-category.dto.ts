import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsNotEmpty } from 'class-validator';
import { CategoryType } from '../../generated/prisma/enums';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEnum(CategoryType)
  @IsNotEmpty()
  @ApiProperty({ enum: CategoryType })
  type: CategoryType;
}
