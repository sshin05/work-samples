import { buildDescribeByText } from './buildDescribeByText';

describe('buildDescribeByText utility', () => {
  it('returns empty string when no helpText or errorMessage is provided', () => {
    const result = buildDescribeByText('field-id');
    expect(result).toBe('');
  });

  it('returns only helpText id when helpText is provided', () => {
    const result = buildDescribeByText('field-id', 'Some help text');
    expect(result).toBe('help:field-id');
  });

  it('returns only errorMessage id when errorMessage is provided', () => {
    const result = buildDescribeByText(
      'field-id',
      undefined,
      'An error occurred'
    );
    expect(result).toBe('error:field-id');
  });

  it('returns both helpText and errorMessage ids when both are provided', () => {
    const result = buildDescribeByText(
      'field-id',
      'Some help text',
      'An error occurred'
    );
    expect(result).toBe('help:field-id error:field-id');
  });

  it('handles empty strings correctly', () => {
    const result = buildDescribeByText('field-id', '', '');
    expect(result).toBe('');
  });
});
