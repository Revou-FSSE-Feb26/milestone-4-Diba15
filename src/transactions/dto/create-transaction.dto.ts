import { ApiProperty } from '@nestjs/swagger';
import {
  Min,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TransactionType } from '../../generated/prisma/enums';

export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  accountId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  categoryId: number;

  @IsEnum(TransactionType)
  @IsNotEmpty()
  @ApiProperty({ enum: TransactionType })
  type: TransactionType;

  @IsNumber()
  @Min(0)
  @ApiProperty()
  amount: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  description: string;
}
