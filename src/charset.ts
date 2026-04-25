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
    // ⚡ Bolt Performance Optimization:
    // Using hardcoded strings inside a switch instead of dynamically computing
    // via string concatenation prevents memory allocation overhead on every request.
    switch (type) {
      case 'alphanumeric': return '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      case 'numeric': return '0123456789';
      case 'alphabetic': return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      case 'hex': return '0123456789abcdef';
      case 'binary': return '01';
      case 'octal': return '01234567';
      default: return type;
    }
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
    // ⚡ Bolt Performance Optimization:
    // Avoid split('') and Set() object allocations for short character sets.
    // Building a string directly with indexOf is significantly faster.
    let uniqueChars = '';
    for (let i = 0; i < this.chars.length; i++) {
      if (uniqueChars.indexOf(this.chars[i]) === -1) {
        uniqueChars += this.chars[i];
      }
    }
    this.chars = uniqueChars;
  }
}
