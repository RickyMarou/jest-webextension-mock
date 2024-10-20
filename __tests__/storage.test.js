describe('browser.storage', () => {
  ['addListener', 'removeListener', 'hasListener'].forEach((method) => {
    test(`onChanged.${method}`, () => {
      const callback = jest.fn();
      expect(jest.isMockFunction(browser.storage.onChanged[method])).toBe(true);
      browser.storage.onChanged[method](callback);
      expect(browser.storage.onChanged[method]).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledTimes(0);
    });
  });
});

describe('browser.storage', () => {
  ['sync', 'local', 'managed', 'session'].forEach((type) => {
    describe(type, () => {
      const storage = browser.storage[type];
      describe('get', () => {
        expect(jest.isMockFunction(storage.get)).toBe(true);
        test('a string key', (done) => {
          const key = 'test';
          storage.get(key, (result) => {
            expect(result).toStrictEqual({});
            done();
          });
        });
        test('an array key', (done) => {
          const keys = ['test1', 'test2'];
          storage.get(keys, (result) => {
            expect(result).toStrictEqual({});
            done();
          });
        });
        test('an object key', (done) => {
          const key = { test: [] };
          storage.get(key, (result) => {
            expect(result).toStrictEqual({ test: [] });
            done();
          });
        });
        test('a invalid key', () => {
          try {
            storage.get(1, jest.fn());
          } catch (e) {
            expect(e.message).toBe('Wrong key given');
          }
        });
        test('an undefined key', () => {
          return expect(storage.get()).resolves.toEqual({});
        });
        afterEach(() => {
          expect(storage.get).toHaveBeenCalledTimes(1);
          storage.clear();
          storage.get.mockClear();
          storage.set.mockClear();
          storage.remove.mockClear();
          storage.clear.mockClear();
        });
      });
      test('get promise', () => {
        const key = 'key';
        return expect(storage.get(key)).resolves.toEqual({ key: undefined });
      });
      test('getBytesInUse', () => {
        const callback = jest.fn();
        expect(jest.isMockFunction(storage.getBytesInUse)).toBe(true);
        storage.getBytesInUse('key', callback);
        expect(storage.getBytesInUse).toHaveBeenCalledTimes(1);
        expect(callback).toBeCalled();
      });
      test('getBytesInUse promise', () => {
        return expect(storage.getBytesInUse('key')).resolves.toBe(0);
      });
      test('set', () => {
        const callback = jest.fn();
        expect(jest.isMockFunction(storage.set)).toBe(true);
        storage.set({ key: 'foo' }, callback);
        expect(storage.set).toHaveBeenCalledTimes(1);
        expect(callback).toBeCalled();
      });
      test('set promise', () => {
        return expect(storage.set(1)).resolves.toBeUndefined();
      });
      test('remove', () => {
        const callback = jest.fn();
        expect(jest.isMockFunction(storage.remove)).toBe(true);
        storage.remove('key', callback);
        expect(storage.remove).toHaveBeenCalledTimes(1);
        expect(callback).toBeCalled();
      });
      test('remove promise', () => {
        return expect(storage.remove(['foo', 'bar'])).resolves.toBeUndefined();
      });
      test('clear', () => {
        const callback = jest.fn();
        expect(jest.isMockFunction(browser.storage.sync.clear)).toBe(true);
        storage.clear(callback);
        expect(storage.clear).toHaveBeenCalledTimes(1);
        expect(callback).toBeCalled();
      });
      test('clear promise', () => {
        return expect(storage.clear()).resolves.toBeUndefined();
      });
      test('real scenario', (done) => {
        expect(jest.isMockFunction(storage.get)).toBe(true);
        expect(jest.isMockFunction(storage.set)).toBe(true);
        expect(jest.isMockFunction(storage.remove)).toBe(true);
        expect(jest.isMockFunction(storage.clear)).toBe(true);
        // set keys
        storage.set({ key: 'value', foo: 'bar', foo2: 'bar2' }, () => {
          // get 'key'
          storage.get(['key'], (result) => {
            expect(result).toStrictEqual({ key: 'value' });
            // remove 'key'
            storage.remove('key', () => {
              // get all values
              storage.get(null, (result) => {
                expect(result).toStrictEqual({ foo: 'bar', foo2: 'bar2' });
                // clear values
                storage.clear(() => {
                  storage.get(['key', 'foo', 'foo2'], (result) => {
                    expect(result).toStrictEqual({});
                    done();
                  });
                });
              });
            });
          });
        });
      });
      test('onChanged', () => {
        const callback = jest.fn();
        expect(jest.isMockFunction(storage.onChanged.addListener)).toBe(true);
        expect(jest.isMockFunction(storage.onChanged.removeListener)).toBe(
          true
        );
        expect(jest.isMockFunction(storage.onChanged.hasListener)).toBe(true);
        expect(jest.isMockFunction(storage.onChanged.hasListeners)).toBe(true);

        expect(storage.onChanged.hasListeners()).toBe(false);
        expect(storage.onChanged.hasListener(callback)).toBe(false);

        storage.onChanged.addListener(callback);
        expect(storage.onChanged.hasListeners()).toBe(true);
        expect(storage.onChanged.hasListener(callback)).toBe(true);

        storage.onChanged.removeListener(callback);
        expect(storage.onChanged.hasListeners()).toBe(false);
        expect(storage.onChanged.hasListener(callback)).toBe(false);
      });
    });
  });
});
