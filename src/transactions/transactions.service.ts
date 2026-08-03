import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsRepository } from './transactions.repository';
import { BalanceCalculatorService } from './balance-calculator.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    @Inject('BALANCE_CALCULATOR')
    private readonly balanceCalc: BalanceCalculatorService,
  ) {}
  async create(userId: number, createTransactionDto: CreateTransactionDto) {
    const account = await this.transactionsRepository.verifyAccountOwnership(
      createTransactionDto.accountId,
      userId,
    );

    if (!account) {
      throw new NotFoundException('Account not found or invalid permission');
    }

    // Ubah saldo menjadi number
    const balance = Number(account.balance ?? 0);

    // Cek saldo
    if (
      this.balanceCalc.isInsufficient(
        balance,
        createTransactionDto.amount,
        createTransactionDto.type,
      )
    ) {
      throw new BadRequestException('Insufficient funds');
    }

    return this.transactionsRepository.create(createTransactionDto);
  }

  findAll(userId: number) {
    return this.transactionsRepository.findAll(userId);
  }

  async findOne(id: number, userId: number) {
    const findTransaction = await this.transactionsRepository.findOne(
      id,
      userId,
    );

    if (!findTransaction)
      throw new NotFoundException(`Transaction #${id} not found`);

    return findTransaction;
  }

  async update(
    id: number,
    userId: number,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const transaction = await this.findOne(id, userId);
    const oldAmount = Number(transaction.amount ?? 0);
    const newAmount = Number(updateTransactionDto.amount ?? 0);

    // Menggunakan provider custom untuk kalkulasi
    const balanceChange = this.balanceCalc.calculateBalanceChange(
      oldAmount,
      newAmount,
      transaction.type,
    );

    return this.transactionsRepository.update(
      id,
      transaction.accountId,
      updateTransactionDto,
      balanceChange,
    );
  }

  async remove(id: number, userId: number) {
    const transaction = await this.findOne(id, userId);

    if (!transaction)
      throw new NotFoundException(`Transaction #${id} not found`);

    const amount = Number(transaction.amount ?? 0);

    // Menggunakan provider custom untuk kalkulasi reverse
    const balanceChange = this.balanceCalc.calculateReverseBalanceChange(
      amount,
      transaction.type,
    );

    return this.transactionsRepository.remove(
      id,
      transaction.accountId,
      balanceChange,
    );
  }
}
