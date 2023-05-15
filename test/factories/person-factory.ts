import { Person, PersonProps } from '@app/entities/person';

type Override = Partial<PersonProps>;

export function makePerson(override: Override = {}) {
  return new Person({
    firstName: 'Miguel',
    lastName: 'Leite',
    email: 'miguel.leite@gmail.com',
    phone: '555-555',
    created_at: new Date(),
    ...override,
  });
}
