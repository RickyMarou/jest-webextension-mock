---
"jest-webextension-mock": minor
---

Add `browser.action` (MV3 alias for `browserAction`) and `browser.pageAction` APIs. Expand `browserAction` with missing methods (`getBadgeTextColor`, `getUserSettings`, `isEnabled`, `openPopup`, `setBadgeTextColor`) and upgrade events to use `createEventListeners()`.
