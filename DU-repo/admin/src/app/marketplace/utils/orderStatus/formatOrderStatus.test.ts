import { formatOrderStatus } from './formatOrderStatus';

describe('formatOrderStatus', () => {
  it('should return "Ready for Payment" for status "READY_FOR_PAYMENT"', () => {
    expect(formatOrderStatus('READY_FOR_PAYMENT')).toBe('Ready for Payment');
  });

  it('should return "In Contracting" for status "READY_FOR_PAYMENT"', () => {
    expect(formatOrderStatus('IN_CONTRACTING')).toBe('In Contracting');
  });

  it('should return "Pending" for status "PROCESSING"', () => {
    expect(formatOrderStatus('PROCESSING')).toBe('Pending');
  });

  it('should return "Paid" for status "PAID"', () => {
    expect(formatOrderStatus('PAID')).toBe('Paid');
  });

  it('should return "Cancelled" for status "CANCELLED"', () => {
    expect(formatOrderStatus('CANCELLED')).toBe('Cancelled');
  });

  it('should return "Refunded" for status "REFUNDED"', () => {
    expect(formatOrderStatus('REFUNDED')).toBe('Refunded');
  });

  it('should return the original status for unknown status', () => {
    expect(formatOrderStatus('UNKNOWN_STATUS')).toBe('UNKNOWN_STATUS');
  });
});
