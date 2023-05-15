import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AddressModel {
  @Field(() => ID)
  id!: string;

  @Field()
  location!: string;

  @Field({ nullable: true })
  created_at!: Date;

  @Field({ nullable: true })
  updated_at!: Date;
}
