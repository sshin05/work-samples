import { durationToString } from '@/utils/string/durationToString';

describe('utils - durationToString', () => {
  it('should return the string as is', () => {
    expect(durationToString(0)).toEqual('0 Minutes');
    expect(durationToString(1)).toEqual('1 Minute');
    expect(durationToString(30)).toEqual('30 Minutes');
  });
  it('should return the string formatted as X Hours Y Minutes', () => {
    expect(durationToString(75)).toEqual('1 Hour 15 Minutes');
    expect(durationToString(150)).toEqual('2 Hours 30 Minutes');
  });
});
