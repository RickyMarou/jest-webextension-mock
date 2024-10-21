'use strict';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var createEventListeners = function createEventListeners() {
  var listeners = [];
  return {
    addListener: jest.fn(function (listener) {
      listeners.push(listener);
    }),
    removeListener: jest.fn(function (listener) {
      listeners = listeners.filter(function (l) {
        return l !== listener;
      });
    }),
    hasListener: jest.fn(function (listener) {
      return listeners.includes(listener);
    }),
    hasListeners: jest.fn(function () {
      return listeners.length > 0;
    })
  };
};

var getDetails$1 = function getDetails(details, callback) {
  if (callback !== undefined) {
    callback();
    return;
  } else {
    return Promise.resolve();
  }
};
var getter = function getter(callback) {
  if (callback !== undefined) {
    callback();
    return;
  } else {
    return Promise.resolve();
  }
};
var browserAction = {
  disable: jest.fn(),
  enable: jest.fn(),
  getBadgeBackgroundColor: jest.fn(getDetails$1),
  getBadgeText: jest.fn(getDetails$1),
  getBadgeTextColor: jest.fn(getDetails$1),
  getPopup: jest.fn(getDetails$1),
  getTitle: jest.fn(getDetails$1),
  getUserSettings: jest.fn(getter),
  isEnabled: jest.fn(),
  openPopup: jest.fn(),
  setBadgeBackgroundColor: jest.fn(),
  setBadgeText: jest.fn(),
  setBadgeTextColor: jest.fn(),
  setIcon: jest.fn(getDetails$1),
  setPopup: jest.fn(),
  setTitle: jest.fn(),
  onClicked: createEventListeners(),
  onUserSettingsChanged: createEventListeners()
};

// https://developer.chrome.com/extensions/commands

var commands = {
  getAll: jest.fn(function (cb) {
    if (cb !== undefined) {
      return cb();
    }
    return Promise.resolve();
  }),
  onCommand: {
    addListener: jest.fn()
  }
};

var cbOrPromise$1 = function cbOrPromise(cb, value) {
  if (cb !== undefined) {
    return cb(value);
  }
  return Promise.resolve(value);
};
var downloads = {
  acceptDanger: jest.fn(function (downloadId, cb) {
    return cbOrPromise$1(cb);
  }),
  cancel: jest.fn(function (downloadId, cb) {
    return cbOrPromise$1(cb);
  }),
  download: jest.fn(function (options, cb) {
    return cbOrPromise$1(cb);
  }),
  erase: jest.fn(function (query, cb) {
    return cbOrPromise$1(cb);
  }),
  getFileIcon: jest.fn(function (downloadId, cb) {
    return cbOrPromise$1(cb);
  }),
  open: jest.fn(),
  pause: jest.fn(function (downloadId, cb) {
    return cbOrPromise$1(cb);
  }),
  removeFile: jest.fn(function (downloadId, cb) {
    return cbOrPromise$1(cb);
  }),
  resume: jest.fn(function (downloadId, cb) {
    return cbOrPromise$1(cb);
  }),
  search: jest.fn(function (query, cb) {
    return cbOrPromise$1(cb);
  }),
  setShelfEnabled: jest.fn(),
  show: jest.fn(),
  showDefaultFolder: jest.fn()
};

var extension = {
  getURL: jest.fn()
};

var geckoProfiler = {
  stop: jest.fn(function () {
    return Promise.resolve();
  }),
  start: jest.fn(function () {
    return Promise.resolve();
  }),
  pause: jest.fn(function () {
    return Promise.resolve();
  }),
  resume: jest.fn(function () {
    return Promise.resolve();
  }),
  getProfile: jest.fn(function () {
    return Promise.resolve();
  }),
  getProfileAsArrayBuffer: jest.fn(function () {
    return Promise.resolve();
  }),
  getSymbols: jest.fn(function (debugName, breakpadId) {
    return Promise.resolve();
  }),
  onRunning: {
    addListener: jest.fn()
  }
};

var i18n = {
  getAcceptLanguages: jest.fn(),
  getMessage: jest.fn(function (key) {
    return "Translated<".concat(key, ">");
  }),
  getUILanguage: jest.fn(function () {
    return 'en';
  }),
  detectLanguage: jest.fn()
};

