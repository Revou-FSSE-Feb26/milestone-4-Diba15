// src/auth/jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

export type JwtPayload = {
  sub: string;
  email: string;
  role: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Mengekstrak token dari header: Authorization: Bearer <token>
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // Memastikan token yang sudah expired akan ditolak (melempar 401 Unauthorized)
      ignoreExpiration: false,

      // SECRET KEY INI HARUS SAMA dengan yang ada di auth.module.ts!
      secretOrKey: process.env.JWT_SECRET || 'SECRET_KEY_SEMENTARA',
    });
  }

  // Method ini otomatis dijalankan JIKA token terbukti valid dan belum expired.
  // Hasil return dari method ini akan di-inject oleh Passport ke dalam object `req.user`.
  validate(payload: JwtPayload) {
    // payload berisi data yang kita masukkan saat login (sub dan email)
    return payload;
  }
}
