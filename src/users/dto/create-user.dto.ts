import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';
import { Role } from '../../generated/prisma/enums';

export class CreateUserDto {
  @IsOptional()
  @ApiProperty({
    example: 1,
    description: 'ID of user',
    required: false,
  })
  id?: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'mas arif', description: 'Name of user' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'mas.arif@example.com',
    description: 'Email of user',
  })
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    example: 'password123',
    description: 'Password of user',
  })
  password: string;

  @IsEnum(Role)
  @IsOptional()
  @ApiProperty({
    enum: Role,
    example: Role.USER,
    description: 'Role of user',
  })
  role?: Role;
}
