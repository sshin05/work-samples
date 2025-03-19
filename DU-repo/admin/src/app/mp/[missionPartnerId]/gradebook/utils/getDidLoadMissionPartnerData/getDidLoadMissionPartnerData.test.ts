import { getDidLoadMissionPartnerData } from './getDidLoadMissionPartnerData';
import type { GetDidLoadMissionPartnerDataArgs } from './getDidLoadMissionPartnerData.types';

describe('getDidLoadMissionPartnerData', () => {
  /** Arguments required to return `true` from function invocation */
  const successData: GetDidLoadMissionPartnerDataArgs = {
    isLoading: false,
    hasData: false
  };

  it('returns true when not loading and when the data is missing', () => {
    expect(getDidLoadMissionPartnerData(successData)).toBe(true);
  });

  it('returns false when loading', () => {
    const data = {
      ...successData,
      isLoading: true
    };

    expect(getDidLoadMissionPartnerData(data)).toBe(false);
  });

  it('returns false when not loading and when it has data', () => {
    const data = {
      ...successData,
      hasData: true
    };

    expect(getDidLoadMissionPartnerData(data)).toBe(false);
  });
});
