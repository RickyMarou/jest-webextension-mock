'use strict';

function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

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

function resolveKey(key, store) {
  if (typeof key === 'string') {
    if (key in store) {
      return {
        key: store[key]
      };
    } else {
      return {};
    }
  } else if (Array.isArray(key)) {
    return key.reduce(function (acc, currKey) {
      return _objectSpread2(_objectSpread2({}, acc), resolveKey(currKey, store));
    }, {});
  } else if (_typeof(key) === 'object') {
    return Object.entries(key).reduce(function (acc, _ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        currKey = _ref2[0],
        fallbackValue = _ref2[1];
      return _objectSpread2(_objectSpread2({}, acc), {}, _defineProperty({}, currKey, fallbackValue), resolveKey(currKey, store));
    }, {});
  }
  throw new Error('Wrong key given');
}
function mockStore() {
  var store = {};
  return {
    get: jest.fn(function (id, cb) {
      var result = id === null || id === undefined ? store : resolveKey(id, store);
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
        return store[key] = payload[key];
      });
      if (cb !== undefined) {
        return cb();
      }
      return Promise.resolve();
    }),
    remove: jest.fn(function (id, cb) {
      var keys = typeof id === 'string' ? [id] : id;
      keys.forEach(function (key) {
        return delete store[key];
      });
      if (cb !== undefined) {
        return cb();
      }
      return Promise.resolve();
    }),
    clear: jest.fn(function (cb) {
      Object.keys(store).forEach(function (key) {
        return delete store[key];
      });
      if (cb !== undefined) {
        return cb();
      }
      return Promise.resolve();
    }),
    onChanged: createEventListeners()
  };
}
var storage = {
  sync: mockStore(),
  local: mockStore(),
  session: mockStore(),
  managed: mockStore(),
  onChanged: createEventListeners()
};

var getDetails = function getDetails(details, cb) {
  if (cb !== undefined) {
    return cb();
  }
  return Promise.resolve();
};
var browserAction = {
  setTitle: jest.fn(),
  getTitle: jest.fn(getDetails),
  setIcon: jest.fn(getDetails),
  setPopup: jest.fn(),
  getPopup: jest.fn(getDetails),
  setBadgeText: jest.fn(),
  getBadgeText: jest.fn(getDetails),
  setBadgeBackgroundColor: jest.fn(),
  getBadgeBackgroundColor: jest.fn(getDetails),
  enable: jest.fn(),
  disable: jest.fn(),
  onClicked: {
    addListener: jest.fn()
  }
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
var create = function create(notificationId, options, cb) {
  if (typeof notificationId !== 'string') {
    notificationId = 'generated-id';
  }
  if (typeof options === 'function') {
    cb = options;
  }
  return cbOrPromise$1(cb, notificationId);
};
var notifications = {
  create: jest.fn(create),
  update: jest.fn(function (notificationId, options, cb) {
    return cbOrPromise$1(cb, true);
  }),
  clear: jest.fn(function (notificationId, cb) {
    return cbOrPromise$1(cb, true);
  }),
  getAll: jest.fn(function (cb) {
    return cbOrPromise$1(cb, []);
  }),
  getPermissionLevel: jest.fn(function (cb) {
    return cbOrPromise$1(cb, 'granted');
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

var webNavigation = {
  onCompleted: {
    addListener: jest.fn()
  },
  onHistoryStateUpdated: {
    addListener: jest.fn()
  }
};

var extension = {
  getURL: jest.fn()
};

var cbOrPromise = function cbOrPromise(cb, value) {
  if (cb !== undefined) {
    return cb(value);
  }
  return Promise.resolve(value);
};
var downloads = {
  acceptDanger: jest.fn(function (downloadId, cb) {
    return cbOrPromise(cb);
  }),
  cancel: jest.fn(function (downloadId, cb) {
    return cbOrPromise(cb);
  }),
  download: jest.fn(function (options, cb) {
    return cbOrPromise(cb);
  }),
  erase: jest.fn(function (query, cb) {
    return cbOrPromise(cb);
  }),
  getFileIcon: jest.fn(function (downloadId, cb) {
    return cbOrPromise(cb);
  }),
  open: jest.fn(),
  pause: jest.fn(function (downloadId, cb) {
    return cbOrPromise(cb);
  }),
  removeFile: jest.fn(function (downloadId, cb) {
    return cbOrPromise(cb);
  }),
  resume: jest.fn(function (downloadId, cb) {
    return cbOrPromise(cb);
  }),
  search: jest.fn(function (query, cb) {
    return cbOrPromise(cb);
  }),
  setShelfEnabled: jest.fn(),
  show: jest.fn(),
  showDefaultFolder: jest.fn()
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

globalThis[Symbol["for"]('jest-webextension-mock')] = _objectSpread2({
  extensionPath: 'moz-extension://8b413e68-1e0d-4cad-b98e-1eb000799783/'
}, globalThis[Symbol["for"]('jest-webextension-mock')]);
var chrome = {
  omnibox: omnibox,
  tabs: tabs,
  runtime: runtime,
  storage: storage,
  browserAction: browserAction,
  commands: commands,
  geckoProfiler: geckoProfiler,
  notifications: notifications,
  i18n: i18n,
  webNavigation: webNavigation,
  extension: extension,
  downloads: downloads,
  permissions: permissions
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
