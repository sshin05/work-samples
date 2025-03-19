describe('Timezones', () => {
  it('should always be America/Denver', () => {
    const americaDenverTzOffset = 420;

    expect(new Date().getTimezoneOffset()).toBe(americaDenverTzOffset);
  });
});
