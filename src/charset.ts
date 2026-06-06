export type CharsetType =
  | 'alphanumeric'
  | 'numeric'
  | 'alphabetic'
  | 'hex'
  | 'binary'
  | 'octal'
  | (string & {});

const CONSTANTS = {
  numbers: '0123456789',
  charsLower: 'abcdefghijklmnopqrstuvwxyz',
  charsUpper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  hexChars: 'abcdef',
  binaryChars: '01',
  octalChars: '01234567',
};

// Cache the predefined charsets to prevent repeated dynamic string concatenation allocations on every generate call
const PREDEFINED_CHARSETS: Record<string, string> = Object.assign(Object.create(null), {
  alphanumeric: CONSTANTS.numbers + CONSTANTS.charsLower + CONSTANTS.charsUpper,
  numeric: CONSTANTS.numbers,
  alphabetic: CONSTANTS.charsLower + CONSTANTS.charsUpper,
  hex: CONSTANTS.numbers + CONSTANTS.hexChars,
  binary: CONSTANTS.binaryChars,
  octal: CONSTANTS.octalChars,
});

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
    if (typeof type === 'string' && PREDEFINED_CHARSETS[type]) {
      return PREDEFINED_CHARSETS[type];
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
    const charMap = this.chars.split('');
    this.chars = [...new Set(charMap)].join('');
  }
}
