import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field(() => ID)
  id!: string;

  @Field()
  personsId!: string;

  @Field()
  username!: string;

  @Field()
  level!: string;

  @Field({ defaultValue: false })
  verified!: boolean;

  @Field({ defaultValue: true })
  acceptTermsAndConditions?: boolean;

  @Field({ nullable: true })
  removed?: Date;

  @Field({ nullable: true })
  created_at!: Date;

  @Field({ nullable: true })
  updated_at!: Date;
}
