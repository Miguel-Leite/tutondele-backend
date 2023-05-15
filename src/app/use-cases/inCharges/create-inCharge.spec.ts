import { InMemoryInChargeRepository } from "@test/repositories/in-memory-inCharge-repository";
import { CreateInCharge } from "./create-inCharge";
import { makeInCharge } from "@test/factories/inCharge-factory";

describe('Create inCharge use case', () => {
  it('should be able to create a inCharge', async () => {
    const inChargeRepository = new InMemoryInChargeRepository();
    const createInCharge = new CreateInCharge(inChargeRepository);

    const { inCharge } = await createInCharge.execute(makeInCharge());

    expect(inChargeRepository.incharges).toHaveLength(1);
    expect(inChargeRepository.incharges[0]).toEqual(inCharge);
  });
});
