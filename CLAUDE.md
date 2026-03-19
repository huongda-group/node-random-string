# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`randomstring` is a Node.js library for generating random strings. It supports both CJS and ESM module formats, with TypeScript source compiled via tsup.

## Commands

- **Build:** `npm run build` (uses tsup to produce CJS + ESM + type declarations in `dist/`)
- **Test:** `npm test` (builds first, then runs mocha)
- **Run a single test file:** `npx mocha test/index.js` (requires build to have run first)

Tests are plain JS (not TypeScript) and import from the built `dist/` output, so you must build before testing.

## Architecture

- **`src/index.ts`** — Main entry point. Exports `generate()` (named) and a default export `{ generate }`. Supports sync (returns string) and async (callback) modes. Uses `randombytes` for cryptographic randomness with a `Math.random()` fallback for environments where crypto is unavailable (React Native).
- **`src/charset.ts`** — `Charset` class that resolves charset type names (`alphanumeric`, `numeric`, `alphabetic`, `hex`, `binary`, `octal`, or custom strings) into character sets. Handles capitalization, readability filtering, and deduplication.
- **`bin/randomstring`** — CLI entry point for `npx randomstring` usage.
- **`tsup.config.ts`** — Builds dual CJS/ESM output with declarations from the single `src/index.ts` entry.

## Dual Module Support

The package ships both CJS (`dist/index.js`) and ESM (`dist/index.mjs`) with conditional exports in `package.json`. Tests verify both import styles work (`test/cjs.js`, `test/esm.mjs`).
