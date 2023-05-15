import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStudentInput {

  @Field()
  roomsId!: string;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  bi!: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  email?: string;

}
