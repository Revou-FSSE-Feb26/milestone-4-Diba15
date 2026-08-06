import { CreateUserDto } from '../../users/dto/create-user.dto';
import { UpdateUserDto } from '../../users/dto/update-user.dto';

export interface UsersRepositoryInterface {
  findByEmail(email: string): Promise<any>;
  findAll(): Promise<any>;
  findOne(id: number): Promise<any>;
  create(user: CreateUserDto): Promise<any>;
  update(id: number, user: UpdateUserDto): Promise<any>;
  remove(id: number): Promise<any>;
}
