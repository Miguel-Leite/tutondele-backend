import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface IAuthUser {
  sub: string;
  level: string;
  organizationsId: string;
  iat: number;
  exp: number;

}

export const CurrentCustomer = createParamDecorator(
  (data: unknown, context: ExecutionContext): IAuthUser => {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    return req.user;
  },
);