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

const CHARSET_MAP: Record<string, string> = Object.create(null);
CHARSET_MAP.alphanumeric = NUMBERS + CHARS_LOWER + CHARS_UPPER;
CHARSET_MAP.numeric = NUMBERS;
CHARSET_MAP.alphabetic = CHARS_LOWER + CHARS_UPPER;
CHARSET_MAP.hex = NUMBERS + HEX_CHARS;
CHARSET_MAP.binary = BINARY_CHARS;
CHARSET_MAP.octal = OCTAL_CHARS;

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
    const mapped = CHARSET_MAP[type];
    return mapped !== undefined ? mapped : type;
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
    for (let i = 0; i < this.chars.length; i++) {
      if (result.indexOf(this.chars[i]) === -1) {
        result += this.chars[i];
      }
    }
    this.chars = result;
  }
}
