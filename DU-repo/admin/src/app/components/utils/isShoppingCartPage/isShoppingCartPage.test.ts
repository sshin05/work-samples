import { isShoppingCartPage } from './isShoppingCartPage';

describe('isShoppingCartPage', () => {
  it('should return true for valid dashboard URL', () => {
    expect(
      isShoppingCartPage(
        '/mp/123e4567-e89b-12d3-a456-426614174000/curriculum-catalog'
      )
    ).toBe(true);
  });

  it('should return false for invalid dashboard URLs', () => {
    const invalidUrls = ['/mp/550e8400-e29b-41d4-a716-446655440000/', '/mp/'];

    invalidUrls.forEach(url => {
      expect(isShoppingCartPage(url)).toBe(false);
    });
  });

  it('should handle URLs with query parameters', () => {
    expect(
      isShoppingCartPage(
        '/mp/123e4567-e89b-12d3-a456-426614174000/curriculum-catalog?param=value&param2=value2'
      )
    ).toBe(true);
  });
});
