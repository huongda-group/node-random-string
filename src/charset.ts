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

const CHARSET_MAP = Object.create(null);
CHARSET_MAP['alphanumeric'] = NUMBERS + CHARS_LOWER + CHARS_UPPER;
CHARSET_MAP['numeric'] = NUMBERS;
CHARSET_MAP['alphabetic'] = CHARS_LOWER + CHARS_UPPER;
CHARSET_MAP['hex'] = NUMBERS + 'abcdef';
CHARSET_MAP['binary'] = '01';
CHARSET_MAP['octal'] = '01234567';

const UNREADABLE_REGEX = /[0OIl]/g;

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
    return CHARSET_MAP[type] || type;
  }

  removeUnreadable(): void {
    this.chars = this.chars.replace(UNREADABLE_REGEX, '');
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
    const charsLen = this.chars.length;
    for (let i = 0; i < charsLen; i++) {
      if (result.indexOf(this.chars[i]) === -1) {
        result += this.chars[i];
      }
    }
    this.chars = result;
  }
}
