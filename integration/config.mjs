export default {
  defaults: {
    nodeManager: 'auto', // auto | volta | nvm | system
    nodeVersion: '22',
    packageManager: 'auto', // auto | npm | yarn | pnpm
    installCommand: null, // override install step if needed
    testCommand: 'npm test',
    workdir: '/tmp/jwem-compat',
    keepWorkdir: true,
    timeoutMs: 300000,
    concurrency: 1,
  },
  repos: [
    {
      name: 'passbolt',
      repo: 'https://github.com/passbolt/passbolt_browser_extension.git',
      testCommand: 'npm run test:unit',
    },
    {
      name: 'copyguard',
      repo: 'https://github.com/roedesh/copyguard.git',
      testCommand: 'npm test',
    },
    {
      name: 'tabli',
      repo: 'https://github.com/antonycourtney/tabli.git',
      testCommand: 'npm test',
    },
  ],
};
