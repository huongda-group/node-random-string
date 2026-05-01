## 2026-05-01 - Buffer Pooling for randomBytes
**Learning:** Frequent calls to `crypto.randomBytes` for small chunks (e.g., 32 bytes) are a significant bottleneck due to boundary-crossing overhead into native entropy sources.
**Action:** When a library frequently requires small sequences of random data, pre-allocate a large pool (e.g., 8192 bytes) and serve requests using `.subarray()`. This approach yields a ~10-20x performance improvement.
