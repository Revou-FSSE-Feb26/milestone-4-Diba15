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
  Req,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

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
  create(
    @Req() req: { user: { id: number } },
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    const userId = req.user.id;
    return this.transactionsService.create(userId, createTransactionDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all transactions' })
  @ApiResponse({
    status: 200,
    description: 'List of transactions',
  })
  findAll(@Req() req: { user: { id: number } }) {
    return this.transactionsService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find transaction by ID' })
  @ApiResponse({
    status: 200,
    description: 'Transaction found',
  })
  @ApiResponse({
    status: 404,
    description: 'Transaction not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: { user: { id: number } },
  ) {
    return this.transactionsService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update transaction' })
  @ApiResponse({
    status: 200,
    description: 'Transaction updated',
  })
  @ApiResponse({
    status: 404,
    description: 'Transaction not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTransactionDto: UpdateTransactionDto,
    @Req() req: { user: { id: number } },
  ) {
    return this.transactionsService.update(
      id,
      req.user.id,
      updateTransactionDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete transaction' })
  @ApiResponse({
    status: 200,
    description: 'Transaction deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Transaction not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: { user: { id: number } },
  ) {
    return this.transactionsService.remove(id, req.user.id);
  }
}
