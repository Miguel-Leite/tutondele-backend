import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateServiceMonthlyInput {
  @Field(() => ID)
  id!: string;

  @Field({ nullable: true })
  service!: string;

  @Field({ nullable: true })
  price!: number;
}
