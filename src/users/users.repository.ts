import { Injectable, NotFoundException } from '@nestjs/common';
import { mockData } from '../data';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository {
  findAll(): CreateUserDto[] {
    return mockData.users;
  }

  findOne(id: number): CreateUserDto {
    return mockData.users.find((user) => user.id === id) as CreateUserDto;
  }

  create(createUserDto: CreateUserDto): CreateUserDto {
    const newUser = { ...createUserDto, id: mockData.users.length + 1 };
    mockData.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto): UpdateUserDto {
    const currentData = this.findOne(id);

    if (!currentData) throw new NotFoundException('User not found');

    const updatedData = { ...currentData, ...updateUserDto };
    mockData.users = mockData.users.map((user) =>
      user.id === id ? updatedData : user,
    );
    return updatedData;
  }

  remove(id: number) {
    const currentData = this.findOne(id);
    if (!currentData) throw new NotFoundException('User not found');

    mockData.users = mockData.users.filter((user) => user.id !== id);
    return {
      message: 'User deleted successfully',
      currentData,
    };
  }
}
