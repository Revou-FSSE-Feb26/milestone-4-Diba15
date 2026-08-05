import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new account' })
  @ApiResponse({
    status: 201,
    description: 'Account created',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  create(
    @Req() req: { user: { sub: number } },
    @Body() createAccountDto: CreateAccountDto,
  ) {
    return this.accountsService.create(req.user.sub, createAccountDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all accounts' })
  @ApiResponse({
    status: 200,
    description: 'List of accounts',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  findAll(@Req() req: { user: { sub: number } }) {
    return this.accountsService.findAll(req.user.sub);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find account by ID' })
  @ApiResponse({
    status: 200,
    description: 'Account found',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Account not found',
  })
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: { user: { sub: number } },
  ) {
    return this.accountsService.findOne(id, req.user.sub);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update account' })
  @ApiResponse({
    status: 200,
    description: 'Account updated',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Account not found',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAccountDto: UpdateAccountDto,
    @Req() req: { user: { sub: number } },
  ) {
    return this.accountsService.update(id, req.user.sub, updateAccountDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete account' })
  @ApiResponse({
    status: 200,
    description: 'Account deleted',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Account not found',
  })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: { user: { sub: number } },
  ) {
    return this.accountsService.remove(id, req.user.sub);
  }
}
