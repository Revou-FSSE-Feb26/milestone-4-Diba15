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
    @Req() req: { user: { sub: number } },
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionsService.create(req.user.sub, createTransactionDto);
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
  findAll(@Req() req: { user: { sub: number } }) {
    return this.transactionsService.findAll(req.user.sub);
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
    @Req() req: { user: { sub: number } },
  ) {
    return this.transactionsService.findOne(id, req.user.sub);
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
    @Body() updateTransactionDto: UpdateTransactionDto,
    @Req() req: { user: { sub: number } },
  ) {
    return this.transactionsService.update(
      id,
      req.user.sub,
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
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Transaction not found',
  })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: { user: { sub: number } },
  ) {
    return this.transactionsService.remove(id, req.user.sub);
  }
}
