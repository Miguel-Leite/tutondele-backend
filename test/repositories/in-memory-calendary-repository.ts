import { Calendary } from "@app/entities/calendary";
import { CalendaryRepository } from "@app/repositories/calendary-repository";

export class InMemoryCalendaryRepository implements CalendaryRepository {
  public calendarys: Calendary[] = [];

  async findById(id: string): Promise<Calendary | null> {
    const calendary = this.calendarys.find((item) => item.id === id);

    if (!calendary) {
      return null;
    }

    return calendary;
  }
  async findAll(organizationsId: string): Promise<Calendary[] | null> {
    const calendarys = this.calendarys.filter((item) => item.organizationsId === organizationsId);

    if (!calendarys) {
      return [];
    }

    return calendarys;
  }
  async create(calendary: Calendary): Promise<void> {
    this.calendarys.push(calendary);
  }
  async save(calendary: Calendary): Promise<void> {
    this.calendarys.push(calendary);
  }
}
