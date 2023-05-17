import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class IdentityModel {
  @Field()
  number!: string;
  
  @Field()
  name!: string;
  
  @Field()
  nif!: string;
  
  @Field()
  date_of_birth!: string;
  
  @Field()
  gender!: string;
  
  @Field()
  nationality!: string;
  
  @Field()
  father_full_name!: string;
  
  @Field()
  mother_full_name!: string;
  
  @Field()
  marital_status!: string;
  
  @Field()
  issuance_date!: string;
  
  @Field()
  issuance_location!: string;
}