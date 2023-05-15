import { Address, AddressesProps } from '@app/entities/address';

type Override = Partial<AddressesProps>;

export function makeAddress(override: Override = {}) {
  return new Address({
    location: "Angola, Luanda",
    created_at: new Date(),
    ...override,
  });
}
