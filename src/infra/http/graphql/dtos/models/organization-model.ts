import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Instruction } from '@prisma/client';


registerEnumType(Instruction, {
  name: 'Instruction',
  description: 'Type of teaching at the institution',
}); 

@ObjectType()
export class OrganizationModel {
  @Field(() => ID)
  id!: string;

  @Field()
  packagesId!: string;

  @Field({ nullable: true })
  logosId?                : string;
  
  @Field()
  addressesId!             : string;
  
  @Field()
  contactsId!: string;
  
  @Field({ nullable: true })
  calendarysId?           : string;

  @Field()
  name!                    : string;
  
  @Field()
  slug!                    : string;
  
  @Field({ nullable: true })
  birth!                  : Date;
  
  @Field(() => Instruction)
  instruction!             : Instruction;
  
  @Field({ nullable: true })
  about!                  : string;

  @Field()
  is_active!: boolean;

  @Field({ nullable: true })
  removed?: Date;

  @Field({ nullable: true })
  created_at!: Date;

  @Field({ nullable: true })
  updated_at!: Date;
}
