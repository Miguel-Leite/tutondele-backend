import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface IAuthCustomer {
  sub: string;
  level: string;
  organizationsId: string;
  iat: number;
  exp: number;

}

export const CurrentCustomer = createParamDecorator(
  (data: unknown, context: ExecutionContext): IAuthCustomer => {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    return req.user;
  },
);