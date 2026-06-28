describe('chrome.contextMenus', () => {
  beforeEach(() => {
    chrome.contextMenus.create.mockClear();
    chrome.contextMenus.update.mockClear();
    chrome.contextMenus.remove.mockClear();
    chrome.contextMenus.removeAll.mockClear();
    chrome.contextMenus.refresh.mockClear();
  });

  test('is aliased as menus for Firefox', () => {
    expect(chrome.menus).toBe(chrome.contextMenus);
    expect(browser.menus).toBe(browser.contextMenus);
  });

  test('exposes ACTION_MENU_TOP_LEVEL_LIMIT', () => {
    expect(typeof chrome.contextMenus.ACTION_MENU_TOP_LEVEL_LIMIT).toBe(
      'number'
    );
  });

  describe('create', () => {
    test('is a mock function', () => {
      expect(jest.isMockFunction(chrome.contextMenus.create)).toBe(true);
    });
    test('returns the provided id', () => {
      const id = chrome.contextMenus.create({ id: 'my-item', title: 'Hi' });
      expect(id).toBe('my-item');
    });
    test('generates an id when none is provided', () => {
      const id = chrome.contextMenus.create({ title: 'Hi' });
      expect(typeof id).toBe('string');
      expect(id.length).toBeGreaterThan(0);
    });
    test('invokes the callback when given', () => {
      const callback = jest.fn();
      chrome.contextMenus.create({ title: 'Hi' }, callback);
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    test('is a mock function', () => {
      expect(jest.isMockFunction(chrome.contextMenus.update)).toBe(true);
    });
    test('accepts a callback', () => {
      const callback = jest.fn();
      chrome.contextMenus.update('id', { title: 'New' }, callback);
      expect(callback).toHaveBeenCalledTimes(1);
    });
    test('returns a promise', () => {
      return expect(
        chrome.contextMenus.update('id', { title: 'New' })
      ).resolves.toBeUndefined();
    });
  });

  describe('remove', () => {
    test('is a mock function', () => {
      expect(jest.isMockFunction(chrome.contextMenus.remove)).toBe(true);
    });
    test('accepts a callback', () => {
      const callback = jest.fn();
      chrome.contextMenus.remove('id', callback);
      expect(callback).toHaveBeenCalledTimes(1);
    });
    test('returns a promise', () => {
      return expect(chrome.contextMenus.remove('id')).resolves.toBeUndefined();
    });
  });

  describe('removeAll', () => {
    test('is a mock function', () => {
      expect(jest.isMockFunction(chrome.contextMenus.removeAll)).toBe(true);
    });
    test('accepts a callback', () => {
      const callback = jest.fn();
      chrome.contextMenus.removeAll(callback);
      expect(callback).toHaveBeenCalledTimes(1);
    });
    test('returns a promise', () => {
      return expect(chrome.contextMenus.removeAll()).resolves.toBeUndefined();
    });
  });

  describe('refresh (Firefox)', () => {
    test('returns a promise', () => {
      return expect(chrome.contextMenus.refresh()).resolves.toBeUndefined();
    });
  });

  ['onClicked', 'onShown', 'onHidden'].forEach((event) => {
    describe(event, () => {
      const listener = () => {};

      afterEach(() => {
        chrome.contextMenus[event].removeListener(listener);
      });

      test('addListener / hasListener / removeListener', () => {
        const e = chrome.contextMenus[event];
        expect(jest.isMockFunction(e.addListener)).toBe(true);

        expect(e.hasListeners()).toBe(false);
        e.addListener(listener);
        expect(e.hasListener(listener)).toBe(true);
        expect(e.hasListeners()).toBe(true);

        e.removeListener(listener);
        expect(e.hasListener(listener)).toBe(false);
      });
    });
  });
});
