describe('browser.action', () => {
  test('matches browserAction', () => {
    expect(browser.action).toBe(browser.browserAction);
  });
});
