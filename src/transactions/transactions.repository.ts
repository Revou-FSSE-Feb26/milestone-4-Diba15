import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransactionsRepository {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.transaction.findMany();
  }

  async findOne(id: number) {
    return this.prisma.transaction.findUnique({
      where: { id },
    });
  }

  getAccountBalance(id: number) {
    return this.prisma.account.findUnique({
      where: { id },
      select: { balance: true },
    });
  }

  create(createTransactionDto: CreateTransactionDto) {
    if (createTransactionDto.type === 'INCOME') {
      return this.prisma.$transaction([
        this.prisma.transaction.create({ data: createTransactionDto }),
        this.prisma.account.update({
          where: { id: createTransactionDto.accountId },
          data: { balance: { increment: createTransactionDto.amount } },
        }),
      ]);
    }

    return this.prisma.$transaction([
      this.prisma.transaction.create({ data: createTransactionDto }),
      this.prisma.account.update({
        where: { id: createTransactionDto.accountId },
        data: { balance: { decrement: createTransactionDto.amount } },
      }),
    ]);
  }

  async update(
    id: number,
    accountId: number,
    updateTransactionDto: UpdateTransactionDto,
    balanceChange: number,
  ) {
    return this.prisma.$transaction([
      this.prisma.transaction.update({
        where: { id: id },
        data: updateTransactionDto,
      }),
      this.prisma.account.update({
        where: { id: accountId },
        data: {
          balance:
            balanceChange > 0
              ? { increment: balanceChange }
              : { decrement: Math.abs(balanceChange) },
        },
      }),
    ]);
  }

  async remove(id: number, accountId: number, balanceChange: number) {
    return this.prisma.$transaction([
      this.prisma.transaction.delete({
        where: { id },
      }),
      this.prisma.account.update({
        where: { id: accountId },
        data: {
          balance:
            balanceChange > 0
              ? { increment: balanceChange }
              : { decrement: Math.abs(balanceChange) },
        },
      }),
    ]);
  }
}
