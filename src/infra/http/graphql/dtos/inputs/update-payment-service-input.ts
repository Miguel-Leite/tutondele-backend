import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePaymentServiceInput {
  @Field(() => ID)
  id!: string;

  @Field({ nullable: true })
  servicesId!: string;

  @Field({ nullable: true })
  studentsId!: string;

  @Field({ nullable: true })
  value!: number;
}
