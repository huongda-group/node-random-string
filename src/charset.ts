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
const charsUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const hexChars = 'abcdef';
const binaryChars = '01';
const octalChars = '01234567';

const CHARSETS: Record<string, string> = Object.create(null);
CHARSETS.alphanumeric = numbers + charsLower + charsUpper;
CHARSETS.numeric = numbers;
CHARSETS.alphabetic = charsLower + charsUpper;
CHARSETS.hex = numbers + hexChars;
CHARSETS.binary = binaryChars;
CHARSETS.octal = octalChars;

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
    return CHARSETS[type as string] || type;
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
    let result = '';
    // Use O(N^2) indexOf loop instead of O(N) Set/Array mapping because
    // it avoids heavy memory allocation and is faster for short charset strings.
    for (let i = 0; i < this.chars.length; i++) {
      if (result.indexOf(this.chars[i]) === -1) {
        result += this.chars[i];
      }
    }
    this.chars = result;
  }
}
