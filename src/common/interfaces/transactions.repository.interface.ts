import { CreateTransactionDto } from '../../transactions/dto/create-transaction.dto';
import { UpdateTransactionDto } from '../../transactions/dto/update-transaction.dto';

export interface TransactionsRepositoryInterface {
  findAll(userId: number): Promise<any>;
  findOne(id: number, userId: number): Promise<any>;
  create(createTransactionData: CreateTransactionDto): Promise<any>;
  update(
    id: number,
    accountId: number,
    updateTransactionDto: UpdateTransactionDto,
    balanceChange: number,
  ): Promise<any>;
  remove(id: number, accountId: number, balanceChange: number): Promise<any>;
  verifyAccountOwnership(accountId: number, userId: number): Promise<any>;
}
