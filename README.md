[![npm](https://img.shields.io/npm/v/jest-webextension-mock.svg)](https://www.npmjs.com/package/jest-webextension-mock) [![npm](https://img.shields.io/npm/l/jest-webextension-mock.svg)](https://github.com/RickyMarou/jest-webextension-mock/blob/main/LICENSE) [![CI](https://github.com/RickyMarou/jest-webextension-mock/actions/workflows/ci.yml/badge.svg)](https://github.com/RickyMarou/jest-webextension-mock/actions/workflows/ci.yml) [![Codecov](https://img.shields.io/codecov/c/github/RickyMarou/jest-webextension-mock.svg)](https://codecov.io/gh/RickyMarou/jest-webextension-mock)

## Install

For npm:

```bash
npm i --save-dev jest-webextension-mock
```

For yarn:

```bash
yarn add --dev jest-webextension-mock
```

## Setup

### Require module directly

In your `package.json` under the `jest` section add the `setupFiles` attribute with this module name.

```json
"jest": {
  "setupFiles": [
    "jest-webextension-mock"
  ]
}
```

### Use setup file

Alternatively you can create a new setup file and require this module.

`__setups__/chrome.js`
```js
require('jest-webextension-mock');
```

And add that file to your `setupFiles`:

```json
"jest": {
  "setupFiles": [
    "./__setups__/chrome.js"
  ]
}
```

## Usage

Use this module to check that API calls were made when expected.

```js
describe('your function to test', () => {
  it('should have called a webextension API', () => {
    yourFunctionToTest();
    expect(chrome.tabs.update).toHaveBeenCalled();
  });
});
```

Check the API was called with certain parameters.

```js
describe('your function to test', () => {
  it('should have called a webextension API', () => {
    yourFunctionToTest();
    expect(chrome.tabs.update).toHaveBeenCalledWith({
      url: 'https://example.com/'
    });
  });
});
```

And you can reset the API mocks to ensure APIs are only called when needed.

```js
beforeEach(() => {
  browser.geckoProfiler.start.mockClear();
  browser.geckoProfiler.stop.mockClear();
});

it('should toggle the profiler on from stopped', () => {
  const store = mockStore(reducer(undefined, {}));
  const expectedActions = [
    { type: 'PROFILER_START', status: 'start' },
    { type: 'PROFILER_START', status: 'done' },
  ];
  return store.dispatch(actions.toggle()).then(() => {
    expect(browser.geckoProfiler.start).toHaveBeenCalledTimes(1);
    expect(store.getActions()).toEqual(expectedActions);
  });
});
```

## Development

```bash
npm install
npm test
```

### Linting

```bash
npm run lint
npm run lint:fix    # auto-fix
npm run prettier    # format code
```

### Contributing

PRs require a changeset entry for changelog tracking. After making your changes:

```bash
npx changeset
```

Follow the prompts to describe your change (patch/minor/major). This creates a markdown file in `.changeset/` that should be committed with your PR.

For changes that don't affect the published package (CI config, docs, etc.), add an empty changeset:

```bash
npx changeset --empty
```

### Publishing (maintainers only)

Publishing is done locally to avoid storing npm credentials in CI.

```bash
npm run release                              # bumps version + updates CHANGELOG.md
git add -A && git commit -m "release: vX.Y.Z"
git push
npm publish                                  # builds dist/ automatically via prepublishOnly
git tag vX.Y.Z && git push --tags            # tag the release
```
