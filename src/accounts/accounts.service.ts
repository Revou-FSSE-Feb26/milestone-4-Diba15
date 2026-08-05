import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountsRepository } from './accounts.repository';

@Injectable()
export class AccountsService {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  create(userId: number, createAccountDto: CreateAccountDto) {
    return this.accountsRepository.create(userId, createAccountDto);
  }

  findAll(userId: number) {
    return this.accountsRepository.findAll(userId);
  }

  async findOne(id: number, userId: number) {
    const findAcc = await this.accountsRepository.findOne(id, userId);

    if (!findAcc) throw new NotFoundException(`Account #${id} not found`);

    return findAcc;
  }

  async update(id: number, userId: number, updateAccountDto: UpdateAccountDto) {
    const account = await this.findOne(id, userId);

    if (!account) throw new NotFoundException(`Account #${id} not found`);

    return this.accountsRepository.update(id, updateAccountDto);
  }

  async remove(id: number, userId: number) {
    const account = await this.findOne(id, userId);

    if (!account) throw new NotFoundException(`Account #${id} not found`);

    return this.accountsRepository.remove(id);
  }
}
