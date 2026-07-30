import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsEnum } from 'class-validator';
import { AccountType } from '../../generated/prisma/enums';

export class CreateAccountDto {
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
}
