import config from '../next.config';

describe('next config', () => {
  it('should exist', () => {
    expect(config.distDir).toBeDefined();
    expect(config.reactStrictMode).toBeDefined();
    expect(config.basePath).toBeDefined();
    expect(config.headers).toBeInstanceOf(Function);
  });
});
