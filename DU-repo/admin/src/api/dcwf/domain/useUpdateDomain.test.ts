import { renderHook } from '@@/test-utils';
import { useMutation } from '@apollo/client';
import { useUpdateDomain } from './useUpdateDomain';

jest.mock('@apollo/client');

describe('useUpdateDomain', () => {
  it('should update a domain', () => {
    const mockUpdateDomain = jest.fn();
    (useMutation as jest.Mock).mockReturnValue([
      mockUpdateDomain,
      { loading: false }
    ]);

    const { result } = renderHook(() => useUpdateDomain());

    result.current.updateDomain('domainId', {
      name: 'domainName',
      shortDescription: 'shortDescription',
      description: 'description'
    });

    expect(mockUpdateDomain).toHaveBeenCalledWith({
      variables: {
        updateDomainId: 'domainId',
        input: {
          name: 'domainName',
          shortDescription: 'shortDescription',
          description: 'description'
        }
      }
    });
  });
});
