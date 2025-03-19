import { renderHook } from '@@/test-utils';
import { useMutation } from '@apollo/client';
import type { KsatType } from '@/api/codegen/graphql';
import { useCreateKsat } from './useCreateKsat';

jest.mock('@apollo/client');

describe('useCreateKsat', () => {
  it('should create a ksat', () => {
    const mockCreateKsat = jest.fn();
    (useMutation as jest.Mock).mockReturnValue([
      mockCreateKsat,
      { loading: false }
    ]);

    const { result } = renderHook(() => useCreateKsat());

    result.current.createKsat({
      ksatType: 'Skill' as KsatType,
      description: 'Some description',
      code: '3A'
    });

    expect(mockCreateKsat).toHaveBeenCalledWith({
      variables: {
        input: {
          ksatType: 'Skill',
          description: 'Some description',
          code: '3A'
        }
      }
    });
  });
});
