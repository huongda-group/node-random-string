## 2024-05-09 - [Tight string generation loops]
**Learning:** In a highly called string generation function, replacing array push loops with `Uint8Array` allocations and using bracket notation (`chars[index]`) instead of `charAt` yields a measurable 20-25% reduction in execution time for large payloads.
**Action:** Prioritize contiguous memory allocations (Typed Arrays) over dynamic arrays in random byte buffers and favor bracket notation for quick character lookups when building strings in Node.js hot paths.
