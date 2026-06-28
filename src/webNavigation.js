import { createEventListeners } from './createEventListeners';

export const webNavigation = {
  getFrame: jest.fn((details, cb) => {
    if (cb !== undefined) {
      return cb(null);
    }
    return Promise.resolve(null);
  }),
  getAllFrames: jest.fn((details, cb) => {
    if (cb !== undefined) {
      return cb([]);
    }
    return Promise.resolve([]);
  }),
  onBeforeNavigate: createEventListeners(),
  onCommitted: createEventListeners(),
  onDOMContentLoaded: createEventListeners(),
  onCompleted: createEventListeners(),
  onErrorOccurred: createEventListeners(),
  onCreatedNavigationTarget: createEventListeners(),
  onReferenceFragmentUpdated: createEventListeners(),
  onTabReplaced: createEventListeners(),
  onHistoryStateUpdated: createEventListeners(),
};