var cbOrPromise = function cbOrPromise(cb, value) {
  if (cb !== undefined) {
    return cb(value);
  }
  return Promise.resolve(value);
};
var create = function create(notificationId, options, cb) {
  if (typeof notificationId !== 'string') {
    notificationId = 'generated-id';
  }
  if (typeof options === 'function') {
    cb = options;
  }
  return cbOrPromise(cb, notificationId);
};
var notifications = {
  create: jest.fn(create),
  update: jest.fn(function (notificationId, options, cb) {
    return cbOrPromise(cb, true);
  }),
  clear: jest.fn(function (notificationId, cb) {
    return cbOrPromise(cb, true);
  }),
  getAll: jest.fn(function (cb) {
    return cbOrPromise(cb, []);
  }),
  getPermissionLevel: jest.fn(function (cb) {
    return cbOrPromise(cb, 'granted');
  }),
  onClosed: {
    addListener: jest.fn()
  },
  onClicked: {
    addListener: jest.fn()
  },
  onButtonClicked: {
    addListener: jest.fn()
  },
  onPermissionLevelChanged: {
    addListener: jest.fn()
  },
  onShowSettings: {
    addListener: jest.fn()
  }
};

// https://developer.chrome.com/extensions/omnibox

var omnibox = {
  setDefaultSuggestion: jest.fn(),
  onInputStarted: {
    addListener: jest.fn()
  },
  onInputChanged: {
    addListener: jest.fn()
  },
  onInputEntered: {
    addListener: jest.fn()
  },
  onInputCancelled: {
    addListener: jest.fn()
  }
};

var getDetails = function getDetails(details, callback) {
  if (callback !== undefined) {
    callback();
    return;
  } else {
    return Promise.resolve();
  }
};
var pageAction = {
  getPopup: jest.fn(getDetails),
  getTitle: jest.fn(getDetails),
  hide: jest.fn(),
  isShown: jest.fn(),
  openPopup: jest.fn(),
  setIcon: jest.fn(getDetails),
  setPopup: jest.fn(),
  setTitle: jest.fn(),
  show: jest.fn(),
  onClicked: createEventListeners()
};

// https://developer.chrome.com/extensions/permissions
var permissions = {
  contains: jest.fn(),
  getAll: jest.fn(),
  remove: jest.fn(),
  request: jest.fn(),
  onAdded: {
    addListener: jest.fn()
  },
  onRemoved: {
    addListener: jest.fn()
  }
};

var onMessageListeners = [];
var onMessageExternalListeners = [];
var runtime = {
  connect: jest.fn(function (_ref) {
    var name = _ref.name;
    return {
      name: name,
      postMessage: jest.fn(),
      onDisconnect: {
        addListener: jest.fn()
      },
      onMessage: {
        addListener: jest.fn(function (listener) {
          onMessageListeners.push(listener);
        })
      },
      disconnect: jest.fn()
    };
  }),
  sendMessage: jest.fn(function (message, cb) {
    onMessageListeners.forEach(function (listener) {
      return listener(message);
    });
    if (cb !== undefined) {
      return cb();
    }
    return Promise.resolve();
  }),
  onMessage: {
    addListener: jest.fn(function (listener) {
      onMessageListeners.push(listener);
    }),
    removeListener: jest.fn(function (listener) {
      onMessageListeners = onMessageListeners.filter(function (lstn) {
        return lstn !== listener;
      });
    }),
    hasListener: jest.fn(function (listener) {
      return onMessageListeners.includes(listener);
    })
  },
  onMessageExternal: {
    addListener: jest.fn(function (listener) {
      onMessageExternalListeners.push(listener);
    }),
    removeListener: jest.fn(function (listener) {
      onMessageExternalListeners = onMessageExternalListeners.filter(function (lstn) {
        return lstn !== listener;
      });
    }),
    hasListener: jest.fn(function (listener) {
      return onMessageExternalListeners.includes(listener);
    })
  },
  onConnect: {
    addListener: jest.fn(),
    removeListener: jest.fn(),
    hasListener: jest.fn()
  },
  onInstalled: {
    addListener: jest.fn(),
    removeListener: jest.fn(),
    hasListener: jest.fn()
  },
  getURL: jest.fn(function (path) {
    var origin = globalThis[Symbol["for"]('jest-webextension-mock')].extensionPath;
    return String(new URL(path, origin));
  }),
  openOptionsPage: jest.fn(),
  getManifest: jest.fn(function () {
    return {
      manifest_version: 3
    };
  })
};

