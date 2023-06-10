import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateLicenseInput {
  @Field()
  packagesId!: string;

  @Field()
  startDate!: Date;

  @Field()
  endDate!: Date;
}
