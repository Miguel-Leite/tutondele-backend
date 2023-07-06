import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { StudentModel } from '../dtos/models/student-model';
import { CreateStudent } from '@app/use-cases/students/create-student';
import { GetByIdStudent } from '@app/use-cases/students/get-by-id-student';
import { GetAllStudents } from '@app/use-cases/students/get-all-students';
import { GetByIdPerson } from '@app/use-cases/persons/get-by-id-person';
import { GetByIdRoom } from '@app/use-cases/rooms/get-by-id-room';
import { GetByIdCustomer } from '@app/use-cases/customers/get-by-id-customer';

import {
  CurrentCustomer,
  IAuthCustomer,
} from '@infra/http/auth/customer/current-customer';
import { AuthGuard } from '@infra/http/auth/auth.guard';

import { PersonModel } from '../dtos/models/person-model';
import { CreateStudentInput } from '../dtos/inputs/create-student-input';
import { RoomModel } from '../dtos/models/room-model';
import { AddAccountStudent } from '@app/use-cases/students/add-account-student';

@Resolver(() => StudentModel)
export class StudentsResolver {
  constructor(
    private getByIdStudent: GetByIdStudent,
    private getAllStudents: GetAllStudents,
    private createStudent: CreateStudent,
    private getByIdPerson: GetByIdPerson,
    private getByIdRoom: GetByIdRoom,
    private getByIdCustomer: GetByIdCustomer,
    private addAccountStudent: AddAccountStudent,
  ) {}

  @UseGuards(AuthGuard)
  @Query(() => [StudentModel])
  async students(@CurrentCustomer() user: IAuthCustomer) {
    const { students } = await this.getAllStudents.execute(
      user.organizationsId,
    );
    return students;
  }

  @UseGuards(AuthGuard)
  @Query(() => StudentModel)
  async student(@Args('id') id: string) {
    const { student } = await this.getByIdStudent.execute(id);
    return student;
  }

  @ResolveField(() => PersonModel)
  async person(@Parent() student: StudentModel) {
    const { person } = await this.getByIdPerson.execute(student.personsId);
    return person;
  }

  @ResolveField(() => RoomModel)
  async room(@Parent() student: StudentModel) {
    const { room } = await this.getByIdRoom.execute(student.roomsId);
    return room;
  }

  @ResolveField(() => RoomModel)
  async account(@Parent() student: StudentModel) {
    const { customer } = await this.getByIdCustomer.execute(
      student.customersId,
    );
    return customer;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => StudentModel)
  async addStudent(
    @Args('data') data: CreateStudentInput,
    @CurrentCustomer() user: IAuthCustomer,
  ) {
    const { student } = await this.createStudent.execute({
      organizationsId: user.organizationsId,
      ...data,
    });
    return student;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => StudentModel)
  async createAccount(@Args('id') id: string) {
    const { customer } = await this.addAccountStudent.execute(id);
    return customer;
  }
}
