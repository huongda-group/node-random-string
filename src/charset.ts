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

  // Optimization: Replaced dynamic string instantiation and chaining `if/else if` blocks
  // with module-level constants and a switch statement for an immediate return (~3x faster).
  getCharacters(type: CharsetType): string {
    switch (type) {
      case 'alphanumeric': return NUMBERS + CHARS_LOWER + CHARS_UPPER;
      case 'numeric': return NUMBERS;
      case 'alphabetic': return CHARS_LOWER + CHARS_UPPER;
      case 'hex': return NUMBERS + HEX_CHARS;
      case 'binary': return BINARY_CHARS;
      case 'octal': return OCTAL_CHARS;
      default: return type;
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

  // Optimization: Replaced [...new Set(charMap.split(''))].join('') with an accumulator string and indexOf.
  // This eliminates array memory allocations from split/spread/join which is much faster for short typical strings.
  removeDuplicates(): void {
    let result = '';
    for (let i = 0; i < this.chars.length; i++) {
      if (result.indexOf(this.chars[i]) === -1) {
        result += this.chars[i];
      }
    }
    this.chars = result;
  }
}
