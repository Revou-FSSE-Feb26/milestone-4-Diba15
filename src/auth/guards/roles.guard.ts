// src/auth/guards/roles.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../../generated/prisma/enums';

export type JwtPayload = {
  sub: string;
  email: string;
  role: Role;
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Ambil target role dari dekorator @Roles di Controller
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // 2. Jika route tidak punya dekorator @Roles, berarti route ini bebas diakses (siapa saja)
    if (!requiredRoles) {
      return true;
    }

    // 3. Ambil data user dari request (dihasilkan oleh JwtAuthGuard sebelumnya)
    const user: JwtPayload = context.switchToHttp().getRequest();

    // 4. Jika tidak ada user atau role tidak cocok, lempar error 403 Forbidden
    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException(
        'Akses ditolak: Anda tidak memiliki izin admin',
      );
    }

    return true; // Lolos!
  }
}
