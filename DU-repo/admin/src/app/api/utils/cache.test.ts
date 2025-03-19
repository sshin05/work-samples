import { cache } from './cache';

describe('cache tests', () => {
  it('should get', async () => {
    cache(
      () => {
        return {
          method: 'GET',
          route: '/test',
          name: 'test'
        };
      },
      {
        noCache: false,
        forceFetch: false
      }
    );

    const result1 = await cache(
      () => {
        return {
          method: 'GET',
          route: '/test',
          name: 'test'
        };
      },
      {
        noCache: false,
        forceFetch: false
      }
    );

    await cache(
      () => {
        return {
          method: 'GET',
          route: '/test',
          name: 'test'
        };
      },
      {
        noCache: true,
        forceFetch: true
      }
    );

    expect(result1).toBeDefined();
  });

  it('should post', async () => {
    const result1 = await cache(
      () => {
        return {
          method: 'POST',
          route: '/test',
          name: 'test',
          invalidatesRoutes: ['/test']
        };
      },
      {
        noCache: false,
        forceFetch: true
      }
    );

    expect(result1).toBeDefined();
  });
});
