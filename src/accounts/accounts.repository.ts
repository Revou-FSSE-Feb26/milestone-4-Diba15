import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AccountsRepository {
  constructor(private prisma: PrismaService) {}

  findAll(userId: number) {
    return this.prisma.account.findMany({
      where: { userId: userId },
    });
  }

  findOne(id: number, userId: number) {
    return this.prisma.account.findFirst({
      where: {
        id: id,
        userId: userId,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            role: true,
          },
        },
        transactions: true,
      },
    });
  }

  create(userId: number, createAccountDto: CreateAccountDto) {
    return this.prisma.account.create({
      data: {
        userId,
        ...createAccountDto,
      },
    });
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return this.prisma.account.update({
      where: { id },
      data: updateAccountDto,
    });
  }

  remove(id: number) {
    return this.prisma.account.delete({
      where: { id },
    });
  }
}
