# Integration Test Runner

Runs Jest suites from external repos against the current local build of `jest-webextension-mock`.

## Usage

```bash
node integration/run.mjs
```

Or via npm:

```bash
npm run integration:test
```

Run a subset:

```bash
node integration/run.mjs --only passbolt,tabli
```

Override config:

```bash
node integration/run.mjs --config integration/config.mjs
```

Force node manager / version:

```bash
node integration/run.mjs --node-manager volta --node-version 22
```

Cleanup workdir after run:

```bash
node integration/run.mjs --cleanup
```

Dry run (resolve versions/commands only):

```bash
node integration/run.mjs --dry-run
```

Configure timeout and concurrency:

```bash
node integration/run.mjs --timeout-ms 300000 --concurrency 2
```

## Config

Edit `integration/config.mjs`:

- `defaults.nodeManager`: `auto | volta | nvm | system`
- `defaults.nodeVersion`: fallback Node version
- `defaults.packageManager`: `auto | npm | yarn | pnpm`
- `defaults.testCommand`: default test command if repo doesn’t specify one
- `defaults.timeoutMs`: per-repo timeout (ms)
- `defaults.concurrency`: number of repos to run in parallel
- `repos`: list of repo entries with `name`, `repo`, and optional overrides

## How It Works

1. Builds the local package (`npm run build`).
2. Packs it (`npm pack`) and installs the tarball into each repo.
3. Detects Node version from `.nvmrc`, `.node-version`, or `package.json` engines.
4. Uses Volta/NVM/system based on availability.
5. Runs the repo’s test command and prints a summary.
