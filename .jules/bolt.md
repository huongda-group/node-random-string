
## 2023-10-27 - Direct Buffer/Uint8Array indexing and pre-allocation is faster
**Learning:** In hot paths generating random strings, allocating a new array by dynamically pushing to it or using `buf.readUInt8()` incurs significant overhead compared to direct index access (`buf[i]`) and `new Uint8Array(length)` pre-allocation. Also, explicitly caching the string length when using modulo (`%`) in a tight loop avoids repeated property access.
**Action:** Use direct indexing `buf[i]` for `Uint8Array` or standard arrays when dealing with byte arrays in Node.js instead of method calls. Always pre-allocate fixed-length arrays (e.g., `new Array(length)` or `new Uint8Array(length)`) instead of dynamically pushing items, and cache array/string lengths when used in hot loops.
