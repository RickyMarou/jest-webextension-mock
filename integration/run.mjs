#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import process from 'node:process';
import { pathToFileURL } from 'node:url';

const ROOT_DIR = process.cwd();

function parseArgs(argv) {
  const args = {
    config: path.join(ROOT_DIR, 'integration', 'config.mjs'),
    only: null,
    nodeManager: null,
    nodeVersion: null,
    workdir: null,
    keepWorkdir: null,
    dryRun: false,
    timeoutMs: null,
    concurrency: null,
  };

  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--config') args.config = argv[++i];
    else if (arg === '--only') args.only = argv[++i];
    else if (arg === '--node-manager') args.nodeManager = argv[++i];
    else if (arg === '--node-version') args.nodeVersion = argv[++i];
    else if (arg === '--workdir') args.workdir = argv[++i];
    else if (arg === '--keep-workdir') args.keepWorkdir = true;
    else if (arg === '--cleanup') args.keepWorkdir = false;
    else if (arg === '--dry-run') args.dryRun = true;
    else if (arg === '--timeout-ms') args.timeoutMs = Number(argv[++i]);
    else if (arg === '--concurrency') args.concurrency = Number(argv[++i]);
  }

  return args;
}

function loadConfig(configPath) {
  const absPath = path.isAbsolute(configPath)
    ? configPath
    : path.join(ROOT_DIR, configPath);
  // Dynamic import for ESM config
  return import(pathToFileURL(absPath)).then((mod) => mod.default);
}

function commandExists(cmd) {
  return new Promise((resolve) => {
    const proc = spawn('sh', ['-c', `command -v ${cmd}`], {
      stdio: 'ignore',
    });
    proc.on('exit', (code) => resolve(code === 0));
  });
}

async function detectNodeManager(preferred) {
  if (preferred && preferred !== 'auto') return preferred;
  if (await commandExists('volta')) return 'volta';
  const nvmPath = findNvmPath();
  if (nvmPath) return 'nvm';
  return 'system';
}

function findNvmPath() {
  const envPath = process.env.NVM_DIR
    ? path.join(process.env.NVM_DIR, 'nvm.sh')
    : null;
  if (envPath && fs.existsSync(envPath)) return envPath;
  const homePath = path.join(os.homedir(), '.nvm', 'nvm.sh');
  if (fs.existsSync(homePath)) return homePath;
  return null;
}

function detectPackageManager(repoDir, preferred) {
  if (preferred && preferred !== 'auto') return preferred;
  if (fs.existsSync(path.join(repoDir, 'pnpm-lock.yaml'))) return 'pnpm';
  if (fs.existsSync(path.join(repoDir, 'yarn.lock'))) return 'yarn';
  return 'npm';
}

function readFirstLine(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf8');
  const line = content.split(/\r?\n/)[0].trim();
  return line || null;
}

function detectNodeVersion(repoDir, repoConfig, defaults) {
  if (repoConfig.nodeVersion) return String(repoConfig.nodeVersion);

  const nvmrc = readFirstLine(path.join(repoDir, '.nvmrc'));
  if (nvmrc) return nvmrc.replace(/^v/, '');

  const nodeVersion = readFirstLine(path.join(repoDir, '.node-version'));
  if (nodeVersion) return nodeVersion.replace(/^v/, '');

  const pkgPath = path.join(repoDir, 'package.json');
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      if (pkg.engines && pkg.engines.node) {
        const match = String(pkg.engines.node).match(/(\d+)(?:\.\d+)?/);
        if (match) return match[1];
      }
    } catch {
      // ignore
    }
  }

  return defaults.nodeVersion || '22';
}

