import { Document } from "./document";

describe('Document', () => {
  it('should be able to create a document', () => {
    const document = new Document({
      organizationsId: 'example-organization-id',
      filename: 'example',
      encoding: 'utf8',
      mimetype: 'application/octet-stream',
      url: 'https://example.com',
    });
    expect(document).toBeTruthy();
  });
});
