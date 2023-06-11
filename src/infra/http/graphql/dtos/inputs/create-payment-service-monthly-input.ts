import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePaymentServiceMonthlyInput {
  @Field()
  servicesMonthlysId!: string;

  @Field()
  studentsId!: string;

  @Field()
  iban!: string;

  @Field()
  account_number!: string;

  @Field()
  reference!: string;

  @Field()
  value!: number;
}
