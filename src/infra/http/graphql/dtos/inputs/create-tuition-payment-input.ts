import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Status } from '@prisma/client';

registerEnumType(Status, {
  name: 'Status',
  description: 'Status payments',
});

@InputType()
export class CreateTuitionPaymentInput {
  @Field()
  servicesMonthlysId!: string;

  @Field()
  studentsId!: string;

  @Field()
  month!: number;

  @Field(() => Status, { defaultValue: Status.PENDING })
  status!: Status;

  @Field()
  value!: number;
}
