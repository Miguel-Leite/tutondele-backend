import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePackageInput {
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

  @Field({ defaultValue: true })
  notification_email!: boolean;

  @Field({ defaultValue: false })
  notification_sms!: boolean;

  @Field({ defaultValue: true })
  manual_payment!: boolean;

  @Field({ defaultValue: false })
  realtime_payment!: boolean;

  @Field({ defaultValue: true })
  security!: boolean;
}
