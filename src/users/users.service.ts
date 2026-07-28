import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  findByEmail(email: string) {
    return this.usersRepository.findByEmail(email);
  }

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.findByEmail(createUserDto.email);

    if (existUser) throw new ConflictException('User already exists');

    const hashedPassword: string = await bcrypt.hash(
      createUserDto.password,
      10,
    );
    const user = await this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const { password, ...result } = user;

    return result;
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  findOne(id: number) {
    return this.usersRepository.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepository.remove(id);
  }
}
