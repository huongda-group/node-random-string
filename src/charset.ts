export type CharsetType =
  | 'alphanumeric'
  | 'numeric'
  | 'alphabetic'
  | 'hex'
  | 'binary'
  | 'octal'
  | (string & {});

const NUMBERS = '0123456789';
const CHARS_LOWER = 'abcdefghijklmnopqrstuvwxyz';
const CHARS_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const HEX_CHARS = 'abcdef';
const BINARY_CHARS = '01';
const OCTAL_CHARS = '01234567';

const ALPHANUMERIC = NUMBERS + CHARS_LOWER + CHARS_UPPER;
const ALPHABETIC = CHARS_LOWER + CHARS_UPPER;
const HEX = NUMBERS + HEX_CHARS;

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
    if (type === 'alphanumeric') {
      return ALPHANUMERIC;
    } else if (type === 'numeric') {
      return NUMBERS;
    } else if (type === 'alphabetic') {
      return ALPHABETIC;
    } else if (type === 'hex') {
      return HEX;
    } else if (type === 'binary') {
      return BINARY_CHARS;
    } else if (type === 'octal') {
      return OCTAL_CHARS;
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
