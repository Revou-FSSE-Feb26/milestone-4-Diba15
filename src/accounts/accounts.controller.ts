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
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

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
    @CurrentUser('sub') sub: number,
    @Body() createAccountDto: CreateAccountDto,
  ) {
    return this.accountsService.create(sub, createAccountDto);
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
  findAll(@CurrentUser('sub') sub: number) {
    return this.accountsService.findAll(sub);
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
    @CurrentUser('sub') sub: number,
  ) {
    return this.accountsService.findOne(id, sub);
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
    @CurrentUser('sub') sub: number,
  ) {
    return this.accountsService.update(id, sub, updateAccountDto);
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
    @CurrentUser('sub') sub: number,
  ) {
    return this.accountsService.remove(id, sub);
  }
}
