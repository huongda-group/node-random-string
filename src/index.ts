import { Charset, CharsetType } from './charset';

export interface GenerateOptions {
  length?: number;
  charset?: CharsetType | CharsetType[];
  capitalization?: 'uppercase' | 'lowercase';
  readable?: boolean;
}

type GenerateCallback = (err: Error | null, result?: string) => void;

// Resolve the Web Crypto implementation in both browsers and Node (>=18 exposes
// globalThis.crypto; older Node exposes it via the `crypto` module's webcrypto).
const webcrypto: Crypto | undefined =
  typeof globalThis !== 'undefined' &&
  typeof (globalThis as { crypto?: Crypto }).crypto?.getRandomValues === 'function'
    ? (globalThis as { crypto: Crypto }).crypto
    : undefined;

function unsafeRandomBytes(length: number): Uint8Array {
  // Math.random() fallback for environments without Web Crypto (legacy React Native).
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    bytes[i] = Math.floor(Math.random() * 256);
  }
  return bytes;
}

// getRandomValues rejects requests over 65536 bytes, so fill in chunks.
const MAX_BYTES_PER_CALL = 65536;

function safeRandomBytes(length: number): Uint8Array {
  if (webcrypto) {
    const bytes = new Uint8Array(length);
    for (let offset = 0; offset < length; offset += MAX_BYTES_PER_CALL) {
      const chunk = Math.min(MAX_BYTES_PER_CALL, length - offset);
      webcrypto.getRandomValues(bytes.subarray(offset, offset + chunk));
    }
    return bytes;
  }
  return unsafeRandomBytes(length);
}

function processString(
  buf: Uint8Array,
  initialString: string,
  chars: string,
  reqLen: number,
  maxByte: number,
): string {
  let string = initialString;
  for (let i = 0; i < buf.length && string.length < reqLen; i++) {
    const randomByte = buf[i];
    if (randomByte < maxByte) {
      string += chars.charAt(randomByte % chars.length);
    }
  }
  return string;
}

function generate(options: GenerateOptions | number | null | undefined, cb: GenerateCallback): void;
function generate(options?: GenerateOptions | number | null): string;
function generate(options?: GenerateOptions | number | null, cb?: GenerateCallback): string | void {
  const charset = new Charset();

  let length: number;
  let string = '';

  // Handle options
  if (typeof options === 'object' && options !== null) {
    length = typeof options.length === 'number' ? options.length : 32;

    if (options.charset) {
      charset.setType(options.charset);
    } else {
      charset.setType('alphanumeric');
    }

    if (options.capitalization) {
      charset.setcapitalization(options.capitalization);
    }

    if (options.readable) {
      charset.removeUnreadable();
    }

    charset.removeDuplicates();
  } else if (typeof options === 'number') {
    length = options;
    charset.setType('alphanumeric');
  } else {
    length = 32;
    charset.setType('alphanumeric');
  }

  // Generate the string
  const charsLen = charset.chars.length;
  const maxByte = 256 - (256 % charsLen);

  const build = (): string => {
    let result = '';
    while (result.length < length) {
      const buf = safeRandomBytes(Math.ceil((length * 256) / maxByte));
      result = processString(buf, result, charset.chars, length, maxByte);
    }
    return result;
  };

  if (!cb) {
    return build();
  }

  // Web Crypto's getRandomValues is synchronous; preserve the async callback API.
  try {
    cb(null, build());
  } catch (err) {
    cb(err instanceof Error ? err : new Error(String(err)));
  }
}

export default generate;
