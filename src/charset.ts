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

const CHARSET_MAP: Record<string, string> = Object.create(null);
CHARSET_MAP['alphanumeric'] = numbers + charsLower + charsUpper;
CHARSET_MAP['numeric'] = numbers;
CHARSET_MAP['alphabetic'] = charsLower + charsUpper;
CHARSET_MAP['hex'] = numbers + 'abcdef';
CHARSET_MAP['binary'] = '01';
CHARSET_MAP['octal'] = '01234567';

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
    return CHARSET_MAP[type as string] || (type as string);
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
    let newChars = '';
    const chars = this.chars;
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      if (newChars.indexOf(char) === -1) {
        newChars += char;
      }
    }
    this.chars = newChars;
  }
}
