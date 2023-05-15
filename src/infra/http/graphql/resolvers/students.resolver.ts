import { Query, Resolver } from "@nestjs/graphql";

@Resolver()
export class StudentsResolver {

  @Query(() => String)
  async students() {
    return "all students";
  }
}
