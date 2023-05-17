import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class RoomModel {
  @Field(() => ID)
  id!              : string;

  @Field()
  coursesId!       : string;

  @Field()
  number!          : number;
  
  @Field()
  group!           : string;
  
  @Field()
  level!           : number
  
  @Field()
  period!          : string;
  
  @Field()
  studentsLimit?   : number; 
}