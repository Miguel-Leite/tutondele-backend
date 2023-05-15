import { Address } from "@app/entities/address";

export abstract class AddressRepository {
  abstract create(address: Address): Promise<void>;
  abstract save(address: Address): Promise<void>;
}
