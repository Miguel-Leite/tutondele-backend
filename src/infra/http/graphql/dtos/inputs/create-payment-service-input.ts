import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePaymentServiceInput {
  @Field()
  servicesId!: string;

  @Field()
  studentsId!: string;

  @Field()
  value!: number;
}
