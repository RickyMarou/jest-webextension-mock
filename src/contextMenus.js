import { createEventListeners } from './createEventListeners';

const cbOrPromise = (cb, value) => {
  if (cb !== undefined) {
    return cb(value);
  }

  return Promise.resolve(value);
};

let generatedId = 0;

const create = (createProperties, cb) => {
  const id =
    createProperties && createProperties.id !== undefined
      ? createProperties.id
      : `generated-id-${++generatedId}`;

  if (typeof cb === 'function') {
    cb();
  }

  return id;
};

export const contextMenus = {
  ACTION_MENU_TOP_LEVEL_LIMIT: 6,
  create: jest.fn(create),
  update: jest.fn((id, updateProperties, cb) => cbOrPromise(cb)),
  remove: jest.fn((menuItemId, cb) => cbOrPromise(cb)),
  removeAll: jest.fn((cb) => cbOrPromise(cb)),
  refresh: jest.fn((cb) => cbOrPromise(cb)),
  getTargetElement: jest.fn(() => null),
  onClicked: createEventListeners(),
  onShown: createEventListeners(),
  onHidden: createEventListeners(),
};
