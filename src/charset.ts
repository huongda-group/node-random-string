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

const CHARSET_DICT: Record<string, string> = Object.create(null);
CHARSET_DICT['alphanumeric'] = numbers + charsLower + charsUpper;
CHARSET_DICT['numeric'] = numbers;
CHARSET_DICT['alphabetic'] = charsLower + charsUpper;
CHARSET_DICT['hex'] = numbers + 'abcdef';
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
    if (typeof type === 'string' && CHARSET_DICT[type] !== undefined) {
      return CHARSET_DICT[type];
    }
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
