export class Bi {
  private readonly bi?: string;

  get value(): string | undefined {
    return this.bi;
  }

  private validateBi(bi?: string): boolean {
    if (bi) {
      return bi.match(/^\d{9}[A-Z]{2}\d{3}$/) ? true : false;
    }
    return false;
  }

  constructor(bi?: string | null) {
    if (bi) {
      const isBiValid = this.validateBi(bi);
      if (!isBiValid) {
        throw new Error('Bi invalid.');
      }
      this.bi = bi;
    }
  }
}
