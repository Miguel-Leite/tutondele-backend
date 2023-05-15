import { Customer } from "./customer";
import { Username } from "./username";

describe('Customer', () => {
  it('should be able to create a customer', () => {
    const username = new Username('miguelleite200leite@gmail.com');
    const customer = new Customer({
      organizationsId: "7cb0b681-74df-46d0-bcd7-92424adb92a7",
      personsId: 'd796f286-2625-4e83-9cb3-46bf6bb2faa2',
      username: username.value,
      password: 'password',
      level: 'ADMIN',
      acceptTermsAndConditions: true,
      verified: true,
      updated_at: new Date(),
    });

    expect(customer).toBeTruthy();
  });
});
