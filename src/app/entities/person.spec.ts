import { Bi } from './bi';
import { Person } from './person';

describe('Person', () => {
  it('should be able to create a person', () => {
    const person = new Person({
      bi: new Bi('009899308LA049'),
      addressesId: 'addresses-example-id',
      avatarsId: 'avatars-example-id',
      email: 'miguelleite200leite@gmail.com',
      firstName: 'Miguel',
      lastName: 'Leite',
      phone: '+244944995020',
    });

    expect(person).toBeTruthy();
  });
});
