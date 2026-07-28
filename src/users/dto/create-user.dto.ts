import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
} from 'class-validator';
import { Role } from '../../generated/prisma/enums';

export class CreateUserDto {
  @IsOptional()
  @ApiProperty({ required: false })
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  password: string;

  @IsEnum(Role)
  @IsNotEmpty()
  @ApiProperty({ enum: Role })
  role: Role;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  createdAt: string;
}
