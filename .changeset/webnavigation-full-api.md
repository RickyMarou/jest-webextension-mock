---
'jest-webextension-mock': minor
---

Flesh out the `webNavigation` mock: add the remaining events (`onBeforeNavigate`, `onCommitted`, `onDOMContentLoaded`, `onErrorOccurred`, `onCreatedNavigationTarget`, `onReferenceFragmentUpdated`, `onTabReplaced`) with full stateful listener tracking, and add `getFrame`/`getAllFrames` with the callback/promise dual pattern (#5).
