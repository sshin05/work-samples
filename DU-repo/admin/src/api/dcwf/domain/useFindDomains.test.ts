import { renderHook } from '@@/test-utils';
import { useQuery } from '@apollo/client';
import { useFindDomains } from './useFindDomains';

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(),
  gql: jest.fn()
}));

const mockDomain = {
  id: '06aa4d38-8b42-4382-8796-bc01157268fe',
  name: 'Collaboration',
  shortDescription: 'Biz School',
  description:
    'This "business school" style unit focuses on how to be a good partner to members of internal and external teams'
};

const mockDomainData = {
  findDomains: {
    data: [mockDomain],
    total: 1
  }
};

describe('useFindDomains', () => {
  it('should return data', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: undefined,
      data: mockDomainData
    });

    const { result } = renderHook(() =>
      useFindDomains({ pageSize: 25, pageNumber: 1 })
    );

    const { domains, domainsTotal, domainsLoading, domainsError } =
      result.current;

    expect(domains).toEqual([mockDomain]);
    expect(domainsTotal).toEqual(1);
    expect(domainsLoading).toEqual(false);
    expect(domainsError).toBeUndefined();
  });
});
