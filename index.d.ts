/**
 * TypeScript type definitions for jest-webextension-mock
 * A mock for the WebExtension APIs for Jest
 */

export type MockFunction<T = unknown> = {
  (...args: unknown[]): T;
  mock: unknown;
  mockClear: () => void;
  mockReset: () => void;
  mockResolvedValue: <T>(value: T) => MockFunction<T>;
  mockRejectedValue: <T>(error: T) => MockFunction<T>;
  mockReturnValue: <T>(value: T) => MockFunction<T>;
  mockImplementation: (fn: (...args: unknown[]) => unknown) => MockFunction<T>;
  mockImplementationOnce: (fn: (...args: unknown[]) => unknown) => MockFunction<T>;
};

export interface Port {
  name?: string;
  disconnect: MockFunction;
  onDisconnect: {
    addListener: MockFunction;
  };
  onMessage: {
    addListener: MockFunction;
  };
  postMessage: MockFunction;
}

export interface Tab {
  id?: number;
  url?: string;
  title?: string;
  pinned?: boolean;
  highlighted?: boolean;
  active?: boolean;
  incognito?: boolean;
  windowId?: number;
  [key: string]: unknown;
}

export interface Tabs {
  get: MockFunction;
  getCurrent: MockFunction;
  connect: MockFunction<(tabId?: number, connectInfo?: { name?: string }) => Port>;
  create: MockFunction<(props?: Record<string, unknown>, callback?: (tab?: Tab) => void) => Promise<Tab> | void>;
  remove: MockFunction<(tabIds: number | number[], callback?: () => void) => Promise<void> | void>;
  duplicate: MockFunction;
  query: MockFunction<(query?: Record<string, unknown>, callback?: (tabs?: Tab[]) => void) => void>;
  highlight: MockFunction;
  update: MockFunction<(tabId?: number, props?: Record<string, unknown>, callback?: (tab?: Tab) => void) => void>;
  move: MockFunction;
  reload: MockFunction;
  detectLanguage: MockFunction;
  captureVisibleTab: MockFunction;
  getZoom: MockFunction;
  setZoom: MockFunction;
  getZoomSettings: MockFunction;
  setZoomSettings: MockFunction;
}

export interface Alarm {
  name?: string;
  scheduledTime?: number;
  periodInMinutes?: number;
}

export interface Alarms {
  create: MockFunction;
  get: MockFunction;
  getAll: MockFunction;
  clear: MockFunction;
  clearAll: MockFunction;
  onAlarm: {
    addListener: MockFunction;
  };
  onAlarmFired: {
    addListener: MockFunction;
  };
}

export interface BrowserAction {
  setTitle: MockFunction;
  getTitle: MockFunction;
  setIcon: MockFunction;
  setPopup: MockFunction;
  getPopup: MockFunction;
  setBadgeText: MockFunction;
  getBadgeText: MockFunction;
  setBadgeBackgroundColor: MockFunction;
  getBadgeBackgroundColor: MockFunction;
  setBadgeTextColor: MockFunction;
  getBadgeTextColor: MockFunction;
  enable: MockFunction;
  disable: MockFunction;
  openPopup: MockFunction;
  onClicked: {
    addListener: MockFunction;
  };
}

export interface PageAction {
  setTitle: MockFunction;
  getTitle: MockFunction;
  setIcon: MockFunction;
  setPopup: MockFunction;
  getPopup: MockFunction;
  show: MockFunction;
  hide: MockFunction;
  onClicked: {
    addListener: MockFunction;
  };
}

export interface Command {
  name?: string;
  description?: string;
  shortcut?: string;
}

export interface Commands {
  getAll: MockFunction;
  onCommand: {
    addListener: MockFunction;
  };
}

export interface DownloadItem {
  id?: number;
  url?: string;
  referrer?: string;
  state?: string;
  mime?: string;
  startTime?: string;
  endTime?: string;
  error?: string;
  bytesReceived?: number;
  totalBytes?: number;
  fileSize?: number;
  filename?: string;
}

export interface Downloads {
  download: MockFunction;
  search: MockFunction;
  pause: MockFunction;
  resume: MockFunction;
  cancel: MockFunction;
  getFileIcon: MockFunction;
  open: MockFunction;
  show: MockFunction;
  showFolderInManager: MockFunction;
  erase: MockFunction;
  removeFile: MockFunction;
  onCreated: {
    addListener: MockFunction;
  };
  onRemoved: {
    addListener: MockFunction;
  };
  onChanged: {
    addListener: MockFunction;
  };
  onErased: {
    addListener: MockFunction;
  };
  onDeterminingFilename: {
    addListener: MockFunction;
  };
}

