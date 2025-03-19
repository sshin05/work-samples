import { renderHook } from '@@/test-utils';
import { useMutation } from '@apollo/client';
import { useCreateDomain } from './useCreateDomain';

jest.mock('@apollo/client');

describe('useCreateDomain', () => {
  it('should create a domain', () => {
    const mockCreateDomain = jest.fn();
    (useMutation as jest.Mock).mockReturnValue([
      mockCreateDomain,
      { loading: false }
    ]);

    const { result } = renderHook(() => useCreateDomain());

    result.current.createDomain({
      name: 'domainName',
      shortDescription: 'shortDescription',
      description: 'description'
    });

    expect(mockCreateDomain).toHaveBeenCalledWith({
      variables: {
        input: {
          name: 'domainName',
          shortDescription: 'shortDescription',
          description: 'description'
        }
      }
    });
  });
});
