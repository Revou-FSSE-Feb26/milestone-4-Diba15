import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ required: false })
  id: number;

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

  @IsDateString()
  @IsOptional()
  @ApiProperty({ required: false })
  createdAt: string;
}
