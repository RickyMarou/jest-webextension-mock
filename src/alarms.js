import { createEventListeners } from './createEventListeners';

const createdAlarms = {};

function clearAlarms(alarmNames) {
  return (alarmNames ?? Object.keys(createdAlarms))
    .map((alarmName) => {
      const alarmExisted = alarmName in createdAlarms;
      delete createdAlarms[alarmName];
      return alarmExisted;
    })
    .some(alarmExisted => alarmExisted);
}

export const alarms = {
  clear: jest.fn((arg1, arg2) => {
    const name = [arg1, arg2].find(it => typeof it === 'string') ?? '';
    const callback = [arg1, arg2].find(it => typeof it === 'function');
    const result = clearAlarms([name]);
    if (typeof callback === 'function') {
      callback(result);
    } else {
      return Promise.resolve(result);
    }
  }),
  clearAll: jest.fn((callback) => {
    const result = clearAlarms();
    if (typeof callback === 'function') {
      callback(result);
    } else {
      return Promise.resolve(result);
    }
  }),
  create: jest.fn((arg1, arg2) => {
    const name = [arg1, arg2].find(it => typeof it === 'string') ?? '';
    const alarmInfo = [arg1, arg2].find(it => typeof it === 'object') ?? {};
    createdAlarms[name] = {
      name,
      scheduledTime: alarmInfo.when ?? (
        Date.now() + ((alarmInfo.delayInMinutes ?? alarmInfo.periodInMinutes ?? 0) * 60 * 1000)
      ),
      ...(typeof alarmInfo.periodInMinutes === 'number' ? {
        periodInMinutes: alarmInfo.periodInMinutes,
      } : {}),
    };
  }),
  get: jest.fn((arg1, arg2) => {
    const name = [arg1, arg2].find(it => typeof it === 'string') ?? '';
    const callback = [arg1, arg2].find(it => typeof it === 'function');
    const alarm = createdAlarms[name];
    if (typeof callback === 'function') {
      callback(alarm);
    } else {
      return Promise.resolve(alarm);
    }
  }),
  getAll: jest.fn((callback) => {
    const alarms = Object.values(createdAlarms);
    if (typeof callback === 'function') {
      callback(alarms);
    } else {
      return Promise.resolve(alarms);
    }
  }),
  onAlarm: createEventListeners(),
};