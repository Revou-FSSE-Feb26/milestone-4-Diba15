import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/refresh.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtRefreshStrategy],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'SECRET_KEY_SEMENTARA',
      signOptions: { expiresIn: '1d' },
    }),
    PassportModule,
    UsersModule,
  ],
})
export class AuthModule {}
