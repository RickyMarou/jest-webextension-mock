import { createEventListeners } from './createEventListeners';

const getDetails = (details, callback) => {
  if (callback !== undefined) {
    callback();
    return;
  } else {
    return Promise.resolve();
  }
};

const getter = (callback) => {
  if (callback !== undefined) {
    callback();
    return;
  } else {
    return Promise.resolve();
  }
};

export const browserAction = {
  disable: jest.fn(),
  enable: jest.fn(),
  getBadgeBackgroundColor: jest.fn(getDetails),
  getBadgeText: jest.fn(getDetails),
  getBadgeTextColor: jest.fn(getDetails),
  getPopup: jest.fn(getDetails),
  getTitle: jest.fn(getDetails),
  getUserSettings: jest.fn(getter),
  isEnabled: jest.fn(),
  openPopup: jest.fn(),
  setBadgeBackgroundColor: jest.fn(),
  setBadgeText: jest.fn(),
  setBadgeTextColor: jest.fn(),
  setIcon: jest.fn(getDetails),
  setPopup: jest.fn(),
  setTitle: jest.fn(),
  onClicked: createEventListeners(),
  onUserSettingsChanged: createEventListeners(),
};
