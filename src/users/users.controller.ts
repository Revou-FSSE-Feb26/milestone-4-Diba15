import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../generated/prisma/enums';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of users',
  })
  @Roles(Role.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({
    status: 200,
    description: 'User found',
  })
  @UseGuards(JwtAuthGuard)
  findOne(
    @Req() req: { user: { sub: number; role: Role } },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.findOne(id, req.user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 200,
    description: 'User updated',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @UseGuards(JwtAuthGuard)
  update(
    @Req() req: { user: { sub: number; role: Role } },
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, req.user, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: 200,
    description: 'User deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @UseGuards(JwtAuthGuard)
  remove(
    @Req() req: { user: { sub: number; role: Role } },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.remove(+id, req.user);
  }
}
