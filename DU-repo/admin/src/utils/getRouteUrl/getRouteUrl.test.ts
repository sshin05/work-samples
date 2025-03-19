import { getRouteUrl, routeGenerators } from '.';

describe('getRouteUrl', () => {
  it('returns the expected route url without query params', () => {
    const urlArgs = { missionPartnerId: 'test' };
    const url = routeGenerators.CourseMetrics(urlArgs);

    const queryArgs = {};

    const actual = getRouteUrl(url, queryArgs);
    const expected = '/mp/test/course-metrics';

    expect(actual).toBe(expected);
  });

  it('should replace placeholders with urlArgs and queryArgs', () => {
    const urlArgs = { missionPartnerId: 'test' };
    const url = routeGenerators.CourseMetrics(urlArgs);

    const queryArgs = { dog: '123', cat: 'dog' };

    const actual = getRouteUrl(url, queryArgs);
    const expected = '/mp/test/course-metrics?dog=123&cat=dog';

    expect(actual).toBe(expected);
  });
});
