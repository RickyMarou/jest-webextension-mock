describe('browser.pageAction', () => {
  test('getPopup', (done) => {
    const callback = jest.fn(() => done());
    expect(jest.isMockFunction(browser.pageAction.getPopup)).toBe(true);
    browser.pageAction.getPopup({}, callback);
    expect(browser.pageAction.getPopup).toHaveBeenCalledTimes(1);
    expect(callback).toBeCalled();
  });

  test('getPopup promise', () => {
    return expect(browser.pageAction.getPopup({})).resolves.toBeUndefined();
  });

  test('getTitle', (done) => {
    const callback = jest.fn(() => done());
    expect(jest.isMockFunction(browser.pageAction.getTitle)).toBe(true);
    browser.pageAction.getTitle({}, callback);
    expect(browser.pageAction.getTitle).toHaveBeenCalledTimes(1);
    expect(callback).toBeCalled();
  });

  test('getTitle promise', () => {
    return expect(browser.pageAction.getTitle({})).resolves.toBeUndefined();
  });

  test('hide', () => {
    expect(jest.isMockFunction(browser.pageAction.hide)).toBe(true);
    browser.pageAction.hide();
    expect(browser.pageAction.hide).toHaveBeenCalled();
  });

  test('isShown', () => {
    expect(jest.isMockFunction(browser.pageAction.isShown)).toBe(true);
    browser.pageAction.isShown();
    expect(browser.pageAction.isShown).toHaveBeenCalled();
  });

  test('openPopup', () => {
    expect(jest.isMockFunction(browser.pageAction.openPopup)).toBe(true);
    browser.pageAction.openPopup();
    expect(browser.pageAction.openPopup).toHaveBeenCalled();
  });

  test('setIcon', () => {
    expect(jest.isMockFunction(browser.pageAction.setIcon)).toBe(true);
    const details = { path: 'icon' };
    browser.pageAction.setIcon(details);
    expect(browser.pageAction.setIcon).toHaveBeenCalledWith(details);
  });

  test('setPopup', () => {
    expect(jest.isMockFunction(browser.pageAction.setPopup)).toBe(true);
    const details = { path: 'icon' };
    browser.pageAction.setPopup(details);
    expect(browser.pageAction.setPopup).toHaveBeenCalledWith(details);
  });

  test('setTitle', () => {
    expect(jest.isMockFunction(browser.pageAction.setTitle)).toBe(true);
    const title = 'TITLE';
    browser.pageAction.setTitle(title);
    expect(browser.pageAction.setTitle).toHaveBeenCalledWith(title);
  });

  test('show', () => {
    expect(jest.isMockFunction(browser.pageAction.show)).toBe(true);
    browser.pageAction.show();
    expect(browser.pageAction.show).toHaveBeenCalled();
  });

  test('onClicked.addListener', () => {
    expect(jest.isMockFunction(browser.pageAction.onClicked.addListener)).toBe(
      true
    );

    browser.pageAction.onClicked.addListener(() => {});
    expect(browser.pageAction.onClicked.addListener).toHaveBeenCalledTimes(1);
  });

  test('onClicked.removeListener', () => {
    expect(
      jest.isMockFunction(browser.pageAction.onClicked.removeListener)
    ).toBe(true);

    browser.pageAction.onClicked.removeListener(() => {});
    expect(browser.pageAction.onClicked.removeListener).toHaveBeenCalledTimes(
      1
    );
  });

  test('onClicked.hasListener', () => {
    expect(jest.isMockFunction(browser.pageAction.onClicked.hasListener)).toBe(
      true
    );

    browser.pageAction.onClicked.hasListener();
    expect(browser.pageAction.onClicked.hasListener).toHaveBeenCalledTimes(1);
  });
});
