import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

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

  async findOne(id: number) {
    const findUser = await this.usersRepository.findOne(id);

    if (!findUser) throw new NotFoundException(`User #${id} not found`);

    return findUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException('User not found');

    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException('User not found');

    return this.usersRepository.remove(id);
  }

  async updateRefreshToken(userId: number, refreshToken: string | null) {
    if (refreshToken) {
      const hash = await bcrypt.hash(refreshToken, 10);
      await this.usersRepository.update(userId, { refreshToken: hash });
    } else {
      // Jika null (Logout), hapus dari database
      await this.usersRepository.update(userId, { refreshToken: null });
    }
  }
}
