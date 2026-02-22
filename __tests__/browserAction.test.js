describe('browser.browserAction', () => {
  test('disable', () => {
    expect(jest.isMockFunction(browser.browserAction.disable)).toBe(true);
    browser.browserAction.disable();
    expect(browser.browserAction.disable).toHaveBeenCalled();
  });

  test('enable', () => {
    expect(jest.isMockFunction(browser.browserAction.enable)).toBe(true);
    browser.browserAction.enable();
    expect(browser.browserAction.enable).toHaveBeenCalled();
  });

  test('getBadgeBackgroundColor', (done) => {
    const callback = jest.fn(() => done());
    expect(
      jest.isMockFunction(browser.browserAction.getBadgeBackgroundColor)
    ).toBe(true);
    browser.browserAction.getBadgeBackgroundColor({}, callback);
    expect(browser.browserAction.getBadgeBackgroundColor).toHaveBeenCalledTimes(
      1
    );
    expect(callback).toBeCalled();
  });

  test('getBadgeBackgroundColor promise', () => {
    return expect(
      browser.browserAction.getBadgeBackgroundColor({})
    ).resolves.toBeUndefined();
  });

  test('getBadgeText', (done) => {
    const callback = jest.fn(() => done());
    expect(jest.isMockFunction(browser.browserAction.getBadgeText)).toBe(true);
    browser.browserAction.getBadgeText({}, callback);
    expect(browser.browserAction.getBadgeText).toHaveBeenCalledTimes(1);
    expect(callback).toBeCalled();
  });

  test('getBadgeText promise', () => {
    return expect(
      browser.browserAction.getBadgeText({})
    ).resolves.toBeUndefined();
  });

  test('getBadgeTextColor', (done) => {
    const callback = jest.fn(() => done());
    expect(jest.isMockFunction(browser.browserAction.getBadgeTextColor)).toBe(
      true
    );
    browser.browserAction.getBadgeTextColor({}, callback);
    expect(browser.browserAction.getBadgeTextColor).toHaveBeenCalledTimes(1);
    expect(callback).toBeCalled();
  });

  test('getBadgeTextColor promise', () => {
    return expect(
      browser.browserAction.getBadgeTextColor({})
    ).resolves.toBeUndefined();
  });

  test('getPopup', (done) => {
    const callback = jest.fn(() => done());
    expect(jest.isMockFunction(browser.browserAction.getPopup)).toBe(true);
    browser.browserAction.getPopup({}, callback);
    expect(browser.browserAction.getPopup).toHaveBeenCalledTimes(1);
    expect(callback).toBeCalled();
  });

  test('getPopup promise', () => {
    return expect(browser.browserAction.getPopup({})).resolves.toBeUndefined();
  });

  test('getTitle', (done) => {
    const callback = jest.fn(() => done());
    expect(jest.isMockFunction(browser.browserAction.getTitle)).toBe(true);
    browser.browserAction.getTitle({}, callback);
    expect(browser.browserAction.getTitle).toHaveBeenCalledTimes(1);
    expect(callback).toBeCalled();
  });

  test('getTitle promise', () => {
    return expect(browser.browserAction.getTitle({})).resolves.toBeUndefined();
  });

  test('getUserSettings', (done) => {
    const callback = jest.fn(() => done());
    expect(jest.isMockFunction(browser.browserAction.getUserSettings)).toBe(
      true
    );
    browser.browserAction.getUserSettings(callback);
    expect(browser.browserAction.getUserSettings).toHaveBeenCalledTimes(1);
    expect(callback).toBeCalled();
  });

  test('getUserSettings promise', () => {
    return expect(
      browser.browserAction.getUserSettings()
    ).resolves.toBeUndefined();
  });

  test('isEnabled', () => {
    expect(jest.isMockFunction(browser.browserAction.isEnabled)).toBe(true);
    browser.browserAction.isEnabled();
    expect(browser.browserAction.isEnabled).toHaveBeenCalled();
  });

  test('openPopup', () => {
    expect(jest.isMockFunction(browser.browserAction.openPopup)).toBe(true);
    browser.browserAction.openPopup();
    expect(browser.browserAction.openPopup).toHaveBeenCalled();
  });

  test('setBadgeBackgroundColor', () => {
    expect(
      jest.isMockFunction(browser.browserAction.setBadgeBackgroundColor)
    ).toBe(true);
    const details = { color: 'red' };
    browser.browserAction.setBadgeBackgroundColor(details);
    expect(browser.browserAction.setBadgeBackgroundColor).toHaveBeenCalledWith(
      details
    );
  });

  test('setBadgeText', () => {
    expect(jest.isMockFunction(browser.browserAction.setBadgeText)).toBe(true);
    const text = 'BADGE TEXT';
    browser.browserAction.setBadgeText(text);
    expect(browser.browserAction.setBadgeText).toHaveBeenCalledWith(text);
  });

  test('setBadgeTextColor', () => {
    expect(jest.isMockFunction(browser.browserAction.setBadgeTextColor)).toBe(
      true
    );
    const details = { color: 'red' };
    browser.browserAction.setBadgeTextColor(details);
    expect(browser.browserAction.setBadgeTextColor).toHaveBeenCalledWith(
      details
    );
  });

  test('setIcon', () => {
    expect(jest.isMockFunction(browser.browserAction.setIcon)).toBe(true);
    const details = { path: 'icon' };
    browser.browserAction.setIcon(details);
    expect(browser.browserAction.setIcon).toHaveBeenCalledWith(details);
  });

  test('setPopup', () => {
    expect(jest.isMockFunction(browser.browserAction.setPopup)).toBe(true);
    const details = { path: 'icon' };
    browser.browserAction.setPopup(details);
    expect(browser.browserAction.setPopup).toHaveBeenCalledWith(details);
  });

  test('setTitle', () => {
    expect(jest.isMockFunction(browser.browserAction.setTitle)).toBe(true);
    const title = 'TITLE';
    browser.browserAction.setTitle(title);
    expect(browser.browserAction.setTitle).toHaveBeenCalledWith(title);
  });

  test('onClicked.addListener', () => {
    expect(
      jest.isMockFunction(browser.browserAction.onClicked.addListener)
    ).toBe(true);

    browser.browserAction.onClicked.addListener(() => {});
    expect(browser.browserAction.onClicked.addListener).toHaveBeenCalledTimes(
      1
    );
  });

  test('onClicked.removeListener', () => {
    expect(
      jest.isMockFunction(browser.browserAction.onClicked.removeListener)
    ).toBe(true);

    browser.browserAction.onClicked.removeListener(() => {});
    expect(
      browser.browserAction.onClicked.removeListener
    ).toHaveBeenCalledTimes(1);
  });

  test('onClicked.hasListener', () => {
    expect(
      jest.isMockFunction(browser.browserAction.onClicked.hasListener)
    ).toBe(true);

    browser.browserAction.onClicked.hasListener();
    expect(browser.browserAction.onClicked.hasListener).toHaveBeenCalledTimes(
      1
    );
  });
});
