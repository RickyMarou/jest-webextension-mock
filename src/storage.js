import { createEventListeners } from './createEventListeners';

let syncStore = {};
let localStore = {};
let managedStore = {};

function resolveKey(key, store) {
  if (typeof key === 'string') {
    const result = {};
    result[key] = store[key];
    return result;
  } else if (Array.isArray(key)) {
    return key.reduce((acc, curr) => {
      acc[curr] = store[curr];
      return acc;
    }, {});
  } else if (typeof key === 'object') {
    return Object.keys(key).reduce((acc, curr) => {
      acc[curr] = store[curr] || key[curr];
      return acc;
    }, {});
  }
  throw new Error('Wrong key given');
}

export const storage = {
  sync: {
    get: jest.fn((id, cb) => {
      const result = id === null ? syncStore : resolveKey(id, syncStore);
      if (cb !== undefined) {
        return cb(result);
      }
      return Promise.resolve(result);
    }),
    getBytesInUse: jest.fn((id, cb) => {
      if (cb !== undefined) {
        return cb(0);
      }
      return Promise.resolve(0);
    }),
    set: jest.fn((payload, cb) => {
      Object.keys(payload).forEach((key) => (syncStore[key] = payload[key]));
      if (cb !== undefined) {
        return cb();
      }
      return Promise.resolve();
    }),
    remove: jest.fn((id, cb) => {
      const keys = typeof id === 'string' ? [id] : id;
      keys.forEach((key) => delete syncStore[key]);
      if (cb !== undefined) {
        return cb();
      }
      return Promise.resolve();
    }),
    clear: jest.fn((cb) => {
      syncStore = {};
      if (cb !== undefined) {
        return cb();
      }
      return Promise.resolve();
    }),
    onChanged: createEventListeners(),
  },
  local: {
    get: jest.fn((id, cb) => {
      const result = id === null ? localStore : resolveKey(id, localStore);
      if (cb !== undefined) {
        return cb(result);
      }
      return Promise.resolve(result);
    }),
    getBytesInUse: jest.fn((id, cb) => {
      if (cb !== undefined) {
        return cb(0);
      }
      return Promise.resolve(0);
    }),
    set: jest.fn((payload, cb) => {
      Object.keys(payload).forEach((key) => (localStore[key] = payload[key]));
      if (cb !== undefined) {
        return cb();
      }
      return Promise.resolve();
    }),
    remove: jest.fn((id, cb) => {
      const keys = typeof id === 'string' ? [id] : id;
      keys.forEach((key) => delete localStore[key]);
      if (cb !== undefined) {
        return cb();
      }
      return Promise.resolve();
    }),
    clear: jest.fn((cb) => {
      localStore = {};
      if (cb !== undefined) {
        return cb();
      }
      return Promise.resolve();
    }),
    onChanged: createEventListeners(),
  },
  managed: {
    get: jest.fn((id, cb) => {
      const result = id === null ? managedStore : resolveKey(id, managedStore);
      if (cb !== undefined) {
        return cb(result);
      }
      return Promise.resolve(result);
    }),
    getBytesInUse: jest.fn((id, cb) => {
      if (cb !== undefined) {
        return cb(0);
      }
      return Promise.resolve(0);
    }),
    set: jest.fn((payload, cb) => {
      Object.keys(payload).forEach((key) => (managedStore[key] = payload[key]));
      if (cb !== undefined) {
        return cb();
      }
      return Promise.resolve();
    }),
    remove: jest.fn((id, cb) => {
      const keys = typeof id === 'string' ? [id] : id;
      keys.forEach((key) => delete managedStore[key]);
      if (cb !== undefined) {
        return cb();
      }
      return Promise.resolve();
    }),
    clear: jest.fn((cb) => {
      managedStore = {};
      if (cb !== undefined) {
        return cb();
      }
      return Promise.resolve();
    }),
    onChanged: createEventListeners(),
  },
  onChanged: createEventListeners(),
};
