import { InCharge, InChargesProps } from "@app/entities/inCharge";

type Override = Partial<InChargesProps>;

export function makeInCharge(override: Override = {}) {
  return new InCharge({
    organizationsId: 'example-organization-id',
    personsId: 'example-person-id',
    customersId: 'example-customer-id',
    created_at: new Date(),
    ...override,
  });
}
