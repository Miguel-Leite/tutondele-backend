import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Status } from '@prisma/client';

registerEnumType(Status, {
  name: 'Status',
  description: 'Status payments',
});

@ObjectType()
export class PaymentServiceMonthlyModel {
  @Field(() => ID)
  id!: string;

  @Field()
  servicesMonthlysId!: string;

  @Field()
  code!: string;

  @Field()
  studentsId!: string;

  @Field()
  iban!: string;

  @Field()
  account_number!: string;

  @Field()
  reference!: string;

  @Field(() => Status)
  status!: Status;

  @Field()
  value!: number;

  @Field({ nullable: true })
  created_at!: Date;

  @Field({ nullable: true })
  updated_at!: Date;
}
