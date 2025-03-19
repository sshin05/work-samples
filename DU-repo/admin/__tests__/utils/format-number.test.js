import { formatNumber } from '@/utils/format-number';

describe('format number', () => {
  it('should format a number to string', () => {
    const number = formatNumber(2534);
    expect(number).toEqual('2,534');
  });
});
