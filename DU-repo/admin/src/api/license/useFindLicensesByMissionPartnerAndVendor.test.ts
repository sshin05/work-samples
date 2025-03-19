import { useState } from 'react';
import { useFindLicensesByMissionPartnerAndVendor } from './useFindLicensesByMissionPartnerAndVendor';

const mockUseQuery = jest.fn();

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: (query, options) => mockUseQuery(query, options)
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn()
}));

describe('useFindLicensesByMissionPartnerAndVendor', () => {
  const cursorLicenseResponse = {
    findLicensesByMissionPartnerAndVendor: {
      total: 2,
      records: [
        {
          vendorId: 'foo',
          vendorName: 'Foo',
          userId: 'cf2d73f3-f78a-4ffc-9ab0-e6b658c101d3',
          userFirstName: 'Betty',
          userLastName: 'Boop',
          userEmail: 'betty@toontown.com',
          missionPartnerId: 'bar',
          missionPartnerName: 'Bar',
          assignedAt: '2024-01-17T15:46:59.834Z',
          lastUsedAt: null
        },
        {
          vendorId: 'foo',
          vendorName: 'Foo',
          userId: 'aeb9ecd2-a5fd-49a8-9057-304c2f50a5b7',
          userFirstName: 'Jessica',
          userLastName: 'Rabbit',
          userEmail: 'jessica@toontown.com',
          missionPartnerId: 'bar',
          missionPartnerName: 'Bar',
          assignedAt: '2024-01-17T15:45:43.576Z',
          lastUsedAt: null
        },
        {
          vendorId: 'foo',
          vendorName: 'Foo',
          userId: '4b06c5eb-918c-4b4e-be14-15d3ef194f15',
          userFirstName: 'Roger',
          userLastName: 'Rabbit',
          userEmail: 'roger@ominfederal.com',
          missionPartnerId: 'bar',
          missionPartnerName: 'Bar',
          assignedAt: '2024-01-17T15:34:30.874Z',
          lastUsedAt: null
        }
      ]
    }
  };
  it('should return data', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: cursorLicenseResponse,
      refetch: jest.fn()
    });

    (useState as jest.Mock).mockReturnValueOnce('100');

    const result = useFindLicensesByMissionPartnerAndVendor({
      missionPartnerId: 'foo',
      vendorId: 'bar'
    });

    expect(result.licensesLoading).toEqual(false);
    expect(result.licensesError).toEqual(undefined);
    expect(result.licenses).toEqual(
      cursorLicenseResponse.findLicensesByMissionPartnerAndVendor.records
    );
    expect(result.refetchLicenses).toBeDefined();
  });

  it('should return loading', () => {
    mockUseQuery.mockReturnValue({
      loading: true,
      error: undefined,
      data: undefined,
      refetch: jest.fn()
    });

    (useState as jest.Mock).mockReturnValueOnce('100');

    const result = useFindLicensesByMissionPartnerAndVendor({
      missionPartnerId: 'foo',
      vendorId: 'bar'
    });

    expect(result.licensesLoading).toEqual(true);
    expect(result.licensesError).toEqual(undefined);
    expect(result.licenses).toEqual(undefined);
    expect(result.refetchLicenses).toBeDefined();
  });

  it('should return error', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: new Error('error'),
      data: undefined,
      refetch: jest.fn()
    });

    (useState as jest.Mock).mockReturnValueOnce('100');

    const result = useFindLicensesByMissionPartnerAndVendor({
      missionPartnerId: 'foo',
      vendorId: 'bar'
    });

    expect(result.licensesLoading).toEqual(false);
    expect(result.licensesError).toEqual(new Error('error'));
    expect(result.licenses).toEqual(undefined);
  });

  it('should return empty array when missionPartnerId is empty', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: undefined,
      refetch: jest.fn()
    });

    (useState as jest.Mock).mockReturnValueOnce('');

    const result = useFindLicensesByMissionPartnerAndVendor({
      missionPartnerId: '',
      vendorId: 'bar'
    });

    expect(result.licensesLoading).toEqual(false);
    expect(result.licensesError).toEqual(undefined);
    expect(result.licenses).toEqual(undefined);
  });

  it('should return empty array when vendorId is empty', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: undefined,
      refetch: jest.fn()
    });

    (useState as jest.Mock).mockReturnValueOnce('100');

    const result = useFindLicensesByMissionPartnerAndVendor({
      missionPartnerId: 'foo',
      vendorId: ''
    });

    expect(result.licensesLoading).toEqual(false);
    expect(result.licensesError).toEqual(undefined);
    expect(result.licenses).toEqual(undefined);
  });

  it('should refetch', () => {
    const mockRefetch = jest.fn();
    mockUseQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: undefined,
      refetch: mockRefetch
    });

    (useState as jest.Mock).mockReturnValueOnce('100');

    const result = useFindLicensesByMissionPartnerAndVendor({
      missionPartnerId: 'foo',
      vendorId: 'bar',
      pageSize: 1
    });

    result.refetchLicenses();

    expect(mockRefetch).toHaveBeenCalled();
  });
});
