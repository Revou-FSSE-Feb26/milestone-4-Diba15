import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AccountsRepository {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.account.findMany();
  }

  async findOne(id: number) {
    return this.prisma.account.findUnique({
      where: { id },
    });
  }

  async create(createAccountDto: CreateAccountDto) {
    return this.prisma.account.create({
      data: createAccountDto,
    });
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    const account = await this.findOne(id);

    if (!account) throw new NotFoundException('Account not found');

    return this.prisma.account.update({
      where: { id },
      data: updateAccountDto,
    });
  }

  async remove(id: number) {
    const account = await this.findOne(id);
    if (!account) throw new NotFoundException('Account not found');

    return this.prisma.account.delete({
      where: { id },
    });
  }
}
