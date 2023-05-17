import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCourseInput {
  @Field({ nullable: true })
  name!: string;

  @Field({ nullable: true })
  description?: string;
}
