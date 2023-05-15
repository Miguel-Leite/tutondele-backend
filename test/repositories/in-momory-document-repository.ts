import { Document } from "@app/entities/document";
import { DocumentRepository } from "@app/repositories/document-repository";

export class InMemoryDocumentRepository implements DocumentRepository {
  public documents: Document[] = [];

  async findById(id: string): Promise<Document | null> {
    const document = this.documents.find((item) => item.id === id);

    if (!document) {
      return null;
    }

    return document;
  }
  async findAll(organizationsId: string): Promise<Document[] | null> {
    const documents = this.documents.filter((item) => item.organizationsId === organizationsId);

    if (!documents) {
      return [];
    }

    return documents;
  }
  async create(document: Document): Promise<void> {
    this.documents.push(document);
  }
  async save(document: Document): Promise<void> {
    this.documents.push(document);
  }
}
