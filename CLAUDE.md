# CLAUDE.md - jest-webextension-mock

## What This Project Does

Jest mocks for the WebExtension API (`chrome.*` / `browser.*`). Used by developers to test browser extensions in Jest without a real browser. Does not strictly follow WebExtension specs — follows real-world behavior based on actual edge cases encountered in production extensions.

Published as `jest-webextension-mock` on npm (v4.0.0). ISC license.

## Repository

https://github.com/RickyMarou/jest-webextension-mock

## GitHub Interaction

Use the `gh` CLI for all GitHub operations (PRs, issues, checks, releases). This is a public repo so web URLs can also be used for reading (e.g. browsing PRs, viewing diffs, reading comments).

## Quick Commands

```bash
npm test          # Run Jest tests
npm run build     # Build dist/setup.js with Rollup
npm run lint      # Run ESLint
npm run lint:fix  # Auto-fix lint issues
npm run prettier  # Format code
npm run release   # Changeset version bump
```

## Project Structure

```
src/
  setup.js              # Main entry point — sets global.chrome, global.browser
  index.js              # Assembles and exports the chrome/browser objects
  createEventListeners.js  # Reusable event listener factory (addListener/removeListener/hasListener/hasListeners)
  runtime.js            # runtime API (messaging, connect, getURL, getManifest)
  storage.js            # storage API (sync/local/session/managed with stateful stores)
  tabs.js               # tabs API (CRUD, messaging, events)
  browserAction.js      # browserAction API
  commands.js           # commands API
  downloads.js          # downloads API
  extension.js          # extension API
  geckoProfiler.js      # Firefox-specific geckoProfiler API
  i18n.js               # i18n API
  notifications.js      # notifications API
  omnibox.js            # omnibox API
  permissions.js        # permissions API
  webNavigation.js      # webNavigation API

__tests__/              # One test file per API module
__setups__/chrome.js    # Jest setup file (requires the module)
dist/setup.js           # Built output (NOT in git, built automatically by prepublishOnly)
```

## Build System

- **Rollup** bundles `src/setup.js` → `dist/setup.js` (CommonJS format)
- **Babel** (`@babel/preset-env`) transpiles ES modules to ES5
- `dist/` is gitignored — contributors never deal with the build artifact
- `prepublishOnly` hook runs `npm run build` automatically before `npm publish`
- CI validates the build succeeds but does not commit artifacts

## Entry Points (package.json)

- `"main": "dist/setup.js"` — CJS consumers
- `"module": "src/setup.js"` — ESM consumers

## How Consumers Use This

```json
// jest config
{ "setupFiles": ["jest-webextension-mock"] }
```

This runs `setup.js` which sets `global.chrome`, `global.browser`, `global.exportFunction`, and `global.cloneInto`.

## Testing

- Jest 29, config lives in `package.json` under `"jest"`
- `setupFiles: ["./__setups__/chrome.js"]` loads mocks before tests
- `bail: true` — stops on first failure
- Coverage enabled by default (json, lcov, text, html)
- All 14 test files are in `__tests__/`

## CI (GitHub Actions)

File: `.github/workflows/ci.yml`

Three jobs, triggered on push to `main` and PRs to `main`:

- **lint** — Node 22: `npm run lint` + `npm run build` (validates build succeeds)
- **test** — Matrix (Node 18, 20, 22): `npm test` + Codecov upload on Node 22
- **changeset-check** — PRs only: `npx changeset status --since=origin/main` (enforces changelog entries)

## Versioning

- Uses **Changesets** (`@changesets/cli`)
- Config: `.changeset/config.json` (baseBranch: main, access: public, no auto-commit)
- `npm run release` runs `changeset version`
- PRs must include a changeset entry (enforced by CI)
- Skip with `npx changeset --empty` for non-functional changes

## Code Style

- Prettier: single quotes, trailing commas (es5), semicolons
- ESLint 9 flat config (`eslint.config.mjs`) with prettier plugin
- No TypeScript

