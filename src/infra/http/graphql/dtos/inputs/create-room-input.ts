import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class CreateRoomInput {
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
  
  @Field({ nullable: true })
  studentsLimit?   : number; 
}