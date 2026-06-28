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

      test('addListener accepts an optional URL filter', () => {
        const e = chrome.webNavigation[event];
        const filter = { url: [{ hostContains: 'example.com' }] };

        e.addListener(listener, filter);
        expect(e.addListener).toHaveBeenCalledWith(listener, filter);
        expect(e.hasListener(listener)).toBe(true);
      });
    });
  });

  describe('getFrame', () => {
    test('is a mock function', () => {
      expect(jest.isMockFunction(browser.webNavigation.getFrame)).toBe(true);
    });
    test('accepts a callback and passes it the result', () => {
      const callback = jest.fn();
      browser.webNavigation.getFrame({ tabId: 1, frameId: 0 }, callback);
      expect(callback).toHaveBeenCalledWith(null);
    });
    test('returns a promise when no callback is given', () => {
      const result = browser.webNavigation.getFrame({ tabId: 1, frameId: 0 });
      expect(result).toBeInstanceOf(Promise);
      return expect(result).resolves.toBeNull();
    });
  });

  describe('getAllFrames', () => {
    test('is a mock function', () => {
      expect(jest.isMockFunction(browser.webNavigation.getAllFrames)).toBe(
        true
      );
    });
    test('accepts a callback and passes it the result', () => {
      const callback = jest.fn();
      browser.webNavigation.getAllFrames({ tabId: 1 }, callback);
      expect(callback).toHaveBeenCalledWith([]);
    });
    test('returns a promise when no callback is given', () => {
      const result = browser.webNavigation.getAllFrames({ tabId: 1 });
      expect(result).toBeInstanceOf(Promise);
      return expect(result).resolves.toEqual([]);
    });
  });
});
