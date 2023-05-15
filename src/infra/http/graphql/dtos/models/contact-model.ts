import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AddressModel {
  @Field(() => ID)
  id!: string;

  @Field()
  primaryPhone!            : string;
  
  @Field({ nullable: true })
  secundaryPhone?         : string;
  
  @Field()
  primaryEmail!            : string;
  
  @Field({ nullable: true })
  secundaryEmail?         : string;

  @Field({ nullable: true })
  created_at!: Date;

  @Field({ nullable: true })
  updated_at!: Date;
}
