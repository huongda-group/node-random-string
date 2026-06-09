## 2024-05-19 - Fast Charset Lookup & Generation

**Learning:** V8 engine shows that simple object property access on small objects or bracket indexing on strings is faster than calling `.charAt()` or doing `if-else` cascades on string properties. The memory reminds us: "When generating strings in tight loops, using bracket notation (e.g., `chars[index]`) is more performant than using the `.charAt()` string method." In `src/charset.ts` we have repetitive literal string definitions and multiple `if-else` branches. We also tested moving strings to module-level constants.

**Action:** Move literal bindings (like `const numbers = '0123456789'`) outside of methods and simplify property resolution into a simple switch or direct returns. Apply bracket indexing over `charAt` in the hotpath `processString`.
