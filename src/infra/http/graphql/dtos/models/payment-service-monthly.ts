import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaymentServiceMonthlyModel {
  @Field(() => ID)
  id!: string;

  @Field()
  servicesMonthlysId!: string;

  @Field()
  organizationsId!: string;

  @Field()
  iban!: string;

  @Field()
  account_number!: string;

  @Field()
  price!: number;

  @Field({ nullable: true })
  created_at!: Date;

  @Field({ nullable: true })
  updated_at!: Date;
}
