## 2024-05-13 - Safe Buffer checks for Isomorphic JS
**Learning:** When making code isomorphic (Node + Browser/React Native), checking `Buffer.isBuffer(buf)` can throw a `ReferenceError` if `Buffer` is undefined globally.
**Action:** Always wrap `Buffer` checks with `typeof Buffer !== 'undefined'` in shared code.
