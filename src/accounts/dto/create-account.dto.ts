import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEnum,
  Min,
  IsOptional,
} from 'class-validator';
import { AccountType } from '../../generated/prisma/enums';

export class CreateAccountDto {
  @IsOptional()
  @ApiProperty({
    example: 1,
    description: 'ID of account',
    required: false,
  })
  id: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: 'ID of user',
  })
  userId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'My Account',
    description: 'Name of account',
  })
  name: string;

  @IsEnum(AccountType)
  @IsNotEmpty()
  @ApiProperty({
    enum: AccountType,
    example: AccountType.BANK,
    description: 'Type of account',
  })
  type: AccountType;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({
    example: 1000,
    description: 'Balance of account',
    minimum: 1,
  })
  balance: number;
}