var syncStore = {};
var localStore = {};
var managedStore = {};
function resolveKey(key, store) {
  if (typeof key === 'string') {
    var result = {};
    result[key] = store[key];
    return result;
  } else if (Array.isArray(key)) {
    return key.reduce(function (acc, curr) {
      acc[curr] = store[curr];
      return acc;
    }, {});
  } else if (_typeof(key) === 'object') {
    return Object.keys(key).reduce(function (acc, curr) {
      acc[curr] = store[curr] || key[curr];
      return acc;
    }, {});
  }
  throw new Error('Wrong key given');
}
var storage = {
  sync: {
    get: jest.fn(function (id, cb) {
      var result = id === null || id === undefined ? syncStore : resolveKey(id, syncStore);
      if (cb !== undefined) {
        return cb(result);
      }
      return Promise.resolve(result);
    }),
    getBytesInUse: jest.fn(function (id, cb) {
      if (cb !== undefined) {
        return cb(0);
      }
      return Promise.resolve(0);
    }),
    set: jest.fn(function (payload, cb) {
      Object.keys(payload).forEach(function (key) {
        return syncStore[key] = payload[key];
      });
      if (cb !== undefined) {
        return cb();
      }
      return Promise.resolve();
    }),
    remove: jest.fn(function (id, cb) {
      var keys = typeof id === 'string' ? [id] : id;
      keys.forEach(function (key) {
        return delete syncStore[key];
      });
      if (cb !== undefined) {
        return cb();
      }
      return Promise.resolve();
    }),
    clear: jest.fn(function (cb) {
      syncStore = {};
      if (cb !== undefined) {
        return cb();
      }
      return Promise.resolve();
    }),
    onChanged: createEventListeners()
  },
  local: {
    get: jest.fn(function (id, cb) {
      var result = id === null || id === undefined ? localStore : resolveKey(id, localStore);
      if (cb !== undefined) {
        return cb(result);
      }
      return Promise.resolve(result);
    }),
    getBytesInUse: jest.fn(function (id, cb) {
      if (cb !== undefined) {
        return cb(0);
      }
      return Promise.resolve(0);
    }),
    set: jest.fn(function (payload, cb) {
      Object.keys(payload).forEach(function (key) {
        return localStore[key] = payload[key];
      });
      if (cb !== undefined) {
        return cb();
      }
      return Promise.resolve();
    }),
    remove: jest.fn(function (id, cb) {
      var keys = typeof id === 'string' ? [id] : id;
      keys.forEach(function (key) {
        return delete localStore[key];
      });
      if (cb !== undefined) {
        return cb();
      }
      return Promise.resolve();
    }),
    clear: jest.fn(function (cb) {
      localStore = {};
      if (cb !== undefined) {
        return cb();
      }
      return Promise.resolve();
    }),
    onChanged: createEventListeners()
  },
  session: {
    get: jest.fn(function (id, cb) {
      var result = id === null || id === undefined ? localStore : resolveKey(id, localStore);
      if (cb !== undefined) {
        return cb(result);
      }
      return Promise.resolve(result);
    }),
    getBytesInUse: jest.fn(function (id, cb) {
      if (cb !== undefined) {
        return cb(0);
      }
      return Promise.resolve(0);
    }),
    set: jest.fn(function (payload, cb) {
      Object.keys(payload).forEach(function (key) {
        return localStore[key] = payload[key];
      });
      if (cb !== undefined) {
        return cb();
      }
      return Promise.resolve();
    }),
    remove: jest.fn(function (id, cb) {
      var keys = typeof id === 'string' ? [id] : id;
      keys.forEach(function (key) {
        return delete localStore[key];
      });
      if (cb !== undefined) {
        return cb();
      }
      return Promise.resolve();
    }),
    clear: jest.fn(function (cb) {
      localStore = {};
      if (cb !== undefined) {
        return cb();
      }
      return Promise.resolve();
    }),
    onChanged: createEventListeners()
  },
  managed: {
    get: jest.fn(function (id, cb) {
      var result = id === null || id === undefined ? managedStore : resolveKey(id, managedStore);
      if (cb !== undefined) {
        return cb(result);
      }
      return Promise.resolve(result);
    }),
    getBytesInUse: jest.fn(function (id, cb) {
      if (cb !== undefined) {
        return cb(0);
      }
      return Promise.resolve(0);
    }),
    set: jest.fn(function (payload, cb) {
      Object.keys(payload).forEach(function (key) {
        return managedStore[key] = payload[key];
      });
      if (cb !== undefined) {
        return cb();
      }
      return Promise.resolve();
    }),
    remove: jest.fn(function (id, cb) {
      var keys = typeof id === 'string' ? [id] : id;
      keys.forEach(function (key) {
        return delete managedStore[key];
      });
      if (cb !== undefined) {
        return cb();
      }
      return Promise.resolve();
    }),
    clear: jest.fn(function (cb) {
      managedStore = {};
      if (cb !== undefined) {
        return cb();
      }
      return Promise.resolve();
    }),
    onChanged: createEventListeners()
  },
  onChanged: createEventListeners()
};

