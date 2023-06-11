import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePaymentServiceMonthlyInput {
  @Field(() => ID)
  id!: string;

  @Field({ nullable: true })
  servicesMonthlysId!: string;

  @Field({ nullable: true })
  studentsId!: string;

  @Field({ nullable: true })
  iban!: string;

  @Field({ nullable: true })
  account_number!: string;

  @Field({ nullable: true })
  reference!: string;

  @Field({ nullable: true })
  value!: number;
}