export interface Extension {
  id: string;
  url: string;
  getURL: MockFunction;
  getBackground: MockFunction;
  getManifest: MockFunction;
  getViews: MockFunction;
  isAllowedIncognitoAccess: MockFunction;
  isAllowedFileSchemeAccess: MockFunction;
}

export interface Permissions {
  contains: MockFunction;
  getAll: MockFunction;
  request: MockFunction;
  remove: MockFunction;
  onAdded: {
    addListener: MockFunction;
  };
  onRemoved: {
    addListener: MockFunction;
  };
}

export interface StorageArea {
  get: MockFunction;
  set: MockFunction;
  remove: MockFunction;
  clear: MockFunction;
  getBytesInUse: MockFunction;
}

export interface Storage {
  local: StorageArea;
  sync: StorageArea;
  session: StorageArea;
  managed: StorageArea;
  onChanged: {
    addListener: MockFunction;
  };
}

export interface MessageSender {
  id?: string;
  url?: string;
  origin?: string;
  frameId?: number;
  tab?: Tab;
  tlsChannelId?: number;
}

export interface Runtime {
  getBackgroundPage: MockFunction;
  getManifest: MockFunction;
  getURL: MockFunction;
  getID: MockFunction;
  getPackageDirectoryEntry: MockFunction;
  connect: MockFunction;
  connectNative: MockFunction;
  sendMessage: MockFunction;
  sendNativeMessage: MockFunction;
  setBadgeText: MockFunction;
  getBadgeText: MockFunction;
  setBadgeBackgroundColor: MockFunction;
  getBadgeBackgroundColor: MockFunction;
  lastError: Error | null;
  onStartup: {
    addListener: MockFunction;
  };
  onInstalled: {
    addListener: MockFunction;
  };
  onUpdateAvailable: {
    addListener: MockFunction;
  };
  onUpdateProgress: {
    addListener: MockFunction;
  };
  onConnect: {
    addListener: MockFunction;
  };
  onConnectExternal: {
    addListener: MockFunction;
  };
  onMessage: {
    addListener: MockFunction;
  };
  onMessageExternal: {
    addListener: MockFunction;
  };
  onRequest: {
    addListener: MockFunction;
  };
  onRequestExternal: {
    addListener: MockFunction;
  };
}

export interface Notifications {
  create: MockFunction;
  update: MockFunction;
  clear: MockFunction;
  getAll: MockFunction;
  getPermissionLevel: MockFunction;
  onClosed: {
    addListener: MockFunction;
  };
  onClicked: {
    addListener: MockFunction;
  };
  onButtonClicked: {
    addListener: MockFunction;
  };
  onPermissionLevelChanged: {
    addListener: MockFunction;
  };
  onShowSettings: {
    addListener: MockFunction;
  };
}

export interface Omnibox {
  setDefaultSuggestion: MockFunction;
  onInputStarted: {
    addListener: MockFunction;
  };
  onInputChanged: {
    addListener: MockFunction;
  };
  onInputEntered: {
    addListener: MockFunction;
  };
  onInputCancelled: {
    addListener: MockFunction;
  };
  onDeleteSuggestion: {
    addListener: MockFunction;
  };
}

export interface WebNavigation {
  getFrame: MockFunction;
  getAllFrames: MockFunction;
  onCommitted: {
    addListener: MockFunction;
  };
  onCompleted: {
    addListener: MockFunction;
  };
  onCreatedNavigationTarget: {
    addListener: MockFunction;
  };
  onDOMContentLoaded: {
    addListener: MockFunction;
  };
  onErrorOccurred: {
    addListener: MockFunction;
  };
  onHistoryStateUpdated: {
    addListener: MockFunction;
  };
  onReferenceFragmentUpdated: {
    addListener: MockFunction;
  };
  onTabReplaced: {
    addListener: MockFunction;
  };
}

export interface GeckoProfiler {
  start: MockFunction;
  stop: MockFunction;
  pause: MockFunction;
  resume: MockFunction;
  getProfilerName: MockFunction;
}

export interface I18n {
  getMessage: MockFunction;
  getUILanguage: MockFunction;
  getAcceptLanguages: MockFunction;
}

export interface Chrome {
  action: BrowserAction;
  alarms: Alarms;
  browserAction: BrowserAction;
  commands: Commands;
  downloads: Downloads;
  extension: Extension;
  geckoProfiler: GeckoProfiler;
  i18n: I18n;
  notifications: Notifications;
  omnibox: Omnibox;
  pageAction: PageAction;
  permissions: Permissions;
  runtime: Runtime;
  storage: Storage;
  tabs: Tabs;
  webNavigation: WebNavigation;
}

export type Browser = Chrome;

declare const chrome: Chrome;
export { chrome };
