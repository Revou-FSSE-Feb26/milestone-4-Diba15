import { CreateAccountDto } from '../../accounts/dto/create-account.dto';
import { UpdateAccountDto } from '../../accounts/dto/update-account.dto';

export interface AccountsRepositoryInterface {
  findAll(userId: number): Promise<any>;
  findOne(id: number, userId: number): Promise<any>;
  create(userId: number, createAccountDto: CreateAccountDto): Promise<any>;
  update(id: number, updateAccountDto: UpdateAccountDto): Promise<any>;
  remove(id: number): Promise<any>;
}
