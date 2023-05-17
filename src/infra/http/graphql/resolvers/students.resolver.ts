import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { StudentModel } from "../dtos/models/student-model";
import { CreateStudent } from "@app/use-cases/students/create-student";
import { CreateStudentInput } from "../dtos/inputs/create-student-input";
import { GetAllStudents } from "@app/use-cases/students/get-all-students";
import { CurrentCustomer, IAuthCustomer } from "@infra/http/auth/customer/current-customer";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@infra/http/auth/auth.guard";

@Resolver()
export class StudentsResolver {

  constructor (
    private createStudent: CreateStudent,
    private getAllStudents: GetAllStudents,
  ) {}

  @UseGuards(AuthGuard)
  @Query(() => [StudentModel])
  async students(@CurrentCustomer() user: IAuthCustomer,) {
    const { students } = await this.getAllStudents.execute(user.organizationsId);
    return students;
  }

  @UseGuards(AuthGuard)
  @Mutation(()=>StudentModel)
  async addStudent(@Args('data') data: CreateStudentInput,@CurrentCustomer() user: IAuthCustomer,) {
    const { student } = await this.createStudent.execute({
      organizationsId: user.organizationsId,
      ...data
    });
    return student;
  }
} 
