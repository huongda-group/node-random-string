## 2024-05-20 - String allocation overhead during generation

**Learning:** Hot paths involving random string generation are highly sensitive to small allocation overheads. Small micro-optimizations inside inner loops like using string bracket access, caching loop invariant properties (`.length`), and avoiding inline array pushing `push()` in favor of pre-allocated `Uint8Array` can bring measurable impact. The `if/else` checks string mapping inside highly called methods like `getCharacters` causes allocations and is better replaced by a singleton module-level dictionary (`Object.create(null)`).
**Action:** When working on string-processing hot-paths, always hoist constant mappings to module level, pre-allocate arrays (`Uint8Array` vs standard arrays), and cache object properties.
