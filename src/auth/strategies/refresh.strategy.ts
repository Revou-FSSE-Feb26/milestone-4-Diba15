import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AuthUserInterface } from '../../common/interfaces/auth-user.interface';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_SECRET || 'RAHASIA_NEGARA_REFRESH',
      passReqToCallback: true, // Ini diperlukan untuk memeriksa token dan diverifikasi dengan database
    });
  }

  validate(req: Request, payload: AuthUserInterface) {
    const refreshToken = req.get('Authorization')?.replace('Bearer', '').trim();
    return { ...payload, refreshToken };
  }
}
