import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionsRepositoryInterface } from '../common/interfaces/transactions.repository.interface';

@Injectable()
export class TransactionsRepository implements TransactionsRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: number) {
    return this.prisma.transaction.findMany({
      where: {
        account: {
          userId: userId,
        },
      },
    });
  }

  async findOne(id: number, userId: number) {
    return this.prisma.transaction.findFirst({
      where: {
        id,
        account: {
          userId: userId,
        },
      },
      include: {
        account: true,
      },
    });
  }

  async verifyAccountOwnership(accountId: number, userId: number) {
    return this.prisma.account.findFirst({
      where: {
        id: accountId,
        userId: userId,
      },
      select: { id: true, balance: true },
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
