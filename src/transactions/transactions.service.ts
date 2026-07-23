import { Injectable } from '@nestjs/common';
import { mockData } from '../data';
import type { CreateTransactionDto } from './dto/create-transaction.dto';
import type { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  create(createTransactionDto: CreateTransactionDto) {
    return 'This action adds a new transaction';
  }

  findAll() {
    return mockData.transactions;
  }

  findOne(id: number) {
    return mockData.transactions.find((t) => t.id === id);
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return 'This action updates a transaction';
  }

  remove(id: number) {
    return 'This action removes a transaction';
  }
}
