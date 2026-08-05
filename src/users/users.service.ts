import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { Role } from '../generated/prisma/enums';

export type TempUser = {
  sub: number;
  email: string;
  role: Role;
};

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  private checkOwnership(currentUser: TempUser, targetId: number) {
    if (currentUser.role !== Role.ADMIN && currentUser.sub !== targetId) {
      throw new ForbiddenException(
        'Akses ditolak: Anda hanya dapat mengakses data Anda sendiri',
      );
    }
  }

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.findByEmail(createUserDto.email);

    if (existUser) throw new ConflictException('User already exists');

    const hashedPassword: string = await bcrypt.hash(
      createUserDto.password,
      10,
    );

    return await this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  findByEmail(email: string) {
    return this.usersRepository.findByEmail(email);
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  async findOne(id: number, currentUser: TempUser) {
    this.checkOwnership(currentUser, id);

    const findUser = await this.usersRepository.findOne(id);

    if (!findUser) throw new NotFoundException(`User #${id} not found`);

    return findUser;
  }

  async update(
    id: number,
    currentUser: TempUser,
    updateUserDto: UpdateUserDto,
  ) {
    const user = await this.findOne(id, currentUser);

    if (!user) throw new NotFoundException('User not found');

    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number, currentUser: TempUser) {
    const user = await this.findOne(id, currentUser);

    if (!user) throw new NotFoundException('User not found');

    return this.usersRepository.remove(id);
  }
}