// https://developer.chrome.com/extensions/tabs
var tabs = {
  get: jest.fn(function () {
    var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    return cb({});
  }),
  getCurrent: jest.fn(function (cb) {
    return cb({});
  }),
  connect: jest.fn(function () {
    var info = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    // returns a Port
    return {
      name: info.name,
      disconnect: jest.fn(),
      onDisconnect: {
        addListener: jest.fn()
      },
      onMessage: {
        addListener: jest.fn()
      },
      postMessage: jest.fn()
      // TODO: add sender
    };
  }),
  create: jest.fn(function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var cb = arguments.length > 1 ? arguments[1] : undefined;
    if (cb !== undefined) {
      return cb(props);
    }
    return Promise.resolve(props);
  }),
  remove: jest.fn(function (tabIds, cb) {
    if (cb !== undefined) {
      return cb();
    }
    return Promise.resolve();
  }),
  duplicate: jest.fn(function () {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    return cb(Object.assign({}, {
      id: id
    }));
  }),
  query: jest.fn(function () {
    var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    return cb([{}]);
  }),
  highlight: jest.fn(function () {
    var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    return cb();
  }),
  update: jest.fn(function () {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
    return cb(Object.assign({}, props, {
      id: id
    }));
  }),
  move: jest.fn(function () {
    var ids = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
    return cb(ids.map(function (id) {
      return Object.assign({}, props, {
        id: id
      });
    }));
  }),
  onUpdated: {
    addListener: jest.fn(),
    removeListener: jest.fn(),
    hasListener: jest.fn()
  },
  onRemoved: {
    addListener: jest.fn(),
    removeListener: jest.fn(),
    hasListener: jest.fn()
  },
  onCreated: {
    addListener: jest.fn(),
    removeListener: jest.fn(),
    hasListener: jest.fn()
  },
  sendMessage: jest.fn(function (tabId, message, cb) {
    onMessageListeners.forEach(function (listener) {
      return listener(tabId, message);
    });
    if (cb !== undefined) {
      return cb();
    }
    return Promise.resolve();
  }),
  reload: jest.fn(function (tabId, reloadProperties, cb) {
    return cb();
  })
};

var webNavigation = {
  onCompleted: {
    addListener: jest.fn()
  },
  onHistoryStateUpdated: {
    addListener: jest.fn()
  }
};

globalThis[Symbol["for"]('jest-webextension-mock')] = _objectSpread2({
  extensionPath: 'moz-extension://8b413e68-1e0d-4cad-b98e-1eb000799783/'
}, globalThis[Symbol["for"]('jest-webextension-mock')]);
var chrome = {
  action: browserAction,
  browserAction: browserAction,
  commands: commands,
  downloads: downloads,
  extension: extension,
  geckoProfiler: geckoProfiler,
  i18n: i18n,
  notifications: notifications,
  omnibox: omnibox,
  pageAction: pageAction,
  permissions: permissions,
  runtime: runtime,
  storage: storage,
  tabs: tabs,
  webNavigation: webNavigation
};
 // Firefox uses 'browser' but aliases it to chrome

/**
 * This is a setup file we specify as our 'main' entry point
 * from the package.json file.  This allows developers to
 * directly call the module in their `setupFiles` property.
 */
global.chrome = chrome;
global.browser = chrome;

// Firefox specific globals
// if (navigator.userAgent.indexOf('Firefox') !== -1) {
// https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Content_scripts#exportFunction
global.exportFunction = jest.fn(function (func) {
  return func;
});
// https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Content_scripts#cloneInto
global.cloneInto = jest.fn(function (obj) {
  return obj;
});
// }
