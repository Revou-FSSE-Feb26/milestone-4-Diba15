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
  async create(createTransactionDto: CreateTransactionDto) {
    const accountBalance = await this.transactionsRepository.getAccountBalance(
      createTransactionDto.accountId,
    );
    if (!accountBalance) throw new NotFoundException('Account not found');

    const balance = Number(accountBalance.balance ?? 0);

    // Menggunakan provider custom untuk pengecekan
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

  async remove(id: number) {
    const transaction = await this.findOne(id);

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
