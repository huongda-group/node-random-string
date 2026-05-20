export type CharsetType =
  | 'alphanumeric'
  | 'numeric'
  | 'alphabetic'
  | 'hex'
  | 'binary'
  | 'octal'
  | (string & {});

const numbers = '0123456789';
const charsLower = 'abcdefghijklmnopqrstuvwxyz';
const charsUpper = charsLower.toUpperCase();

const charsets: Record<string, string> = Object.create(null);
charsets.alphanumeric = numbers + charsLower + charsUpper;
charsets.numeric = numbers;
charsets.alphabetic = charsLower + charsUpper;
charsets.hex = numbers + 'abcdef';
charsets.binary = '01';
charsets.octal = '01234567';

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
    if (charsets[type]) {
      return charsets[type];
    } else {
      return type;
    }
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
    const charMap = this.chars.split('');
    this.chars = [...new Set(charMap)].join('');
  }
}
