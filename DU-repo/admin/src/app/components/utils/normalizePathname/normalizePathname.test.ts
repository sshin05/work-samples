import { normalizePathname } from './normalizePathname';

describe('normalizePathname', () => {
  test('removes query parameters', () => {
    expect(normalizePathname('/path?query=123')).toBe('/path');
  });

  test('removes hash fragments', () => {
    expect(normalizePathname('/path#section')).toBe('/path');
  });

  test('removes both query and hash', () => {
    expect(normalizePathname('/path?query=123#section')).toBe('/path');
  });

  test('converts to lowercase', () => {
    expect(normalizePathname('/Path/To/Resource')).toBe('/path/to/resource');
  });

  test('handles empty path', () => {
    expect(normalizePathname('')).toBe('');
  });

  test('handles paths without query or hash', () => {
    expect(normalizePathname('/simple/path')).toBe('/simple/path');
  });
});
