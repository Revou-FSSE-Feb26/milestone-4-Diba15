import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUserInterface } from '../../common/interfaces/auth-user.interface';

export interface CurrentUserInterface extends Request {
  user?: AuthUserInterface;
}

export const CurrentUser = createParamDecorator(
  (data: keyof AuthUserInterface | undefined, ctx: ExecutionContext) => {
    const request: CurrentUserInterface = ctx.switchToHttp().getRequest();

    const user: AuthUserInterface = request?.user as AuthUserInterface;

    return data ? user?.[data] : user;
  },
);
