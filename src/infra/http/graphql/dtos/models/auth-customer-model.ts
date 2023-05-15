import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AuthCustomerModel {
  @Field((type) => ID)
  id!: string;
  @Field()
  organizationsId!: string;
  @Field()
  token!: string;
}
