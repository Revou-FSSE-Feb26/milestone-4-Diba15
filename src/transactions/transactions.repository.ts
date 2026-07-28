import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async create(createTransactionDto: CreateTransactionDto) {
    const account = await this.prisma.account.findUnique({
      where: { id: createTransactionDto.accountId },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    // Pengubahan saldo dari desimal ke number untuk perbandingan
    const balance: number = Number(account.balance ?? 0);

    // Cek saldo untuk tipe pengeluaran
    if (
      (createTransactionDto.type === 'EXPENSE' ||
        createTransactionDto.type === 'TRANSFER') &&
      balance < createTransactionDto.amount
    ) {
      throw new BadRequestException('Insufficient funds');
    }

    if (createTransactionDto.type === 'INCOME') {
      return await this.prisma.$transaction([
        this.prisma.transaction.create({ data: createTransactionDto }),
        this.prisma.account.update({
          where: { id: createTransactionDto.accountId },
          data: { balance: { increment: createTransactionDto.amount } },
        }),
      ]);
    }

    // Default return untuk pengeluaran
    return await this.prisma.$transaction([
      this.prisma.transaction.create({ data: createTransactionDto }),
      this.prisma.account.update({
        where: { id: createTransactionDto.accountId },
        data: { balance: { decrement: createTransactionDto.amount } },
      }),
    ]);
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.findOne(id);

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    // Transaksi untuk pemasukan
    if (transaction.type === 'INCOME') {
      return await this.prisma.$transaction([
        this.prisma.transaction.update({
          where: { id },
          data: updateTransactionDto,
        }),
        this.prisma.account.update({
          where: { id: transaction.accountId },
          data: { balance: { increment: updateTransactionDto.amount ?? 0 } },
        }),
      ]);
    }

    // Transaksi untuk pengeluaran
    return await this.prisma.$transaction([
      this.prisma.transaction.update({
        where: { id },
        data: updateTransactionDto,
      }),
      this.prisma.account.update({
        where: { id: transaction.accountId },
        data: { balance: { decrement: updateTransactionDto.amount ?? 0 } },
      }),
    ]);
  }

  async remove(id: number) {
    const transaction = await this.findOne(id);

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    // Transaksi untuk pemasukan
    if (transaction.type === 'INCOME') {
      return await this.prisma.$transaction([
        this.prisma.transaction.delete({
          where: { id },
        }),
        this.prisma.account.update({
          where: { id: transaction.accountId },
          data: { balance: { decrement: transaction.amount } },
        }),
      ]);
    }

    // Transaksi untuk pengeluaran
    return await this.prisma.$transaction([
      this.prisma.transaction.delete({
        where: { id },
      }),
      this.prisma.account.update({
        where: { id: transaction.accountId },
        data: { balance: { increment: transaction.amount } },
      }),
    ]);
  }
}
