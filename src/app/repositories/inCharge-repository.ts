import { InCharge } from '@app/entities/inCharge';

export abstract class InChargeRepository {
  abstract findById(id: string): Promise<InCharge | null>;
  abstract findAll(organizationsId: string): Promise<InCharge[] | null>;
  abstract create(inCharge: InCharge): Promise<void>;
  abstract save(inCharge: InCharge): Promise<void>;
}
