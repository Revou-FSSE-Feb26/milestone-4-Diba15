import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { CategoryType } from '../../generated/prisma/enums';

export class CreateCategoryDto {
  @IsOptional()
  @ApiProperty({
    example: 1,
    description: 'ID of category',
    required: false,
  })
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Food',
    description: 'Name of category',
  })
  name: string;

  @IsEnum(CategoryType)
  @IsNotEmpty()
  @ApiProperty({
    enum: CategoryType,
    example: CategoryType.EXPENSE,
    description: 'Type of category',
  })
  type: CategoryType;
}
