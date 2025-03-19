import React from 'react';
import { renderV3, screen } from '@@/test-utils';
import { ProgramLink } from './ProgramLink';
import {
  DEFAULT_DU_LOGO_PATH,
  missionPartnerLogoMap
} from './programLinkConsts';

jest.mock('@cerberus/styled-system/patterns', () => ({
  flex: jest.fn(() => 'mock-flex-class'),
  vstack: jest.fn(() => 'mock-vstack-class'),
  animateIn: jest.fn(() => 'mock-animate-in')
}));

const PROGRAM_NAME = 'Awesome Program';
const TAG_NAME = 'Trial Phase';
const HREF = '/program/test';
const AFFILIATE_ID = 'air-force';
const LOGO_URL = '/path/to/image';

describe('ProgramLink', () => {
  const defaultProps = {
    href: HREF,
    tagName: TAG_NAME,
    programName: PROGRAM_NAME,
    affiliateId: AFFILIATE_ID,
    logoUrl: LOGO_URL
  };

  describe('Basic Render', () => {
    it('renders the happy path', () => {
      renderV3(<ProgramLink {...defaultProps} />);

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', HREF);

      const logo = screen.getByAltText('Mission Partner Logo');
      expect(logo).toBeInTheDocument();

      const programName = screen.getByText(PROGRAM_NAME);
      expect(programName).toBeInTheDocument();

      const tagName = screen.getByText(TAG_NAME);
      expect(tagName).toBeInTheDocument();

      const chevronIcon = screen.getByRole('img', { hidden: true });
      expect(chevronIcon).toBeInTheDocument();
    });
  });

  describe('Logo', () => {
    it('falls back to the affiliate logo when no logoUrl is provided', () => {
      const propsWithoutLogoURL = { ...defaultProps, logoUrl: undefined };
      renderV3(<ProgramLink {...propsWithoutLogoURL} />);

      const logo = screen.getByAltText('Mission Partner Logo');
      const srcAttribute = logo.getAttribute('src');
      const decodedSrc = decodeURIComponent(srcAttribute);

      expect(decodedSrc).toContain('air-force');
    });

    it('falls back to the default logo with incorrect affiliateID and no logoUrl', () => {
      const propsWithoutLogoURLBadAffiliateID = {
        ...defaultProps,
        affiliateId: 'starship-troopers',
        logoUrl: undefined
      };
      renderV3(<ProgramLink {...propsWithoutLogoURLBadAffiliateID} />);

      const logo = screen.getByAltText('Mission Partner Logo');
      const srcAttribute = logo.getAttribute('src');
      const decodedSrc = decodeURIComponent(srcAttribute);

      expect(decodedSrc).toContain(DEFAULT_DU_LOGO_PATH);
    });
  });

  describe('Mission Partner Logo Map', () => {
    it('returns the correct logo URL for "army" affiliate', () => {
      const result = missionPartnerLogoMap('army');
      expect(result).toBe('/admin/images/affiliates/army.png');
    });

    it('returns the correct logo URL for "dod" affiliate', () => {
      const result = missionPartnerLogoMap('dod');
      expect(result).toBe('/admin/images/affiliates/dod.png');
    });

    it('returns the correct logo URL for "air-force" affiliate', () => {
      const result = missionPartnerLogoMap('air-force');
      expect(result).toBe('/admin/images/affiliates/air-force.png');
    });

    it('returns the correct logo URL for "space-force" affiliate', () => {
      const result = missionPartnerLogoMap('space-force');
      expect(result).toBe('/admin/images/affiliates/space-force.png');
    });

    it('returns the correct logo URL for "coast-guard" affiliate', () => {
      const result = missionPartnerLogoMap('coast-guard');
      expect(result).toBe(DEFAULT_DU_LOGO_PATH);
    });

    it('returns the default logo URL for an unknown affiliate', () => {
      const result = missionPartnerLogoMap(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        'starship-troopers' as unknown as any
      );
      expect(result).toBe(DEFAULT_DU_LOGO_PATH);
    });
  });
});
