import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { CreateRoom } from '@app/use-cases/rooms/create-room';
import { GetAllRooms } from '@app/use-cases/rooms/get-all-rooms';
import { GetByIdRoom } from '@app/use-cases/rooms/get-by-id-room';
import { UpdateRoom } from '@app/use-cases/rooms/update-room';
import { RemoveRoom } from '@app/use-cases/rooms/remove-room';

import { AuthGuard } from '@infra/http/auth/auth.guard';
import {
  CurrentCustomer,
  IAuthCustomer,
} from '@infra/http/auth/customer/current-customer';

import { RoomModel } from '../dtos/models/room-model';
import { CreateRoomInput } from '../dtos/inputs/create-room-input';
import { UpdateRoomInput } from '../dtos/inputs/update-room-input';
import { GetByIdCourse } from '@app/use-cases/courses/get-by-id-course';
import { CourseModel } from '../dtos/models/course-model';

@Resolver(() => RoomModel)
export class RoomsResolver {
  constructor(
    private getAllRooms: GetAllRooms,
    private getByIdRoom: GetByIdRoom,
    private createRoom: CreateRoom,
    private updateRoom: UpdateRoom,
    private removeRoom: RemoveRoom,
    private getByIdCourse: GetByIdCourse,
  ) {}

  @UseGuards(AuthGuard)
  @Query(() => [RoomModel])
  async rooms(@CurrentCustomer() customer: IAuthCustomer) {
    const { rooms } = await this.getAllRooms.execute(customer.organizationsId);
    return rooms;
  }

  @UseGuards(AuthGuard)
  @Query(() => RoomModel)
  async room(@Args('id') id: string) {
    const { room } = await this.getByIdRoom.execute(id);
    return room;
  }

  @ResolveField(() => CourseModel)
  async course(@Parent() room: RoomModel) {
    const { course } = await this.getByIdCourse.execute(room.coursesId);
    return course;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => RoomModel)
  async addRoom(
    @Args('data') data: CreateRoomInput,
    @CurrentCustomer() customer: IAuthCustomer,
  ) {
    const { room } = await this.createRoom.execute({
      organizationsId: customer.organizationsId,
      ...data,
    });

    return room;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => RoomModel)
  async editRoom(
    @Args('data') data: UpdateRoomInput,
    @CurrentCustomer() customer: IAuthCustomer,
  ) {
    const { room } = await this.updateRoom.execute({
      organizationsId: customer.organizationsId,
      ...data,
    });

    return room;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => RoomModel)
  async deleteRoom(@Args('id') id: string) {
    const { room } = await this.removeRoom.execute(id);

    return room;
  }
}
