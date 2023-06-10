import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PackageModel {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  price!: number;

  @Field()
  students!: number;

  @Field()
  admins!: number;

  @Field()
  users!: number;

  @Field()
  services!: number;

  @Field()
  removed?: Date;

  @Field()
  notification_email!: boolean;

  @Field()
  notification_sms!: boolean;

  @Field()
  manual_payment!: boolean;

  @Field()
  realtime_payment!: boolean;

  security!: boolean;

  @Field()
  created_at!: Date;

  @Field()
  updated_at!: Date;
}
