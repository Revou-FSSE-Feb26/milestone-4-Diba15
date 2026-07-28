import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { AccountType } from '../../generated/prisma/enums';

export class CreateAccountDto {
  @IsOptional()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(AccountType)
  @IsNotEmpty()
  type: AccountType;

  @IsNumber()
  @IsNotEmpty()
  balance: number;

  @IsDateString()
  @IsNotEmpty()
  createdAt: string;
}
