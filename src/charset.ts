const numbers = '0123456789';
const charsLower = 'abcdefghijklmnopqrstuvwxyz';
const charsUpper = charsLower.toUpperCase();
const hexChars = 'abcdef';
const binaryChars = '01';
const octalChars = '01234567';

export type CharsetType =
  | 'alphanumeric'
  | 'numeric'
  | 'alphabetic'
  | 'hex'
  | 'binary'
  | 'octal'
  | (string & {});

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
    if (type === 'alphanumeric') {
      return numbers + charsLower + charsUpper;
    } else if (type === 'numeric') {
      return numbers;
    } else if (type === 'alphabetic') {
      return charsLower + charsUpper;
    } else if (type === 'hex') {
      return numbers + hexChars;
    } else if (type === 'binary') {
      return binaryChars;
    } else if (type === 'octal') {
      return octalChars;
    } else {
      return type;
    }
  }

  // Reuse inline regex instead of object allocation
  removeUnreadable(): void {
    this.chars = this.chars.replace(/[0OIl]/g, '');
  }

  setcapitalization(capitalization: string): void {
    if (capitalization === 'uppercase') {
      this.chars = this.chars.toUpperCase();
    } else if (capitalization === 'lowercase') {
      this.chars = this.chars.toLowerCase();
    }
  }

  // Optimized to avoid unnecessary array allocations and Sets
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
