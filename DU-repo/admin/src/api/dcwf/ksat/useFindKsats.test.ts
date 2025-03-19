import { renderHook } from '@@/test-utils';
import { useQuery } from '@apollo/client';
import { useFindKsats } from './useFindKsats';

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(),
  gql: jest.fn()
}));

const mockKsat = {
  id: '06aa4d38-8b42-4382-8796-bc01157268fe',
  ksatType: 'Skill',
  code: '3A'
};

const mockKsatData = {
  findKsats: {
    data: [mockKsat],
    total: 1
  }
};

describe('useFindKsats', () => {
  it('should return data', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: undefined,
      data: mockKsatData
    });

    const { result } = renderHook(() =>
      useFindKsats({ pageSize: 25, pageNumber: 1 })
    );

    const { ksats, ksatsTotal, ksatsLoading, ksatsError } = result.current;

    expect(ksats).toEqual([mockKsat]);
    expect(ksatsTotal).toEqual(1);
    expect(ksatsLoading).toEqual(false);
    expect(ksatsError).toBeUndefined();
  });
});
