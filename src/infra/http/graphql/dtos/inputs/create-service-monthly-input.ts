import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateServiceMonthlyInput {
  @Field()
  service!: string;

  @Field()
  price!: number;
}
