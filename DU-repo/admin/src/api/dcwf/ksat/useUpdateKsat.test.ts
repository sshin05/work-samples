import { renderHook } from '@@/test-utils';
import { useMutation } from '@apollo/client';
import { useUpdateKsat } from './useUpdateKsat';
import type { KsatType } from '@/api/codegen/graphql';

jest.mock('@apollo/client');

describe('useUpdateKsat', () => {
  it('should update a ksat', () => {
    const mockUpdateKsat = jest.fn();
    (useMutation as jest.Mock).mockReturnValue([
      mockUpdateKsat,
      { loading: false }
    ]);

    const { result } = renderHook(() => useUpdateKsat());

    result.current.updateKsat('ksatId', {
      ksatType: 'Skill' as KsatType,
      description: 'description',
      code: '3A'
    });

    expect(mockUpdateKsat).toHaveBeenCalledWith({
      variables: {
        updateKsatId: 'ksatId',
        input: {
          ksatType: 'Skill',
          description: 'description',
          code: '3A'
        }
      }
    });
  });
});
