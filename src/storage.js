import { createEventListeners } from './createEventListeners';

function resolveKey(key, store) {
  if (typeof key === 'string') {
    if (key in store) {
      return { key: store[key] };
    } else {
      return {};
    }
  } else if (Array.isArray(key)) {
    return key.reduce(
      (acc, currKey) => ({
        ...acc,
        ...resolveKey(currKey, store),
      }),
      {}
    );
  } else if (typeof key === 'object') {
    return Object.entries(key).reduce(
      (acc, [currKey, fallbackValue]) => ({
        ...acc,
        [currKey]: fallbackValue,
        ...resolveKey(currKey, store),
      }),
      {}
    );
  }
  throw new Error('Wrong key given');
}

function mockStore() {
  const store = {};

  return {
    get: jest.fn((id, cb) => {
      const result =
        id === null || id === undefined ? store : resolveKey(id, store);
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
      Object.keys(payload).forEach((key) => (store[key] = payload[key]));
      if (cb !== undefined) {
        return cb();
      }
      return Promise.resolve();
    }),
    remove: jest.fn((id, cb) => {
      const keys = typeof id === 'string' ? [id] : id;
      keys.forEach((key) => delete store[key]);
      if (cb !== undefined) {
        return cb();
      }
      return Promise.resolve();
    }),
    clear: jest.fn((cb) => {
      Object.keys(store).forEach((key) => delete store[key]);
      if (cb !== undefined) {
        return cb();
      }
      return Promise.resolve();
    }),
    onChanged: createEventListeners(),
  };
}

export const storage = {
  sync: mockStore(),
  local: mockStore(),
  session: mockStore(),
  managed: mockStore(),
  onChanged: createEventListeners(),
};
