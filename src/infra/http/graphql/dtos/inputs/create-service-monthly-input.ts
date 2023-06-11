import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateServiceMonthlyInput {
  @Field(() => ID)
  id!: string;

  @Field()
  service!: string;

  @Field()
  price!: number;
}
