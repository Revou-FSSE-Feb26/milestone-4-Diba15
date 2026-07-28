import {
  Min,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TransactionType } from '../../generated/prisma/enums';

export class CreateTransactionDto {
  @IsOptional()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  accountId: number;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsDateString()
  @IsOptional()
  createdAt: string;
}
