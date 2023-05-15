import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCustomerInput {
  @Field(() => ID)
  id!: string;

  @Field({ nullable: true })
  username!: string;

  @Field({ nullable: true })
  firstName!: string;

  @Field({ nullable: true })
  lastName!: string;

  @Field({ nullable: true })
  bi?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true, defaultValue: 'EMPLOYEE' })
  level!: string;
}
