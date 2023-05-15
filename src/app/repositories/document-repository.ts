import { Document } from "@app/entities/document";

export abstract class DocumentRepository {
  abstract findById(id: string): Promise<Document | null>;
  abstract findAll(organizationsId: string): Promise<Document[] | null>;
  abstract create(document: Document): Promise<void>;
  abstract save(document: Document): Promise<void>;
}
