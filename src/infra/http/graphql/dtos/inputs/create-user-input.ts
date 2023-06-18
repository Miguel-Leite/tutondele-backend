import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field({ nullable: true })
  bi?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field()
  email!: string;

  @Field({ nullable: true, defaultValue: 'MASTER' })
  level!: string;
}
