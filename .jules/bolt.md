## 2024-06-25 - Direct Buffer vs readUInt8
**Learning:** In hot loops, accessing `Buffer` elements directly with array indexing (`buf[i]`) is significantly faster than using the `readUInt8(i)` method because it avoids method call overhead in V8. However, an `UnsafeBuffer` object only supports `readUInt8(i)`.
**Action:** When working with potentially mocked/unsafe buffers, check for direct indexing availability (`buf[0] !== undefined`) to use a fast-path for native Buffers while keeping a fallback for mocked objects.
