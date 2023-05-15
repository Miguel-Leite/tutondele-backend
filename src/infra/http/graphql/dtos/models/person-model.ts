import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PersonModel {
  @Field(() => ID)
  id!: string;

  @Field({ nullable: true })
  addressesId?: string;

  @Field({ nullable: true })
  avatarsId?: string;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field({ nullable: true })
  bi?: string;

  @Field({ nullable: true })
  removed?: Date;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  created_at?: Date;
}
