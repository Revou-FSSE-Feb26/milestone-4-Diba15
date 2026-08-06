import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiResponse({
    status: 201,
    description: 'Transaction created',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input or insufficient funds',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Account not found or invalid permission',
  })
  create(
    @CurrentUser('sub') sub: number,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionsService.create(sub, createTransactionDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all transactions' })
  @ApiResponse({
    status: 200,
    description: 'List of transactions',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  findAll(@CurrentUser('sub') sub: number) {
    return this.transactionsService.findAll(sub);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find transaction by ID' })
  @ApiResponse({
    status: 200,
    description: 'Transaction found',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Transaction not found',
  })
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('sub') sub: number,
  ) {
    return this.transactionsService.findOne(id, sub);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update transaction' })
  @ApiResponse({
    status: 200,
    description: 'Transaction updated',
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
    description: 'Transaction not found',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('sub') sub: number,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(id, sub, updateTransactionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete transaction' })
  @ApiResponse({
    status: 200,
    description: 'Transaction deleted',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Transaction not found',
  })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('sub') sub: number,
  ) {
    return this.transactionsService.remove(id, sub);
  }
}
