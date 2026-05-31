export type CharsetType =
  | 'alphanumeric'
  | 'numeric'
  | 'alphabetic'
  | 'hex'
  | 'binary'
  | 'octal'
  | (string & {});

// ⚡ Bolt Performance Optimization:
// Standardizing globally scoped mapping constants out of dynamic initialization loops
// to prevent V8 from re-allocating new String objects continuously on tight mappings.
const NUMBERS = '0123456789';
const CHARS_LOWER = 'abcdefghijklmnopqrstuvwxyz';
const CHARS_UPPER = CHARS_LOWER.toUpperCase();
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
    switch (type) {
      case 'alphanumeric':
        return ALPHANUMERIC;
      case 'numeric':
        return NUMBERS;
      case 'alphabetic':
        return ALPHABETIC;
      case 'hex':
        return HEX;
      case 'binary':
        return BINARY_CHARS;
      case 'octal':
        return OCTAL_CHARS;
      default:
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
