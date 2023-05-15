import { hash } from 'bcryptjs';
import { Customer, CustomerProps } from '@app/entities/customer';
import { Username } from '@app/entities/username';

type Override = Partial<CustomerProps>;

export async function makeCustomer(override: Override = {}) {
  const username = new Username('miguelleite200leite@gmail.com');
  const hashPassword = await hash(`password`, 10);
  
  return new Customer({
    personsId: 'person-example-id',
    username: username.value,
    level: 'ADMIN',
    password: hashPassword,
    organizationsId: "fe4d04a6-9e2b-4ec8-affd-ba11a8cb2a61",
    ...override,
  });
}
