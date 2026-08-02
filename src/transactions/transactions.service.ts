import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsRepository } from './transactions.repository';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  getAccountBalance(id: number) {
    return this.transactionsRepository.getAccountBalance(id);
  }

  async create(createTransactionDto: CreateTransactionDto) {
    const accountBalance = await this.getAccountBalance(
      createTransactionDto.accountId,
    );

    if (!accountBalance) throw new NotFoundException('Account not found');

    const balance: number = Number(accountBalance.balance ?? 0);

    if (
      (createTransactionDto.type === 'EXPENSE' ||
        createTransactionDto.type === 'TRANSFER') &&
      balance < createTransactionDto.amount
    ) {
      throw new BadRequestException('Insufficient funds');
    }

    return this.transactionsRepository.create(createTransactionDto);
  }

  findAll() {
    return this.transactionsRepository.findAll();
  }

  async findOne(id: number) {
    const findTransaction = await this.transactionsRepository.findOne(id);

    if (!findTransaction)
      throw new NotFoundException(`Transaction #${id} not found`);

    return findTransaction;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.findOne(id);

    if (!transaction)
      throw new NotFoundException(`Transaction #${id} not found`);

    // Hitung perubahan saldo berdasarkan tipe transaksi
    const oldAmount = Number(transaction.amount ?? 0);
    const newAmount = Number(updateTransactionDto.amount ?? 0);
    const amountDiff = newAmount - oldAmount;

    let balanceChange: number;
    if (updateTransactionDto.type === 'INCOME') {
      balanceChange = amountDiff;
    } else {
      balanceChange = -amountDiff;
    }

    return this.transactionsRepository.update(
      id,
      transaction.accountId,
      updateTransactionDto,
      balanceChange,
    );
  }

  async remove(id: number) {
    const transaction = await this.findOne(id);

    if (!transaction)
      throw new NotFoundException(`Transaction #${id} not found`);

    // Reverse operasi: INCOME dikurangi, EXPENSE ditambah
    const amount = Number(transaction.amount ?? 0);
    const balanceChange = transaction.type === 'INCOME' ? -amount : amount;

    return this.transactionsRepository.remove(
      id,
      transaction.accountId,
      balanceChange,
    );
  }
}
