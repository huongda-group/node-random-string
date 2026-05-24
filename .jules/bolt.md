## 2024-06-25 - V8 Constant Evaluation
**Learning:** Extracting local string constants and concatenation (`charsLower.toUpperCase()`, `numbers + charsLower`) out of frequently called methods like `getCharacters` avoids unnecessary string re-allocation in V8, significantly reducing execution time in hot paths.
**Action:** Move static string definitions and concatenations to module scope constants when used in frequently instantiated classes or called methods.

## 2024-06-25 - Array Pre-allocation
**Learning:** Dynamically pushing elements into a standard JavaScript array (`stack.push()`) inside a loop causes array resizing allocation overhead. Using a pre-allocated array (`new Array(length)`) eliminates this overhead.
**Action:** Use pre-allocated arrays when the final length is known before the loop starts, especially in routines that generate buffers or strings.

## 2024-06-25 - String Character Access
**Learning:** Using bracket notation (`chars[index]`) is slightly more performant than using the `.charAt()` method in tight loops where character access happens frequently. Caching `.length` also gives a small performance boost.
**Action:** Use bracket notation and cache object lengths in highly executed loops.
