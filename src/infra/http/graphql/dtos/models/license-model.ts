import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LicenseModel {
  @Field(() => ID)
  id!: string;

  @Field()
  packagesId!: string;

  @Field()
  code!: string;

  @Field()
  startDate!: Date;

  @Field()
  endDate!: Date;

  @Field({ nullable: true })
  created_at!: Date;

  @Field({ nullable: true })
  updated_at!: Date;
}
