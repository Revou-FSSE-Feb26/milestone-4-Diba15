import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../../generated/prisma/enums';
import { AuthUserInterface } from '../../common/interfaces/auth-user.interface';

export interface CurrentUserInterface extends Request {
  user?: AuthUserInterface;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Ambil Roles dari dekorator @Roles
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Jika Roles tidak tersedia berarti backend bisa diakses semua
    if (!requiredRoles) {
      return true;
    }

    // Ambil data user yang dihasilkan oleh JWT Auth Guard
    const req: CurrentUserInterface = context.switchToHttp().getRequest();
    const user = req.user;

    // Jika user dan role tidak cocok maka lemparkan error Forbidden access
    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException(
        'Akses ditolak: Anda tidak memiliki izin admin',
      );
    }

    return true;
  }
}
