import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { CreateCourse } from "@app/use-cases/courses/create-course";
import { GetAllCourses } from "@app/use-cases/courses/get-all-courses";
import { GetByIdCourse } from "@app/use-cases/courses/get-by-id-course";
import { RemoveCourse } from "@app/use-cases/courses/remove-course";
import { UpdateCourse } from "@app/use-cases/courses/update-course";
import { CurrentCustomer, IAuthCustomer } from "@infra/http/auth/customer/current-customer";
import { CourseModel } from "../dtos/models/course-model";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@infra/http/auth/auth.guard";
import { CreateCourseInput } from "../dtos/inputs/create-course-input";
import { UpdateCourseInput } from "../dtos/inputs/update-course-input";


@Resolver()
export class CoursesResolver {
  constructor (
    private createCourse: CreateCourse,
    private updateCourse: UpdateCourse,
    private getAllCourses: GetAllCourses,
    private getByIdCourse: GetByIdCourse,
    private removeCourse: RemoveCourse,
  ) {}

  @UseGuards(AuthGuard)
  @Query(()=> [CourseModel])
  async courses(@CurrentCustomer() customer: IAuthCustomer) {
    const { courses } = await this.getAllCourses.execute(customer.organizationsId);
    return courses;
  }

  @UseGuards(AuthGuard)
  @Query(()=> CourseModel)
  async course(@Args("id") id: string) {
    const { course } = await this.getByIdCourse.execute(id);
    return course;
  }

  @UseGuards(AuthGuard)
  @Mutation(()=> CourseModel)
  async addCourse(@Args("data") data: CreateCourseInput, @CurrentCustomer() customer: IAuthCustomer) {
    const { course } = await this.createCourse.execute({
      organizationsId: customer.organizationsId,
      ...data,
    });

    return course;
  }

  @UseGuards(AuthGuard)
  @Mutation(()=> CourseModel)
  async editCourse(@Args("data") data: UpdateCourseInput, @CurrentCustomer() customer: IAuthCustomer) {
    const { course } = await this.updateCourse.execute({
      organizationsId: customer.organizationsId,
      ...data,
    });
    
    return course;
  }

  @UseGuards(AuthGuard)
  @Mutation(()=> CourseModel)
  async deleteCourse(@Args("id") id: string) {
    const { course } = await this.removeCourse.execute(id);
    
    return course;
  }
}
