# node-random-string

[![Build Status](https://travis-ci.org/huongda-group/node-random-string.svg?branch=master)](https://travis-ci.org/huongda-group/node-random-string) [![Download Stats](https://img.shields.io/npm/dm/@huongda-group/random-string.svg)](https://github.com/huongda-group/node-random-string)

Library to help you create random strings.

## Installation

To install random-string, use [npm](http://github.com/npm/npm):

```
npm install @huongda-group/random-string
```

## Usage

```javascript
// CommonJS
const randomstring = require("@huongda-group/random-string");

// ES Modules
import randomstring from "@huongda-group/random-string";

randomstring();
// >> "XwPp9xazJ0ku5CZnlmgAx2Dld8SHkAeT"

randomstring(7);
// >> "xqm5wXX"

randomstring({
  length: 12,
  charset: 'alphabetic'
});
// >> "AqoTIzKurxJi"

randomstring({
  charset: 'abc'
});
// >> "accbaabbbbcccbccccaacacbbcbbcbbc"

randomstring({
  charset: ['numeric', '!']
});
// >> "145132!87663611567!2486211!07856"

randomstring({
  charset: 'abc'
}, cb);
// >> "cb(generatedString) {}"

```

TypeScript types are included out of the box — no need to install `@types` separately.

## API

`randomstring(options, cb)`
  - `options`
    - `length` - the length of the random string. (default: 32) [OPTIONAL]
    - `readable` - exclude poorly readable chars: 0OIl. (default: false) [OPTIONAL]
    - `charset` - define the character set for the string. (default: 'alphanumeric') [OPTIONAL]
      - `alphanumeric` - [0-9 a-z A-Z]
      - `alphabetic` - [a-z A-Z]
      - `numeric` - [0-9]
      - `hex` - [0-9 a-f]
      - `binary` - [01]
      - `octal` - [0-7]
      - `custom` - any given characters
      - `[]` -  An array of any above
    - `capitalization` - define whether the output should be lowercase / uppercase only. (default: null) [OPTIONAL]
      - `lowercase`
      - `uppercase`
  - `cb` - Optional.  If provided uses async version of `crypto.randombytes`

## Command Line Usage

    $ npm install -g @huongda-group/random-string

    $ random-string
    > sKCx49VgtHZ59bJOTLcU0Gr06ogUnDJi

    $ random-string 7
    > CpMg433

    $ random-string length=24 charset=github readable
    > hthbtgiguihgbuttuutubugg

## Development

```
npm install
npm run build
npm test
```

## LICENSE

node-random-string is licensed under the MIT license.
