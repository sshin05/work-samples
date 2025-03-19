import { getMissionPartnerIdFromUrl } from './getMissionPartnerIdFromUrl';

describe('getMissionPartnerIdFromUrl', () => {
  it('should return the mission partner ID when "mp" is present in the URL', () => {
    const url = 'https://example.com/path/to/mp/12345/details';
    const result = getMissionPartnerIdFromUrl(url);
    expect(result).toBe('12345');
  });

  it('should return null when "mp" is not present in the URL', () => {
    const url = 'https://example.com/path/to/partner/12345/details';
    const result = getMissionPartnerIdFromUrl(url);
    expect(result).toBeNull();
  });

  it('should return null when "mp" is the last segment in the URL', () => {
    const url = 'https://example.com/path/to/mp';
    const result = getMissionPartnerIdFromUrl(url);
    expect(result).toBeNull();
  });

  it('should return the correct mission partner ID when "mp" is in the middle of the URL', () => {
    const url = 'https://example.com/mp/12345/path/to/details';
    const result = getMissionPartnerIdFromUrl(url);
    expect(result).toBe('12345');
  });

  it('should return null for an empty URL', () => {
    const url = '';
    const result = getMissionPartnerIdFromUrl(url);
    expect(result).toBeNull();
  });
});
