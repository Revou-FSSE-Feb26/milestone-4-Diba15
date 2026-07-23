import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }

  findAll(): CreateUserDto[] {
    return this.usersRepository.findAll();
  }

  findOne(id: number): CreateUserDto {
    return this.usersRepository.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto): UpdateUserDto {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepository.remove(id);
  }
}
