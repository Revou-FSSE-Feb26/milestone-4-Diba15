import { RegisterDto } from '../../auth/dto/register.dto';

export interface AuthRepositoryInterface {
  getUserByEmail(email: string): Promise<any>;
  getPassword(email: string): Promise<any>;
  getRefreshToken(userId: number): Promise<any>;
  register(data: RegisterDto): Promise<any>;
  me(userId: number): Promise<any>;
  updateRefreshToken(userId: number, refreshToken: string | null): Promise<any>;
}
