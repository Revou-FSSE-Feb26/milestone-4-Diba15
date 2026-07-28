import { IsEnum, IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { CategoryType } from '../../generated/prisma/enums';

export class CreateCategoryDto {
  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(CategoryType)
  @IsNotEmpty()
  type: CategoryType;
}
