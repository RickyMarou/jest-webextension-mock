export const createEventListeners = () => {
  let listeners = [];

  return {
    addListener: jest.fn((listener) => {
      listeners.push(listener);
    }),
    removeListener: jest.fn((listener) => {
      listeners = listeners.filter((l) => l !== listener);
    }),
    hasListener: jest.fn((listener) => {
      return listeners.includes(listener);
    }),
    hasListeners: jest.fn(() => {
      return listeners.length > 0;
    }),
  };
};
