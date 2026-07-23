import { Injectable, NotFoundException } from '@nestjs/common';
import { mockData } from '../data';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsRepository {
  findAll(): CreateAccountDto[] {
    return mockData.accounts;
  }

  findOne(id: number): CreateAccountDto {
    return mockData.accounts.find(
      (account) => account.id === id,
    ) as CreateAccountDto;
  }

  create(data: CreateAccountDto): CreateAccountDto {
    const newData: CreateAccountDto = {
      ...data,
      id: mockData.accounts.length + 1,
      createdAt: new Date(),
    };

    mockData.accounts.push(newData);
    return newData;
  }

  update(id: number, updateData: UpdateAccountDto): UpdateAccountDto {
    const currentData = this.findOne(id);

    if (!currentData) throw new NotFoundException('Account not found');

    const updatedData = { ...currentData, ...updateData };
    mockData.accounts = mockData.accounts.map((account) =>
      account.id === id ? updatedData : account,
    );
    return updatedData;
  }

  remove(id: number) {
    const account = this.findOne(id);
    if (!account) throw new NotFoundException('Account not found');
    mockData.accounts = mockData.accounts.filter((a) => a.id !== id);

    return {
      message: 'Account deleted successfully',
      account,
    };
  }
}
