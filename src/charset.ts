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

// PERF: use dictionary lookup to avoid repeated allocations and if/else chain
const CHARSET_DICT: Record<string, string> = Object.create(null);
CHARSET_DICT['alphanumeric'] = NUMBERS + CHARS_LOWER + CHARS_UPPER;
CHARSET_DICT['numeric'] = NUMBERS;
CHARSET_DICT['alphabetic'] = CHARS_LOWER + CHARS_UPPER;
CHARSET_DICT['hex'] = NUMBERS + HEX_CHARS;
CHARSET_DICT['binary'] = '01';
CHARSET_DICT['octal'] = '01234567';

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
    return CHARSET_DICT[type as string] || (type as string);
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
    // PERF: fast string deduplication avoiding array allocations
    let newChars = '';
    const len = this.chars.length;
    for (let i = 0; i < len; i++) {
      const char = this.chars[i];
      if (newChars.indexOf(char) === -1) {
        newChars += char;
      }
    }
    this.chars = newChars;
  }
}
