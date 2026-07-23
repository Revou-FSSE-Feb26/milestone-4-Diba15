import { transactionType } from '../../data';
import {
  Min,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
export class CreateTransactionDto {
  @IsOptional()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  accountId: number;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsEnum(transactionType)
  @IsNotEmpty()
  type: transactionType;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsDate()
  @IsOptional()
  createdAt: Date;
}
