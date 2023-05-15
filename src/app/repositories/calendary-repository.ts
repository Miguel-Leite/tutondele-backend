import { Calendary } from "@app/entities/calendary";

export abstract class CalendaryRepository {
  abstract findById(id: string): Promise<Calendary | null>;
  abstract findAll(organizationsId: string): Promise<Calendary[] | null>;
  abstract create(calendary: Calendary): Promise<void>;
  abstract save(calendary: Calendary): Promise<void>;
}
