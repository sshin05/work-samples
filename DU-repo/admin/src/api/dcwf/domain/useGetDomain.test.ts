import { renderHook } from '@@/test-utils';
import { useQuery } from '@apollo/client';
import { useGetDomain } from './useGetDomain';
import type { Domain } from '@/api/codegen/graphql';

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(),
  gql: jest.fn()
}));

const mockDomain: Domain = {
  id: 'some-valid-id',
  name: 'Collaboration',
  shortDescription: 'Biz School',
  description:
    'This "business school" style unit focuses on how to be a good partner to members of internal and external teams'
};

const mockDomainData = {
  getDomain: mockDomain
};

describe('useGetDomain', () => {
  it('should return data', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: undefined,
      data: mockDomainData
    });

    const { result } = renderHook(() =>
      useGetDomain({ getDomainId: 'some-valid-id' })
    );

    const { domain, domainLoading, domainError } = result.current;

    expect(domain).toEqual(mockDomain);
    expect(domainLoading).toEqual(false);
    expect(domainError).toBeUndefined();
  });
});
