import { Student, StudentsProps } from "@app/entities/student";

type Override = Partial<StudentsProps>;

export function makeStudent(override: Override = {}) {
  return new Student({
    organizationsId: 'example-organization-id',
    personsId: 'example-persons-id',
    roomsId: 'example-rooms-id',
    usersId: 'example-users-id',
    created_at: new Date(),
    ...override,
  });
}
