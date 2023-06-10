import { createHash, randomBytes } from 'crypto';

export function generateLicenseCode(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';

  while (code.length < length) {
    const randomBytesValue = generateRandomBytes(4);
    const hash = createHash('sha1').update(randomBytesValue).digest('hex');
    for (let i = 0; i < hash.length && code.length < length; i++) {
      const charIndex = parseInt(hash[i], 16) % characters.length;
      code += characters[charIndex];
    }
  }

  return code;
}

function generateRandomBytes(length: number): string {
  return randomBytes(length).toString('hex');
}
