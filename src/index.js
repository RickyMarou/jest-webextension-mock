import { browserAction } from './browserAction';
import { commands } from './commands';
import { downloads } from './downloads';
import { extension } from './extension';
// Firefox specific API
import { geckoProfiler } from './geckoProfiler';
import { i18n } from './i18n';
import { notifications } from './notifications';
import { omnibox } from './omnibox';
// Firefox specific API
import { pageAction } from './pageAction';
import { permissions } from './permissions';
import { runtime } from './runtime';
import { storage } from './storage';
import { tabs } from './tabs';
import { webNavigation } from './webNavigation';

globalThis[Symbol.for('jest-webextension-mock')] = {
  extensionPath: 'moz-extension://8b413e68-1e0d-4cad-b98e-1eb000799783/',
  ...globalThis[Symbol.for('jest-webextension-mock')],
};

const chrome = {
  action: browserAction,
  browserAction,
  commands,
  downloads,
  extension,
  geckoProfiler,
  i18n,
  notifications,
  omnibox,
  pageAction,
  permissions,
  runtime,
  storage,
  tabs,
  webNavigation,
};

export { chrome };
export { chrome as browser }; // Firefox uses 'browser' but aliases it to chrome
