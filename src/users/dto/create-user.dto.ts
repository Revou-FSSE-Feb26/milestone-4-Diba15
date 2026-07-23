import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
} from 'class-validator';
import { role } from '../../data';

export class CreateUserDto {
  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsEnum(role)
  @IsNotEmpty()
  role: role;

  @IsDate()
  @IsOptional()
  createdAt: Date;
}
