---
"jest-webextension-mock": patch
---

Fix storage.get() returning `{ key: value }` instead of `{ [key]: value }` when retrieving a single string key.
