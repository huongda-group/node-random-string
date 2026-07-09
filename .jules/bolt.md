## 2024-05-25 - Avoid Set allocations for short string deduplication
**Learning:** In short string deduplication (e.g., charset characters), splitting to an array, creating a `Set`, and joining back has significant allocation overhead. A simple `for` loop with `indexOf` building a new string is nearly 2x faster for typical lengths.
**Action:** Use primitive string operations (`for` loop and `indexOf`) instead of intermediate data structures (`Array`, `Set`) when deduplicating characters in short strings.
