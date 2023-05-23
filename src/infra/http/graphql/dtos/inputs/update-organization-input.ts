import { Field, ID, InputType, registerEnumType } from '@nestjs/graphql';
import { Instruction } from '@prisma/client';

registerEnumType(Instruction, {
  name: 'Instruction',
  description: 'Type of teaching at the institution',
});

@InputType()
export class UpdateOrganizationInput {
  @Field(() => ID)
  id!: string;

  @Field({ nullable: true })
  licensesId!: string;

  @Field({ nullable: true })
  name!: string;

  @Field({ nullable: true })
  slug!: string;

  @Field({ nullable: true })
  birth!: Date;

  @Field(() => Instruction)
  instruction!: Instruction;

  @Field({ nullable: true })
  about!: string;

  @Field({ nullable: true })
  primaryPhone!: string;

  @Field({ nullable: true })
  secundaryPhone?: string;

  @Field({ nullable: true })
  primaryEmail!: string;

  @Field({ nullable: true })
  secundaryEmail?: string;

  @Field({ nullable: true })
  location!: string;

  @Field({ nullable: true })
  firstName!: string;

  @Field({ nullable: true })
  lastName!: string;

  @Field({ nullable: true })
  phone!: string;

  @Field({ nullable: true })
  email!: string;
}
