## 2024-05-07 - Node Random String Allocation Overhead
**Learning:** In the `random-string` string generation hot path, object allocations (like Array splits, Set instantiation for deduplication, and dynamically sized Arrays for byte generation) cause significant performance overhead.
**Action:** Pre-allocate `Uint8Array` for buffers, use simple string loops with `indexOf` instead of `Set` for short string deduplication, and use module-level dictionary lookup mappings `Object.create(null)` instead of recalculating constants.
