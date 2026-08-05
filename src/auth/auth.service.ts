import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Role } from '../generated/prisma/enums';
import { AuthRepository } from './auth.repository';

export type TempUser = {
  sub: number;
  email: string;
  role: Role;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Helper method untuk generate access token dan refresh token
   * @param userId
   * @param email
   */
  async getTokens(userId: number, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: process.env.JWT_SECRET || 'SECRET_KEY_SEMENTARA',
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: process.env.JWT_REFRESH_SECRET || 'RAHASIA_NEGARA_REFRESH',
          expiresIn: '7d',
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }

  /**
   * Method untuk login user
   * melakukan pemeriksaan email dan password ada atau tidak
   * periksa password sama atau tidak
   * generate access token dan refresh token
   * hash refresh token dan menyimpan di database
   * @param loginDto {email: string, password: string}
   */
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.authRepository.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const userPassword = await this.authRepository.getPassword(email);

    // Periksa password ada atau tidak
    if (!userPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Periksa password sama atau tidak
    const isMatch = await bcrypt.compare(password, userPassword.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate token
    const tokens = await this.getTokens(user.id, user.email);

    // Hash refresh token dan menyimpan di database untuk proses refresh token
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 10);
    await this.authRepository.updateRefreshToken(user.id, hashedRefreshToken);

    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
      user: {
        ...payload,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const existUser = await this.authRepository.getUserByEmail(
      registerDto.email,
    );

    if (existUser) throw new ConflictException('User already exists');

    const hashedPassword: string = await bcrypt.hash(registerDto.password, 10);

    return await this.authRepository.register({
      ...registerDto,
      password: hashedPassword,
    });
  }

  async me(tempUser: TempUser) {
    const user = await this.authRepository.me(tempUser.sub);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      message: 'Get Profile Success',
      user: user,
    };
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.authRepository.getRefreshToken(userId);

    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Akses ditolak');
    }

    // membandingkan refresh token dengan refresh token yang sudah di hash di database
    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (!refreshTokenMatches) {
      throw new ForbiddenException('Akses ditolak');
    }

    // Generate token baru
    const tokens = await this.getTokens(userId, user.email);

    //  mengulangi proses hashing refresh token untuk disimpan di db
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 10);
    await this.updateRefreshTokenHash(userId, hashedRefreshToken);

    return tokens;
  }

  /**
   * Helper method untuk update refresh token di database
   * @param userId
   * @param refreshToken
   */
  async updateRefreshTokenHash(userId: number, refreshToken: string | null) {
    let hash: string | null = null;
    if (refreshToken) {
      hash = await bcrypt.hash(refreshToken, 10);
    }

    await this.authRepository.updateRefreshToken(userId, hash);
  }

  async logout(userId: number) {
    // Hapus token dari database (set null)
    await this.authRepository.updateRefreshToken(userId, null);
    return { message: 'Berhasil logout' };
  }
}
