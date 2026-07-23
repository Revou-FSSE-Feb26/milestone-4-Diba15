import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { accountType } from '../../data';

export class CreateAccountDto {
  @IsOptional()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(accountType)
  @IsNotEmpty()
  type: accountType;

  @IsNumber()
  @IsNotEmpty()
  balance: number;

  @IsDateString()
  @IsNotEmpty()
  createdAt: string;
}
