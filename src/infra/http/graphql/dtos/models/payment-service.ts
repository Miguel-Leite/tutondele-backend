import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Status } from '@prisma/client';

registerEnumType(Status, {
  name: 'Status',
  description: 'Status payments',
});

@ObjectType()
export class PaymentServiceModel {
  @Field(() => ID)
  id!: string;

  @Field()
  servicesId!: string;

  @Field()
  studentsId!: string;

  @Field()
  code!: string;

  @Field(() => Status)
  status!: Status;

  @Field()
  value!: number;

  @Field({ nullable: true })
  removed!: Date;

  @Field()
  created_at!: Date;

  @Field()
  updated_at!: Date;
}
