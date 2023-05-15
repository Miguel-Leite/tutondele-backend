import { User, UserProps } from '@app/entities/user';
import { Username } from '@app/entities/username';

type Override = Partial<UserProps>;

export function makeUser(override: Override = {}) {
  const username = new Username('miguelleite200leite@gmail.com');
  return new User({
    personsId: 'person-example-id',
    username: username.value,
    level: 'ADMIN',
    password: '1234',
    ...override,
  });
}
