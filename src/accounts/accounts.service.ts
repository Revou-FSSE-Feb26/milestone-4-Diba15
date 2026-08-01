import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: number) {
    const findAcc = await this.accountsRepository.findOne(id);

    if (!findAcc) throw new NotFoundException(`Account #${id} not found`);

    return findAcc;
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    const account = await this.findOne(id);

    if (!account) throw new NotFoundException(`Account #${id} not found`);

    return this.accountsRepository.update(id, updateAccountDto);
  }

  async remove(id: number) {
    const account = await this.findOne(id);

    if (!account) throw new NotFoundException(`Account #${id} not found`);

    return this.accountsRepository.remove(id);
  }
}
