import * as React from 'react';
import { render } from '@testing-library/react';
import { useQuery } from '@apollo/client';
import { useFindAllAffiliates } from './useFindAllAffiliates';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn()
}));

const AffiliatesTest = () => {
  const { affiliates } = useFindAllAffiliates();

  return affiliates ? <div>test</div> : null;
};

describe('Affiliate test', () => {
  it('should use affiliates hook without error', () => {
    const data = {};
    useQuery.mockReturnValue({ loading: false, error: false, data });
    render(<AffiliatesTest />);
    expect(useQuery).toHaveBeenCalled();
  });

  describe('useFindAllAffiliates', () => {
    const affiliatesData = {
      data: [
        { id: '1', name: 'test-1' },
        { id: '2', name: 'test-2' },
        { id: '3', name: 'test-3' }
      ]
    };

    it('should return data', () => {
      const data = {
        findAllAffiliates: affiliatesData
      };

      useQuery.mockReturnValue({
        loading: false,
        error: null,
        data,
        refetch: jest.fn()
      });

      const { affiliatesLoading, affiliatesError, affiliates } =
        useFindAllAffiliates();

      expect(affiliates).toEqual(data.findAllAffiliates);
      expect(affiliatesError).toEqual(null);
      expect(affiliatesLoading).toEqual(false);
    });

    it('should return an empty array', () => {
      useQuery.mockReturnValue({
        loading: false,
        error: null,
        data: null,
        refetch: jest.fn()
      });

      const { affiliatesLoading, affiliatesError, affiliates } =
        useFindAllAffiliates();

      expect(affiliates).toEqual([]);
      expect(affiliatesError).toEqual(null);
      expect(affiliatesLoading).toEqual(false);
    });
  });
});
