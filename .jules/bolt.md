## 2024-05-24 - V8 Set vs IndexOf for Short Strings
**Learning:** For deduplicating very short alphabetic strings (like character sets), using `[...new Set(str.split(''))].join('')` is significantly slower (~40% worse) than a manual `for` loop with `indexOf` due to array and object allocation overheads in V8.
**Action:** Avoid `Set` for deduplicating very small primitive lists in hot loops. Always profile alternatives before assuming modern syntax is faster.
