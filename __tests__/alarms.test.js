function expectIntegerCloseTo(actual, expected, allowedDifference) {
  expect(actual).toBeGreaterThanOrEqual(expected - allowedDifference);
  expect(actual).toBeLessThanOrEqual(expected + allowedDifference);
}

describe('browser.alarms', () => {
  afterEach(() => {
    browser.alarms.clearAll();
    jest.clearAllMocks();
  });

  test('create empty', async () => {
    browser.alarms.create();

    const alarm = await browser.alarms.get();

    expect(alarm.name).toBe('');
    expect(alarm.periodInMinutes).toBeUndefined();
  });

  test('create two without name', async () => {
    browser.alarms.create({ when: 123 });
    browser.alarms.create({ when: 456 });

    const alarm = await browser.alarms.get();

    expect(alarm.scheduledTime).toBe(456);
    expect(await browser.alarms.getAll()).toHaveLength(1);
  });

  test('create full', async () => {
    browser.alarms.create('alarm', {
      when: 123,
      delayInMinutes: 4,
      periodInMinutes: 5,
    });

    expect(await browser.alarms.get('alarm')).toStrictEqual({
      name: 'alarm',
      scheduledTime: 123,
      periodInMinutes: 5,
    });
  });

  test('create with delay only', async () => {
    browser.alarms.create({ delayInMinutes: 4 });

    const alarm = await browser.alarms.get();

    expectIntegerCloseTo(alarm.scheduledTime, Date.now() + 4 * 60 * 1000, 2000);
    expect(alarm.periodInMinutes).toBeUndefined();
  });

  test('create with period only', async () => {
    browser.alarms.create({ periodInMinutes: 4 });

    const alarm = await browser.alarms.get();

    expectIntegerCloseTo(alarm.scheduledTime, Date.now() + 4 * 60 * 1000, 2000);
    expect(alarm.periodInMinutes).toBe(4);
  });

  test('get', () => {
    browser.alarms.create('alarm1', { when: 123 });
    browser.alarms.create('alarm2', { when: 456 });
    const callback = jest.fn();

    browser.alarms.get('alarm1', callback);

    expect(callback).toHaveBeenCalledWith({
      name: 'alarm1',
      scheduledTime: 123,
    });
  });

  test('get promise', async () => {
    browser.alarms.create('alarm1', { when: 123 });
    browser.alarms.create('alarm2', { when: 456 });

    const alarm = await browser.alarms.get('alarm1');

    expect(alarm).toStrictEqual({
      name: 'alarm1',
      scheduledTime: 123,
    });
  });

  test('getAll', () => {
    browser.alarms.create('alarm1', { when: 123 });
    browser.alarms.create('alarm2', { when: 456 });
    const callback = jest.fn();

    browser.alarms.getAll(callback);

    expect(callback).toHaveBeenCalledTimes(1);
    const alarms = callback.mock.calls[0][0];
    expect(alarms).toHaveLength(2);
    expect(alarms).toContainEqual({
      name: 'alarm1',
      scheduledTime: 123,
    });
    expect(alarms).toContainEqual({
      name: 'alarm2',
      scheduledTime: 456,
    });
  });

  test('getAll promise', async () => {
    browser.alarms.create('alarm1', { when: 123 });
    browser.alarms.create('alarm2', { when: 456 });

    const alarms = await browser.alarms.getAll();

    expect(alarms).toHaveLength(2);
    expect(alarms).toContainEqual({
      name: 'alarm1',
      scheduledTime: 123,
    });
    expect(alarms).toContainEqual({
      name: 'alarm2',
      scheduledTime: 456,
    });
  });

  test('clear', async () => {
    browser.alarms.create('alarm1', { when: 123 });
    browser.alarms.create('alarm2', { when: 456 });
    const callback = jest.fn();

    browser.alarms.clear('alarm1', callback);

    expect(callback).toHaveBeenCalledWith(true);
    expect(await browser.alarms.get('alarm1')).toBeUndefined();
    expect(await browser.alarms.get('alarm2')).not.toBeUndefined();
  });

  test('clear promise', async () => {
    browser.alarms.create('alarm1', { when: 123 });
    browser.alarms.create('alarm2', { when: 456 });

    const result = await browser.alarms.clear('alarm1');

    expect(result).toBe(true);
    expect(await browser.alarms.get('alarm1')).toBeUndefined();
    expect(await browser.alarms.get('alarm2')).not.toBeUndefined();
  });

  test('clear default', async () => {
    browser.alarms.create({ when: 123 });
    const callback = jest.fn();

    browser.alarms.clear(callback);

    expect(callback).toHaveBeenCalledWith(true);
    expect(await browser.alarms.get()).toBeUndefined();
    expect(await browser.alarms.getAll()).toHaveLength(0);
  });

  test('clear promise default', async () => {
    browser.alarms.create({ when: 123 });

    const result = await browser.alarms.clear();

    expect(result).toBe(true);
    expect(await browser.alarms.get()).toBeUndefined();
    expect(await browser.alarms.getAll()).toHaveLength(0);
  });

  test('clear non-existing', async () => {
    browser.alarms.create('alarm1', { when: 123 });
    const callback = jest.fn();

    browser.alarms.clear('alarm2', callback);

    expect(callback).toHaveBeenCalledWith(false);
    expect(await browser.alarms.get('alarm1')).not.toBeUndefined();
  });

  test('clear promise non-existing', async () => {
    browser.alarms.create('alarm1', { when: 123 });

    const result = await browser.alarms.clear('alarm2');

    expect(result).toBe(false);
    expect(await browser.alarms.get('alarm1')).not.toBeUndefined();
  });

  test('clearAll', async () => {
    browser.alarms.create('alarm1', { when: 123 });
    browser.alarms.create('alarm2', { when: 456 });
    const callback = jest.fn();

    browser.alarms.clearAll(callback);

    expect(callback).toHaveBeenCalledWith(true);
    expect(await browser.alarms.get('alarm1')).toBeUndefined();
    expect(await browser.alarms.get('alarm2')).toBeUndefined();
    expect(await browser.alarms.getAll()).toHaveLength(0);
  });

  test('clearAll promise', async () => {
    browser.alarms.create('alarm1', { when: 123 });
    browser.alarms.create('alarm2', { when: 456 });

    const result = await browser.alarms.clearAll();

    expect(result).toBe(true);
    expect(await browser.alarms.get('alarm1')).toBeUndefined();
    expect(await browser.alarms.get('alarm2')).toBeUndefined();
    expect(await browser.alarms.getAll()).toHaveLength(0);
  });
});
