## 2026-05-02 - Fast String Indexing & Deduplication
**Learning:** V8 engine heavily optimizes bracket notation for string and buffer access over method calls (`charAt`, `readUInt8`). Furthermore, for small string deduplication (e.g., charsets), a simple `indexOf` loop is faster than allocating Sets and Arrays (`[...new Set(str.split(''))]`).
**Action:** Use bracket notation for strings/buffers in hot loops, cache string length, and prefer simple loops over allocating abstractions for short strings.
