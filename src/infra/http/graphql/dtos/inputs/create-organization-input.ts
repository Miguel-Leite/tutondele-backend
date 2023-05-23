import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Instruction } from '@prisma/client';

registerEnumType(Instruction, {
  name: 'Instruction',
  description: 'Type of teaching at the institution',
}); 

@InputType()
export class CreateOrganizationInput {
  @Field()
  licensesId!: string;

  @Field()
  name!                   : string;
  
  @Field()
  slug!                   : string;
  
  @Field({ nullable: true })
  birth!                  : Date;
  
  @Field(() => Instruction)
  instruction!             : Instruction;
  
  @Field({ nullable: true })
  about!                  : string;

  @Field()
  primaryPhone!           : string;

  @Field({ nullable: true })
  secundaryPhone?         : string;

  @Field({ nullable: true })
  primaryEmail!           : string;

  @Field({ nullable: true })
  secundaryEmail?         : string;

  @Field()
  location!               : string;

  @Field()
  firstName!              : string;

  @Field()
  lastName!               : string;
  
  @Field()
  phone!                  :  string;
  
  @Field()
  email!                  :  string;
}
