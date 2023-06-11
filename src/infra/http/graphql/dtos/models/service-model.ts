import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ServiceModel {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field()
  price!: number;

  @Field()
  organizationsId!: string;

  @Field({ nullable: true })
  created_at!: Date;

  @Field({ nullable: true })
  updated_at!: Date;
}
