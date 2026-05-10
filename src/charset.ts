// ⚡ Bolt Optimization: Use a null-prototype dictionary for fast O(1) charset lookup.
// This avoids repeated if/else string concatenation logic per character lookup.
const CHARSET_DICT: Record<string, string> = Object.assign(Object.create(null), {
  alphanumeric: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numeric: '0123456789',
  alphabetic: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  hex: '0123456789abcdef',
  binary: '01',
  octal: '01234567'
});

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
    if (typeof type === 'string' && CHARSET_DICT[type] !== undefined) {
      return CHARSET_DICT[type];
    }
    return type as string;
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
    // ⚡ Bolt Optimization: For short strings, a simple loop with indexOf avoids
    // the heavy allocation overhead of converting the string to an array and then a Set.
    let result = '';
    for (let i = 0; i < this.chars.length; i++) {
      if (result.indexOf(this.chars[i]) === -1) {
        result += this.chars[i];
      }
    }
    this.chars = result;
  }
}
