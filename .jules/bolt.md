## 2024-05-19 - Set and Array Overhead for Small Strings
**Learning:** In highly called utility methods (like `removeDuplicates` in string generators), using `.split('')` and `new Set()` to ensure unique characters incurs significant allocation overhead compared to a basic `for` loop with `indexOf`. For small strings (e.g., 62-character alphabets), an allocation-free loop is consistently 2x-3x faster.
**Action:** Default to `indexOf` string loops instead of `Array/Set` patterns for deduplicating short utility strings on the hot path.
