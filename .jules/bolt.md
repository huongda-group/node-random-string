## 2024-05-18 - String Generation Micro-Optimizations

**Learning:** This codebase is extremely sensitive to memory allocation overhead in its tight generation loops. `processString` and `unsafeRandomBytes` are called thousands of times. Allocating dynamically expanding JS arrays (`[]`) and parsing string splits (`split('')`) are surprisingly slow compared to static pre-allocated constructs. Furthermore, using `Set` for deduplication on tiny charset strings scales worse than simple $O(N^2)$ `indexOf` looping because of the `Set` conversion allocations.

**Action:** Prefer `Uint8Array` over `[]` when handling bytes. Avoid converting strings to arrays/Sets when dealing with small, fixed sizes. Cache `.length` properties when in tight `while`/`for` loops, and use bracket notation (`str[i]`) over `.charAt(i)` for micro-gains. Finally, be cautious of introducing lockfiles (`pnpm-lock.yaml`) into the tree inadvertently when using `pnpm install` in ad-hoc testing.
