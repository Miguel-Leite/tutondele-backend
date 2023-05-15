import { UserTokens } from './user-tokens';
describe('User Tokens', () => {
  it('should be able to create a user tokens', () => {
    const userTokens = new UserTokens({
      expires_date: new Date(),
      refresh_token: 'refresh_toke',
      usersId: 'user-example-id',
    });

    expect(userTokens).toBeTruthy();
  });
});
