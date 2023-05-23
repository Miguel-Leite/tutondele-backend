import { Organization, OrganizationProps } from '@app/entities/organization';

type Override = Partial<OrganizationProps>;

export function makeOrganization(override: Override = {}) {
  return new Organization({
      addressesId: "09f35853-5af1-4f6a-9442-69924a2a7315",
      licensesId: "9f029e23-1e01-402f-a2c9-b4a7bcdb75c9",
      contactsId: "9f029e23-1e01-402f-a2c9-b4a7bcdb75c9",
      name: "ANHERC",
      slug: "IPPA",
      instruction: "TECHNICAL",
      ...override,
  });
}
