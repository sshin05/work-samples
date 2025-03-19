import { formatLocationType } from './formatLocationType';
import { LocationTypes } from './formatLocationType.types';

describe('formatLocationType', () => {
  it.each(Object.keys(LocationTypes))(
    'returns the expected location display value',
    locationType => {
      expect(formatLocationType(locationType)).toBe(
        LocationTypes[locationType]
      );
    }
  );

  it('returns an empty string for an unknown location type', () => {
    expect(formatLocationType('__MOCK_UNKNOWN_LOCATION_TYPE__')).toBe('');
  });
});
