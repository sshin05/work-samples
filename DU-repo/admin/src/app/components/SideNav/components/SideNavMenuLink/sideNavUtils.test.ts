import { isSelectedLink } from './sideNavUtils';

jest.mock('@/app/components/utils/normalizePathname', () => ({
  normalizePathname: jest.fn(path => path)
}));
jest.mock('@/app/constants/missionPartnerIdConstants', () => ({
  MISSION_PARTNER_ID_PATTERN: 'mp-id-pattern'
}));

describe('isSelectedLink', () => {
  describe('mission partner paths', () => {
    it('should return true for matching normalized paths', () => {
      const pathname = '/mp/mp-id-pattern/dashboard';
      const href = '/mp/mp-id-pattern/dashboard';
      expect(isSelectedLink(pathname, href)).toBe(true);
    });

    it('should return false for non-matching normalized paths', () => {
      const pathname = '/mp/mp-id-pattern/dashboard';
      const href = '/mp/mp-id-pattern/settings';
      expect(isSelectedLink(pathname, href)).toBe(false);
    });

    it('should handle shared dashboard paths', () => {
      const courseMetricsPath = '/mp/mp-id-pattern/plan-metrics';
      const planMetricsPath = '/mp/mp-id-pattern/plan-metrics';
      const href = '/mp/mp-id-pattern';
      expect(isSelectedLink(courseMetricsPath, href)).toBe(true);
      expect(isSelectedLink(planMetricsPath, href)).toBe(true);
    });

    it('should match portal-manager to settings', () => {
      const pathname = '/mp/mp-id-pattern/portal-manager';
      const href = '/mp/mp-id-pattern/settings';
      expect(isSelectedLink(pathname, href)).toBe(true);
    });

    it('should match learner to learners', () => {
      const pathname = '/mp/mp-id-pattern/learner';
      const href = '/mp/mp-id-pattern/learners';
      expect(isSelectedLink(pathname, href)).toBe(true);
    });

    it('should match curriculum-catalog to training', () => {
      const pathname = '/mp/mp-id-pattern/curriculum-catalog';
      const href = '/mp/mp-id-pattern/training';
      expect(isSelectedLink(pathname, href)).toBe(true);
    });
  });

  describe('system admin paths', () => {
    it('should return true for matching sys paths', () => {
      const pathname = '/sys/settings';
      const href = '/sys/settings';
      expect(isSelectedLink(pathname, href)).toBe(true);
    });

    it('should return false for non-matching sys paths', () => {
      const pathname = '/sys/settings';
      const href = '/sys/licenses';
      expect(isSelectedLink(pathname, href)).toBe(false);
    });
  });
});
