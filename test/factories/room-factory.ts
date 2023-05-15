import { Room, RoomsProps } from "@app/entities/room";

type Override = Partial<RoomsProps>;

export function makeRoom(override: Override = {}) {
  return new Room({
    organizationsId: 'example-organization-id',
    coursesId: 'example-course-id',
    group: 'example-group',
    level: 10,
    number: 12,
    period: 'example-period',
    studentsLimit: 25,
    created_at: new Date(),
    ...override,
  });
}
