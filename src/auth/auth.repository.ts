import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, role: true },
    });
  }

  getPassword(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: { password: true },
    });
  }

  getRefreshToken(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, role: true, refreshToken: true },
    });
  }

  register(data: RegisterDto) {
    return this.prisma.user.create({ data });
  }

  me(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
        accounts: true,
      },
    });
  }

  updateRefreshToken(userId: number, refreshToken: string | null) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
    });
  }
}
