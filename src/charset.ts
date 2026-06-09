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
const CHARS_UPPER = CHARS_LOWER.toUpperCase();
const HEX_CHARS = 'abcdef';
const BINARY_CHARS = '01';
const OCTAL_CHARS = '01234567';

// Pre-compute common combinations
const ALPHANUMERIC_CHARS = NUMBERS + CHARS_LOWER + CHARS_UPPER;
const ALPHABETIC_CHARS = CHARS_LOWER + CHARS_UPPER;
const HEX_FULL_CHARS = NUMBERS + HEX_CHARS;

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
    if (type === 'alphanumeric') return ALPHANUMERIC_CHARS;
    if (type === 'numeric') return NUMBERS;
    if (type === 'alphabetic') return ALPHABETIC_CHARS;
    if (type === 'hex') return HEX_FULL_CHARS;
    if (type === 'binary') return BINARY_CHARS;
    if (type === 'octal') return OCTAL_CHARS;
    return type;
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
