import { Injectable, NotFoundException } from '@nestjs/common';
import { mockData } from '../data';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsRepository {
  findAll(): CreateTransactionDto[] {
    return mockData.transactions;
  }

  findOne(id: number): CreateTransactionDto {
    return mockData.transactions.find(
      (transaction) => transaction.id === id,
    ) as CreateTransactionDto;
  }

  create(createTransactionDto: CreateTransactionDto): CreateTransactionDto {
    const newData = {
      ...createTransactionDto,
      id: mockData.transactions.length + 1,
      createdAt: new Date(),
    };

    mockData.transactions.push(newData);
    return newData;
  }

  update(id: number, updateData: UpdateTransactionDto): UpdateTransactionDto {
    const currentTransaction = this.findOne(id);

    if (!currentTransaction)
      throw new NotFoundException('Transaction Not Found!');

    const updatedData = {
      ...currentTransaction,
      ...updateData,
    };

    mockData.transactions = mockData.transactions.map((transaction) =>
      transaction.id === id ? updatedData : transaction,
    );

    return updatedData;
  }

  remove(id: number) {
    const transactionToRemove = this.findOne(id);

    if (!transactionToRemove)
      throw new NotFoundException('Transaction not found');

    mockData.transactions = mockData.transactions.filter(
      (transaction) => transaction.id !== id,
    );

    return {
      message: 'Transaction deleted successfully',
      transactionToRemove,
    };
  }
}
