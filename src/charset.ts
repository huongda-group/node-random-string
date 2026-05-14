export type CharsetType =
  | 'alphanumeric'
  | 'numeric'
  | 'alphabetic'
  | 'hex'
  | 'binary'
  | 'octal'
  | (string & {});

// ⚡ Bolt: Use a null-prototype dictionary for O(1) lookups to avoid long if/else chains in getCharacters
const CHAR_MAPPINGS: Record<string, string> = Object.create(null);
CHAR_MAPPINGS['alphanumeric'] = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
CHAR_MAPPINGS['numeric'] = '0123456789';
CHAR_MAPPINGS['alphabetic'] = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
CHAR_MAPPINGS['hex'] = '0123456789abcdef';
CHAR_MAPPINGS['binary'] = '01';
CHAR_MAPPINGS['octal'] = '01234567';

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
    return CHAR_MAPPINGS[type] ?? type;
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
    // ⚡ Bolt: Avoid splitting to array and converting to Set for deduplication to reduce memory allocation overhead
    let uniqueChars = '';
    const length = this.chars.length;
    for (let i = 0; i < length; i++) {
      if (uniqueChars.indexOf(this.chars[i]) === -1) {
        uniqueChars += this.chars[i];
      }
    }
    this.chars = uniqueChars;
  }
}
