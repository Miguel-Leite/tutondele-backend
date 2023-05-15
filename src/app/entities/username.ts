export class Username {
  private readonly username: string;

  get value(): string {
    return this.username;
  }

  private getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  private getUsername(email: string): string {
    if (!email) {
      throw new Error('Please set the first name and last name.');
    }

    const [username,] = email.split('@');

    return `${username}${this.getRandomInt(
      999,
      9999,
    )}`;
  }

  constructor(email: string) {
    this.username = this.getUsername(email);
  }
}
