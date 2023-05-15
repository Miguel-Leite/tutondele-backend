import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { StudentModel } from "../dtos/models/student-model";
import { CreateStudent } from "@app/use-cases/students/create-student";
import { CreateStudentInput } from "../dtos/inputs/create-student-input";
import { GetAllStudents } from "@app/use-cases/students/get-all-students";
import { CurrentCustomer, IAuthCustomer } from "@infra/http/auth/customer/current-customer";

@Resolver()
export class StudentsResolver {

  constructor (
    private createStudent: CreateStudent,
    private getAllStudents: GetAllStudents,
  ) {}

  @Query(() => [StudentModel])
  async students(@CurrentCustomer() user: IAuthCustomer,) {
    const { students } = await this.getAllStudents.execute("8883b724-ceff-43d8-b88a-283fecccb0a3");
    return students;
  }

  @Mutation(()=>StudentModel)
  async addStudent(@Args('data') data: CreateStudentInput,@CurrentCustomer() user: IAuthCustomer,) {
    const { student } = await this.createStudent.execute({
      organizationsId: "8883b724-ceff-43d8-b88a-283fecccb0a3",
      ...data
    });
    return student;
  }
} 
