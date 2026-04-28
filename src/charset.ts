export type CharsetType =
  | 'alphanumeric'
  | 'numeric'
  | 'alphabetic'
  | 'hex'
  | 'binary'
  | 'octal'
  | (string & {});

const PRECOMPUTED: Record<string, string> = Object.create(null);
PRECOMPUTED.alphanumeric = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
PRECOMPUTED.numeric = '0123456789';
PRECOMPUTED.alphabetic = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
PRECOMPUTED.hex = '0123456789abcdef';
PRECOMPUTED.binary = '01';
PRECOMPUTED.octal = '01234567';

export class Charset {
  chars: string;

  constructor() {
    this.chars = '';
  }

  setType(type: CharsetType | CharsetType[]): void {
    if (Array.isArray(type)) {
      for (let i = 0; i < type.length; i++) {
        this.chars += this.getCharacters(type[i]);
      }
    } else {
      this.chars = this.getCharacters(type);
    }
  }

  getCharacters(type: CharsetType): string {
    // Optimization: Use precomputed constant strings
    return PRECOMPUTED[type as string] || type;
  }

  removeUnreadable(): void {
    const unreadableChars = /[0OIl]/g;
    this.chars = this.chars.replace(unreadableChars, '');
  }

  setcapitalization(capitalization: string): void {
    if (capitalization === 'uppercase') {
      this.chars = this.chars.toUpperCase();
    } else if (capitalization === 'lowercase') {
      this.chars = this.chars.toLowerCase();
    }
  }

  removeDuplicates(): void {
    // Optimization: Avoid Array/Set allocation for small strings
    let result = '';
    for (let i = 0; i < this.chars.length; i++) {
      if (result.indexOf(this.chars[i]) === -1) {
        result += this.chars[i];
      }
    }
    this.chars = result;
  }
}
