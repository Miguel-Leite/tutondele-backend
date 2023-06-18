import { Address } from '@app/entities/address';
import { AddressRepository } from '@app/repositories/address-repository';

export class InMemoryAddressRepository implements AddressRepository {
  public addresses: Address[] = [];

  async create(address: Address): Promise<void> {
    this.addresses.push(address);
  }
  async save(address: Address): Promise<void> {
    const addressIndex = this.addresses.findIndex(
      (item) => item.id === address.id,
    );

    if (addressIndex >= 0) {
      this.addresses[addressIndex] = address;
    }
  }
}
