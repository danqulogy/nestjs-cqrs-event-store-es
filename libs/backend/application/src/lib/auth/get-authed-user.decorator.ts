import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUser } from '@fom/backend/domain';

export const GetAuthUser = createParamDecorator((data, ctx: ExecutionContext):IUser => {
  const request = ctx.switchToHttp().getRequest()
  const user:IUser = request.user
  return  user;
});


