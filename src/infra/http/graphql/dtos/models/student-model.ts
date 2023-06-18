import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PersonModel } from './person-model';
import { RoomModel } from './room-model';
import { CustomerModel } from './customer-model';

@ObjectType('StudentModel')
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

  @Field(() => PersonModel)
  person!: PersonModel;

  @Field(() => RoomModel)
  room!: RoomModel;

  @Field(() => CustomerModel)
  account!: CustomerModel;
}
