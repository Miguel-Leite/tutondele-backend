import { Instruction } from "@prisma/client";
import { Organization } from "./organization";

describe('Organization', () => {
  it('should be able to create a organization', () => {
    const organization = new Organization({
      addressesId: "09f35853-5af1-4f6a-9442-69924a2a7315",
      packagesId: "9f029e23-1e01-402f-a2c9-b4a7bcdb75c9",
      contactsId: "9f029e23-1e01-402f-a2c9-b4a7bcdb75c9",
      name: "ANHERC",
      slug: "IPPA",
      instruction: Instruction.PRIMARY,
    });

    expect(organization).toBeTruthy();
  });
});
