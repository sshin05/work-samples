import { renderHook } from '@@/test-utils';
import { useQuery } from '@apollo/client';
import { useGetKsat } from './useGetKsat';
import type { Ksat, KsatType } from '@/api/codegen/graphql';

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(),
  gql: jest.fn()
}));

const mockKsat: Ksat = {
  id: 'some-valid-id',
  ksatType: 'Skill' as KsatType,
  description: 'description',
  code: '3A'
};

const mockKsatData = {
  getKsat: mockKsat
};

describe('useGetKsat', () => {
  it('should return data', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: undefined,
      data: mockKsatData
    });

    const { result } = renderHook(() =>
      useGetKsat({ getKsatId: 'some-valid-id' })
    );

    const { ksat, ksatLoading, ksatError } = result.current;

    expect(ksat).toEqual(mockKsat);
    expect(ksatLoading).toEqual(false);
    expect(ksatError).toBeUndefined();
  });
});
