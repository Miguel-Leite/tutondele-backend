import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ServiceMonthlyModel {
  @Field(() => ID)
  id!: string;

  @Field()
  service!: string;

  @Field()
  price!: number;

  @Field()
  organizationsId!: string;

  @Field({ nullable: true })
  created_at!: Date;

  @Field({ nullable: true })
  updated_at!: Date;
}
