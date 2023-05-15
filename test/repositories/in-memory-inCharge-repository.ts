import { InCharge } from "@app/entities/inCharge";
import { InChargeRepository } from "@app/repositories/inCharge-repository";

export class InMemoryInChargeRepository implements InChargeRepository {
  public incharges: InCharge[] = [];

  async findById(id: string): Promise<InCharge | null> {
    const inCharge = this.incharges.find((item) => item.id === id);

    if (!inCharge) {
      return null;
    }

    return inCharge;
  }
  async findAll(organizationsId: string): Promise<InCharge[] | null> {
    const incharges = this.incharges.filter((item) => item.organizationsId === organizationsId);

    if (!incharges) {
      return [];
    }

    return incharges;
  }
  async create(inCharge: InCharge): Promise<void> {
    this.incharges.push(inCharge);
  }
  async save(inCharge: InCharge): Promise<void> {
    this.incharges.push(inCharge);
  }
}
