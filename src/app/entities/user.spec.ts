import { User } from './user';
import { Username } from './username';

describe('User', () => {
  it('should be able to create a user', () => {
    const username = new Username('miguelleite200leite@gmail.com');
    const user = new User({
      personsId: 'person-example-id',
      username: username.value,
      password: 'password',
      level: 'ADMIN',
      acceptTermsAndConditions: true,
      verified: true,
      updated_at: new Date(),
    });

    expect(user).toBeTruthy();
  });
});
