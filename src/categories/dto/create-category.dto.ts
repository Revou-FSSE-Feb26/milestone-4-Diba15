import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { CategoryType } from '../../generated/prisma/enums';

export class CreateCategoryDto {
  @IsOptional()
  @ApiProperty({ required: false })
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEnum(CategoryType)
  @IsNotEmpty()
  @ApiProperty({ enum: CategoryType })
  type: CategoryType;
}
