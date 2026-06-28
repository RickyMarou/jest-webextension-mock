# Contributing

Thanks for your interest in contributing to `jest-webextension-mock`.

## Getting started

```bash
npm install
npm test          # run the Jest suite
npm run lint      # run ESLint
npm run prettier  # format code
```

## Pull requests

1. Fork the repo and create a branch from `main`.
2. Make your change. Add or update tests in `__tests__/` — every API module has a
   matching test file.
3. Run `npm test` and `npm run lint` and make sure both pass.
4. Add a changeset describing your change:
   ```bash
   npx changeset
   ```
   This is required — CI enforces a changeset entry on every PR. For changes that
   don't affect the published package (docs, CI, tests), create an empty one:
   ```bash
   npx changeset --empty
   ```
5. Open the pull request.

## Adding a new API mock

1. Create `src/myApi.js` exporting a named object of `jest.fn()` methods.
2. Import it and add it to the `chrome` object in `src/index.js`.
3. Create `__tests__/myApi.test.js`.
4. Most WebExtension methods support both callbacks and promises — follow the
   existing dual pattern (call the callback if provided, otherwise return a
   resolved Promise). See existing modules such as `src/downloads.js` for
   reference.

## Code of conduct

By participating, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md).
