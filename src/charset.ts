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
const hexChars = 'abcdef';
const binaryChars = '01';
const octalChars = '01234567';

// Performance optimization: Pre-compute dictionary mapping initialized via Object.create(null)
// rather than long if/else chains or simple objects for simple enum-like lookups.
// Faster in V8 and prevents edge-case prototype lookup bugs.
const CHAR_MAP: Record<string, string> = Object.create(null);
CHAR_MAP['alphanumeric'] = numbers + charsLower + charsUpper;
CHAR_MAP['numeric'] = numbers;
CHAR_MAP['alphabetic'] = charsLower + charsUpper;
CHAR_MAP['hex'] = numbers + hexChars;
CHAR_MAP['binary'] = binaryChars;
CHAR_MAP['octal'] = octalChars;

export class Charset {
  chars: string;

  constructor() {
    this.chars = '';
  }

  setType(type: CharsetType | CharsetType[]): void {
    if (Array.isArray(type)) {
      const len = type.length; // Performance optimization: Cache array length in tight loop
      for (let i = 0; i < len; i++) {
        this.chars += this.getCharacters(type[i]);
      }
    } else {
      this.chars = this.getCharacters(type);
    }
  }

  getCharacters(type: CharsetType): string {
    // Performance optimization: O(1) hash map lookup instead of multiple if/else branches
    return CHAR_MAP[type as string] !== undefined ? CHAR_MAP[type as string] : (type as string);
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
    // Performance optimization: A simple for loop using indexOf to build a new string
    // avoids the heavy allocation overhead of splitting to an array, converting to a Set, and joining.
    let result = '';
    const len = this.chars.length; // Cache length
    for (let i = 0; i < len; i++) {
      if (result.indexOf(this.chars[i]) === -1) {
        result += this.chars[i];
      }
    }
    this.chars = result;
  }
}
