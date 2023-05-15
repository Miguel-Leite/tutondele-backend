import { Injectable } from "@nestjs/common";
import { InCharge } from "@app/entities/inCharge";
import { InChargeRepository } from "@app/repositories/inCharge-repository";

interface CreateInChargeRequest {
  organizationsId  : string;
  personsId        : string;
  customersId?         : string | null;
}

interface CreateInChargeResponse {
  inCharge: InCharge;
}

@Injectable()
export class CreateInCharge {
  constructor(
    private inChargeRepository: InChargeRepository,
  ) {}

  async execute(request: CreateInChargeRequest): Promise<CreateInChargeResponse> {
    const { organizationsId, personsId, customersId } = request;

    const inCharge = new InCharge({
      organizationsId,
      personsId,
      customersId,
    });

    await this.inChargeRepository.create(inCharge);

    return {
      inCharge
    }
  }
}
