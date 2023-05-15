import { Username } from './username';

describe('Username', () => {
  it('should be able to create username', () => {
    const username = new Username('miguelleite200leite@gmail.com');
    expect(username).toBeTruthy();
  });
});