function wrapCommand(cmd, nodeManager, nodeVersion) {
  if (nodeManager === 'volta') {
    return `volta run --node ${nodeVersion} -- ${cmd}`;
  }
  if (nodeManager === 'nvm') {
    const nvmPath = findNvmPath();
    if (!nvmPath) return cmd;
    const escaped = cmd.replace(/"/g, '\\"');
    return `bash -lc "source '${nvmPath}' && nvm install ${nodeVersion} && nvm use ${nodeVersion} && ${escaped}"`;
  }
  return cmd;
}

function runCommand(cmd, opts = {}) {
  return new Promise((resolve) => {
    let killedByTimeout = false;
    const child = spawn(cmd, {
      cwd: opts.cwd || ROOT_DIR,
      shell: true,
      env: opts.env || process.env,
    });

    let output = '';
    let timeout = null;
    if (opts.timeoutMs && Number.isFinite(opts.timeoutMs)) {
      timeout = setTimeout(() => {
        killedByTimeout = true;
        child.kill('SIGTERM');
      }, opts.timeoutMs);
    }
    child.stdout.on('data', (chunk) => {
      output += chunk.toString();
      process.stdout.write(chunk);
    });
    child.stderr.on('data', (chunk) => {
      output += chunk.toString();
      process.stderr.write(chunk);
    });

    child.on('close', (code) => {
      if (timeout) clearTimeout(timeout);
      if (killedByTimeout) {
        resolve({ code: 'timeout', output });
        return;
      }
      resolve({ code, output });
    });
  });
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

async function main() {
  const args = parseArgs(process.argv);
  const config = await loadConfig(args.config);

  const defaults = {
    ...config.defaults,
    nodeManager: args.nodeManager ?? config.defaults.nodeManager,
    nodeVersion: args.nodeVersion ?? config.defaults.nodeVersion,
    workdir: args.workdir ?? config.defaults.workdir,
    keepWorkdir:
      args.keepWorkdir === null
        ? config.defaults.keepWorkdir
        : args.keepWorkdir,
    timeoutMs:
      args.timeoutMs === null ? config.defaults.timeoutMs : args.timeoutMs,
    concurrency:
      args.concurrency === null
        ? config.defaults.concurrency
        : args.concurrency,
  };

  const selected = args.only
    ? config.repos.filter((r) =>
        args.only
          .split(',')
          .map((s) => s.trim())
          .includes(r.name)
      )
    : config.repos;

  if (selected.length === 0) {
    console.error('No repos selected.');
    process.exit(1);
  }

  let tgzPath = '<local-pack-tarball>';
  if (!args.dryRun) {
    // Build and pack local package
    console.log('==> Building local package');
    let res = await runCommand('npm run build', { cwd: ROOT_DIR });
    if (res.code !== 0) process.exit(res.code);

    console.log('==> Packing local package');
    res = await runCommand('npm pack --silent', { cwd: ROOT_DIR });
    if (res.code !== 0) process.exit(res.code);

    const tgzName = res.output.trim().split(/\r?\n/).pop();
    tgzPath = path.resolve(ROOT_DIR, tgzName);
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const workdir = path.join(defaults.workdir, timestamp);
  ensureDir(workdir);

  const results = [];
  const queue = selected.slice();

  const runRepo = async (repo) => {
    console.log(`\n==> ${repo.name}`);
    const repoDir = path.join(workdir, repo.name);

    await runCommand(`git clone --depth 1 ${repo.repo} ${repoDir}`, {
      timeoutMs: defaults.timeoutMs,
    });

    const nodeManager = await detectNodeManager(defaults.nodeManager);
    const nodeVersion = detectNodeVersion(repoDir, repo, defaults);
    const pm = detectPackageManager(repoDir, defaults.packageManager);
    const pmExists = await commandExists(pm);
    if (!pmExists) {
      return {
        name: repo.name,
        nodeManager,
        nodeVersion,
        packageManager: pm,
        status: 'skipped',
        failReason: `missing ${pm}`,
      };
    }

    const installCmd = repo.installCommand || defaults.installCommand;
    const testCmd = repo.testCommand || defaults.testCommand;

    let installStep = installCmd;
    if (!installStep) {
      if (pm === 'npm') installStep = 'npm install';
      if (pm === 'yarn') installStep = 'yarn install';
      if (pm === 'pnpm') installStep = 'pnpm install';
    }

    let injectStep = null;
    if (pm === 'npm') injectStep = `npm install --no-save ${tgzPath}`;
    if (pm === 'yarn') injectStep = `yarn add -D file:${tgzPath}`;
    if (pm === 'pnpm') injectStep = `pnpm add -D ${tgzPath}`;

    const wrappedInstall = wrapCommand(installStep, nodeManager, nodeVersion);
    const wrappedInject = wrapCommand(injectStep, nodeManager, nodeVersion);
    const wrappedTest = wrapCommand(testCmd, nodeManager, nodeVersion);

    if (args.dryRun) {
      console.log(`DRY RUN install: ${wrappedInstall}`);
      console.log(`DRY RUN inject:  ${wrappedInject}`);
      console.log(`DRY RUN test:    ${wrappedTest}`);
      return {
        name: repo.name,
        nodeManager,
        nodeVersion,
        packageManager: pm,
        status: 'dry-run',
        failReason: '',
      };
    }

    let status = 'pass';
    let failReason = '';

    if (installStep) {
      const installRes = await runCommand(wrappedInstall, {
        cwd: repoDir,
        timeoutMs: defaults.timeoutMs,
      });
      if (installRes.code !== 0) {
        status = 'fail';
        failReason =
          installRes.code === 'timeout' ? 'install timeout' : 'install failed';
      }
    }

    if (status === 'pass') {
      const injectRes = await runCommand(wrappedInject, {
        cwd: repoDir,
        timeoutMs: defaults.timeoutMs,
      });
      if (injectRes.code !== 0) {
        status = 'fail';
        failReason =
          injectRes.code === 'timeout' ? 'inject timeout' : 'inject failed';
      }
    }

    if (status === 'pass') {
      const testRes = await runCommand(wrappedTest, {
        cwd: repoDir,
        timeoutMs: defaults.timeoutMs,
      });
      if (testRes.code !== 0) {
        status = 'fail';
        failReason =
          testRes.code === 'timeout' ? 'tests timeout' : 'tests failed';
      }
    }

    return {
      name: repo.name,
      nodeManager,
      nodeVersion,
      packageManager: pm,
      status,
      failReason,
    };
  };

  const concurrency = Math.max(1, Number(defaults.concurrency) || 1);
  const workers = [];
  for (let i = 0; i < concurrency; i += 1) {
    workers.push(
      (async () => {
        while (queue.length) {
          const repo = queue.shift();
          if (!repo) return;
          const result = await runRepo(repo);
          results.push(result);
        }
      })()
    );
  }

  await Promise.all(workers);

  console.log('\nResults:');
  for (const r of results) {
    const suffix = r.status === 'pass' ? '' : ` (${r.failReason})`;
    console.log(
      `${r.name}: ${r.status} | node=${r.nodeVersion} | pm=${r.packageManager} | mgr=${r.nodeManager}${suffix}`
    );
  }

  console.log(`\nWorkdir: ${workdir}`);

  if (!defaults.keepWorkdir) {
    fs.rmSync(workdir, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
