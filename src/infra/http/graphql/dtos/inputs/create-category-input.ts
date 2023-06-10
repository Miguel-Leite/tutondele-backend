import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field({ nullable: true })
  name!: string;

  @Field({ nullable: true })
  description?: string;
}
