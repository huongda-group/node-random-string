export type CharsetType =
  | 'alphanumeric'
  | 'numeric'
  | 'alphabetic'
  | 'hex'
  | 'binary'
  | 'octal'
  | (string & {});

// ⚡ Bolt Optimization: Precompute strings at module level to avoid allocating them repeatedly
const numbers = '0123456789';
const charsLower = 'abcdefghijklmnopqrstuvwxyz';
const charsUpper = charsLower.toUpperCase();
const hexChars = 'abcdef';
const binaryChars = '01';
const octalChars = '01234567';

// ⚡ Bolt Optimization: Use dictionary mapping for O(1) string lookup and to avoid if/else chains
const CHAR_MAPPINGS: Record<string, string> = Object.create(null);
CHAR_MAPPINGS['alphanumeric'] = numbers + charsLower + charsUpper;
CHAR_MAPPINGS['numeric'] = numbers;
CHAR_MAPPINGS['alphabetic'] = charsLower + charsUpper;
CHAR_MAPPINGS['hex'] = numbers + hexChars;
CHAR_MAPPINGS['binary'] = binaryChars;
CHAR_MAPPINGS['octal'] = octalChars;

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
    return CHAR_MAPPINGS[type as string] || type;
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
    // ⚡ Bolt Optimization: Avoid high overhead of split(), Set(), and join() by building new string
    let newChars = '';
    const charsLen = this.chars.length;
    for (let i = 0; i < charsLen; i++) {
      if (newChars.indexOf(this.chars[i]) === -1) {
        newChars += this.chars[i];
      }
    }
    this.chars = newChars;
  }
}
