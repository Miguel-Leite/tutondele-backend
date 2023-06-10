import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateLicenseInput {
  @Field(() => ID)
  id!: string;

  @Field({ nullable: true })
  packagesId!: string;

  @Field({ nullable: true })
  startDate!: Date;

  @Field({ nullable: true })
  endDate!: Date;
}
