import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsNotEmpty } from 'class-validator';
import { CategoryType } from '../../generated/prisma/enums';

export class CreateCategoryDto {
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
