import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ required: false })
  id: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEnum(AccountType)
  @IsNotEmpty()
  @ApiProperty({ enum: AccountType })
  type: AccountType;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  balance: number;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  createdAt: string;
}
