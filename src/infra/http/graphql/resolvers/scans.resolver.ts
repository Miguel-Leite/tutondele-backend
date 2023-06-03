import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { Upload } from "../dtos/inputs/upload";

@Resolver()
export class ScansResolver {
  @Mutation(() => Boolean)
  async uploadFile(@Args({ name: 'file', type: () => GraphQLUpload }) file: Upload) {
    
    console.log(file);

    return true;
  }
}
