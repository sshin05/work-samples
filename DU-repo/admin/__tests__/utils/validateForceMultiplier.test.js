import validateForceMultiplier from '@/utils/validate-force-multiplier';

describe('test for validateForceMultiplier', () => {
  test('returns errors for missing or invalid data', () => {
    const forceMultiplier = {
      content: {
        description: '',
        summary: null,
        about: {
          title: null,
          description: undefined,
          image: null
        }
      },
      items: []
    };

    const errors = validateForceMultiplier(forceMultiplier);

    expect(errors).toContain('Marketing content is required');
    expect(errors).toContain('Summary is required');
    expect(errors).toContain('Marketing content is required');
    expect(errors).toContain('Marketing content is required');
    expect(errors).toContain('Marketing content is required');
    expect(errors).toContain('Marketing content is required');
    expect(errors).toContain('Training items are required');
  });
});
