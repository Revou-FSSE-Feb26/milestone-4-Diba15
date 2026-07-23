import { categoryType } from '../../data';
import { IsEnum, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(categoryType)
  @IsNotEmpty()
  type: categoryType;
}
