import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountsRepository } from './accounts.repository';

@Injectable()
export class AccountsService {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  create(createAccountDto: CreateAccountDto) {
    return this.accountsRepository.create(createAccountDto);
  }

  findAll() {
    return this.accountsRepository.findAll();
  }

  findOne(id: number) {
    return this.accountsRepository.findOne(id);
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return this.accountsRepository.update(id, updateAccountDto);
  }

  remove(id: number) {
    return this.accountsRepository.remove(id);
  }
}
