import { getRouteBackground } from './getRouteBackground';

const VALID_UUID = '123e4567-e89b-12d3-a456-426614174000';

describe('getRouteBackground', () => {
  it('should return "dashboard" if the route does not match the regex', () => {
    expect(getRouteBackground('/invalid-route')).toBe('dashboard');
  });

  it('should return "mission-partners" if the route is /mp', () => {
    expect(getRouteBackground('/mp')).toBe('mission-partners');
  });

  it('should return "dashboard" if the route matches but basePath is not defined', () => {
    expect(getRouteBackground(`/mp/${VALID_UUID}`)).toBe('dashboard');
    expect(getRouteBackground(`/mp/${VALID_UUID}/`)).toBe('dashboard');
  });

  it('should return the expected background for a deep path', () => {
    const deepPath =
      '/mp/123e4567-e89b-12d3-a456-426614174000/settings/subpath/123e4567-e89b-12d3-a456-42661417475d/one/two/three/whatever';
    expect(getRouteBackground(deepPath)).toBe('settings');
  });

  it('should return "learners" if the basePath is "learner"', () => {
    expect(getRouteBackground(`/mp/${VALID_UUID}/learner`)).toBe('learners');
  });

  it('should return "settings" if the basePath is "portal-manager"', () => {
    expect(getRouteBackground(`/mp/${VALID_UUID}/portal-manager`)).toBe(
      'settings'
    );
  });

  it('should return the basePath if it is defined and not "learner"', () => {
    expect(getRouteBackground(`/mp/${VALID_UUID}/reporting-admin`)).toBe(
      'reporting-admin'
    );
    expect(getRouteBackground(`/mp/${VALID_UUID}/settings`)).toBe('settings');
  });

  it('should return "dashboard" for a route with an invalid UUID', () => {
    expect(getRouteBackground('/mp/invalid-uuid/learner')).toBe('dashboard');
    expect(getRouteBackground('/mp/1234/learner')).toBe('dashboard');
  });

  it.each([
    `/mp/${VALID_UUID}/custom-training/${VALID_UUID}/whatever/curriculum-catalog`,
    `/marketplace`
  ])('handles routes without backgrounds: $route', route => {
    expect(getRouteBackground(route)).toBe('');
  });

  it('should return "trial-expired" if the basePath is "trial-expired"', () => {
    const VALID_UUID = '123e4567-e89b-12d3-a456-426614174000';
    expect(getRouteBackground(`/mp/${VALID_UUID}/trial-expired`)).toBe(
      'trial-expired'
    );
  });
});