## Mock Implementation Patterns

### Pattern 1: Simple jest.fn()

For methods that just need to be callable and assertable:

```js
export const myApi = {
  doThing: jest.fn(),
};
```

### Pattern 2: Callback / Promise dual-mode

Most WebExtension APIs support both callbacks and promises. The standard pattern:

```js
myMethod: jest.fn((arg, cb) => {
  if (cb !== undefined) {
    return cb(result);
  }
  return Promise.resolve(result);
})
```

If a callback is provided, call it synchronously. Otherwise return a resolved Promise.

### Pattern 3: Event listeners (simple)

For events that just need `addListener`/`removeListener`/`hasListener` without state tracking:

```js
onUpdated: {
  addListener: jest.fn(),
  removeListener: jest.fn(),
  hasListener: jest.fn(),
}
```

### Pattern 4: Event listeners (stateful, via createEventListeners)

For events that need real listener tracking (add, remove, check existence):

```js
import { createEventListeners } from './createEventListeners';

onChanged: createEventListeners(),
```

This gives you `addListener`, `removeListener`, `hasListener`, `hasListeners` — all backed by a real array.

### Pattern 5: Stateful storage (storage.js)

`storage.js` uses a `mockStore()` factory that maintains an internal `store` object. Each area (sync, local, session, managed) gets its own independent store. `resolveKey()` handles string, array, and object key lookups matching Chrome's actual behavior.

### Pattern 6: Shared listener arrays (runtime.js ↔ tabs.js)

`runtime.js` exports `onMessageListeners` (module-level array). Both `runtime.sendMessage` and `runtime.onMessage.addListener` share this array. `tabs.sendMessage` also imports and invokes these listeners. This enables testing real message flow.

### Pattern 7: Symbol-based config

`globalThis[Symbol.for('jest-webextension-mock')]` stores config like `extensionPath`. Used by `runtime.getURL()`. Users can override before importing to customize the mock extension URL.

## Adding a New API Mock

1. Create `src/myApi.js` — export a named object with `jest.fn()` methods
2. Import and add it to the `chrome` object in `src/index.js`
3. Create `__tests__/myApi.test.js` — test function existence, calls, callback/promise behavior
4. Run `npm test` to verify
5. Run `npx changeset` to create a changelog entry
6. Commit source changes (no need to build — CI validates, `prepublishOnly` handles it)

## Test Patterns

Tests follow a consistent structure:

```js
describe('chrome.myApi', () => {
  beforeEach(() => {
    // Clear all mocks for the API being tested
    chrome.myApi.method.mockClear();
  });

  it('method should be a function', () => {
    expect(jest.isMockFunction(chrome.myApi.method)).toBe(true);
  });

  it('method should accept a callback', () => {
    const callback = jest.fn();
    chrome.myApi.method('arg', callback);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
```

## Known Quirks

- `browser` is just an alias for `chrome` (same object reference), not a separate implementation
- Some older mock methods (e.g. `tabs.get`, `tabs.query`) use default parameter callbacks `cb = () => {}` instead of the callback/promise dual pattern — these don't return Promises
- `geckoProfiler` is Firefox-specific
- `exportFunction` and `cloneInto` are Firefox content script globals, always set regardless of browser
- `runtime.getManifest()` returns `{ manifest_version: 3 }` by default
## PR Review Guidelines

- Any new mock API should follow the callback/promise dual pattern (Pattern 2)
- New APIs need corresponding test files
- PRs must include a changeset entry (`npx changeset`)
- Don't break existing mock behavior — extensions rely on current signatures
- This project favors real-world behavior over strict spec compliance

## Publishing (maintainers only)

Publishing is done locally — no npm tokens in CI.

```bash
npm run release                              # bumps version + updates CHANGELOG.md
git add -A && git commit -m "release: vX.Y.Z"
git push
npm publish                                  # builds dist/ automatically via prepublishOnly
git tag vX.Y.Z && git push --tags
```
