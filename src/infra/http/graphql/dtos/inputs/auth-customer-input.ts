import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AuthCustomerInput {
  @Field()
  email!: string;

  @Field()
  password!: string;
}
