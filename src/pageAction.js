import { createEventListeners } from './createEventListeners';

const getDetails = (details, callback) => {
  if (callback !== undefined) {
    callback();
    return;
  } else {
    return Promise.resolve();
  }
};

export const pageAction = {
  getPopup: jest.fn(getDetails),
  getTitle: jest.fn(getDetails),
  hide: jest.fn(),
  isShown: jest.fn(),
  openPopup: jest.fn(),
  setIcon: jest.fn(getDetails),
  setPopup: jest.fn(),
  setTitle: jest.fn(),
  show: jest.fn(),
  onClicked: createEventListeners(),
};
