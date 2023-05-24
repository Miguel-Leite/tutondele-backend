import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StudentModel {
  @Field(() => ID)
  id!: string;

  @Field()
  personsId!: string;

  @Field()
  roomsId!: string;
  
  @Field({ nullable: true })
  customersId!: string;

  @Field({ nullable: true })
  created_at!: Date;

  @Field({ nullable: true })
  updated_at!: Date;
}
