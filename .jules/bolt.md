## 2024-05-19 - String Deduplication

**Learning:** I attempted to optimize `removeDuplicates` by replacing the `[...new Set(chars.split(''))].join('')` with an `indexOf` loop. While my benchmark showed it was faster for the short strings used in this module (avoiding intermediate allocation of Set/Array/Iterators), this optimization worsens theoretical algorithmic complexity from O(N) to O(N²) and sacrifices readability. This codebase values readability, and speed should not sacrifice correctness or readability for micro-optimizations that aren't the primary bottleneck.

**Action:** Leave standard operations like array/string deduplication using ES6 `Set` alone unless dealing with massive strings where the allocation actually causes profiling bottlenecks. Avoid optimizing O(N) into O(N²) just for minor constant-factor constant-time allocation wins in JavaScript.
