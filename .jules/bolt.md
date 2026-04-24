## 2024-04-24 - Node.js Buffer Access Optimization
**Learning:** In Node.js, `Buffer` is a subclass of `Uint8Array`. Inside hot loops, repeatedly calling `buf.readUInt8(i)` and `str.charAt(i)` incurs noticeable method dispatch overhead compared to direct index access `buf[i]` and `str[i]`.
**Action:** When iterating over Node `Buffer`s or `Uint8Array`s in performance-critical code paths (like random string generation), use direct bracket notation `buf[i]` to read bytes. Remember to safely fallback to methods if dealing with custom interfaces that mimic buffers but lack array indexers.
