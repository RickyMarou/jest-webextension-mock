# jest-webextension-mock

## 4.1.0

### Minor Changes

- a9debb1: Add `browser.action` (MV3 alias for `browserAction`) and `browser.pageAction` APIs. Expand `browserAction` with missing methods (`getBadgeTextColor`, `getUserSettings`, `isEnabled`, `openPopup`, `setBadgeTextColor`) and upgrade events to use `createEventListeners()`.
- 68ab1a8: Add `browser.alarms` API mock with `create`, `get`, `getAll`, `clear`, `clearAll`, and `onAlarm` event.

### Patch Changes

- 135c31f: Add integration runner to validate the package against external repos before publishing.
- 7dd6007: Overhaul CI/CD pipeline: fix broken ESLint (migrate to flat config), remove dist/ from git, enforce changeset entries on PRs, slim down published package.
- 7ee3b3c: Fix storage.get() returning `{ key: value }` instead of `{ [key]: value }` when retrieving a single string key.

## 4.0.0

### Major Changes

- b8594f9: Drop support for node 14 and 16, add support for node 18 and 22

## 3.9.1

### Patch Changes

- Fix storage returning undefined for unknown keys

## 3.9.0

### Minor Changes

- Add support for storage.session

## 3.8.16

### Patch Changes

- Fix storage.get method throwing when not provided with a key

## 3.8.15

### Patch Changes

- Forgot to build the package before publishing 🤦

## 3.8.14

### Patch Changes

- Fix different storage types using the same store

## 3.8.13

### Patch Changes

- 2800518: Add storage onChange event listeners
