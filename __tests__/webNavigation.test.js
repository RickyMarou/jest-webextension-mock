describe('browser.webNavigation', () => {
  const events = [
    'onBeforeNavigate',
    'onCommitted',
    'onDOMContentLoaded',
    'onCompleted',
    'onErrorOccurred',
    'onCreatedNavigationTarget',
    'onReferenceFragmentUpdated',
    'onTabReplaced',
    'onHistoryStateUpdated',
  ];

  events.forEach((event) => {
    describe(event, () => {
      const listener = () => {};

      afterEach(() => {
        chrome.webNavigation[event].removeListener(listener);
      });

      test('addListener / hasListener / removeListener', () => {
        const e = chrome.webNavigation[event];
        expect(jest.isMockFunction(e.addListener)).toBe(true);
        expect(jest.isMockFunction(e.removeListener)).toBe(true);
        expect(jest.isMockFunction(e.hasListener)).toBe(true);
        expect(jest.isMockFunction(e.hasListeners)).toBe(true);

        expect(e.hasListeners()).toBe(false);
        expect(e.hasListener(listener)).toBe(false);

        e.addListener(listener);
        expect(e.hasListeners()).toBe(true);
        expect(e.hasListener(listener)).toBe(true);

        e.removeListener(listener);
        expect(e.hasListeners()).toBe(false);
        expect(e.hasListener(listener)).toBe(false);
      });
    });
  });

  describe('getFrame', () => {
    test('is a mock function', () => {
      expect(jest.isMockFunction(chrome.webNavigation.getFrame)).toBe(true);
    });
    test('accepts a callback', () => {
      const callback = jest.fn();
      chrome.webNavigation.getFrame({ tabId: 1, frameId: 0 }, callback);
      expect(callback).toHaveBeenCalledWith(null);
    });
    test('returns a promise', () => {
      return expect(
        chrome.webNavigation.getFrame({ tabId: 1, frameId: 0 })
      ).resolves.toBeNull();
    });
  });

  describe('getAllFrames', () => {
    test('is a mock function', () => {
      expect(jest.isMockFunction(chrome.webNavigation.getAllFrames)).toBe(true);
    });
    test('accepts a callback', () => {
      const callback = jest.fn();
      chrome.webNavigation.getAllFrames({ tabId: 1 }, callback);
      expect(callback).toHaveBeenCalledWith([]);
    });
    test('returns a promise', () => {
      return expect(
        chrome.webNavigation.getAllFrames({ tabId: 1 })
      ).resolves.toEqual([]);
    });
  });
});
