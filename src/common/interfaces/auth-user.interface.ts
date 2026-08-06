import { Role } from '../../generated/prisma/enums';

export interface AuthUserInterface {
  sub: number;
  email: string;
  role: Role;
}
