import React from 'react';
import { screen, renderV3 } from '@@/test-utils';
import {
  useGetLicensesByVendorId,
  useExportMissionPartnerLicensesForVendor
} from '@/api/license';
import { useFindAllMissionPartnersMinDetails } from '@/api/mission-partner';
import { LicensesTable } from './LicensesTable';
import type { FindVendorByIdQuery } from '@/api/codegen/graphql';

jest.mock('@/api/license');
jest.mock('@/api/mission-partner');

describe('Request License Table', () => {
  const vendor: FindVendorByIdQuery['findVendorById'] = {
    id: 'udemy',
    name: 'Udemy'
  };

  const licenseByVendorIdData = {
    records: [
      {
        userId: 'id',
        userEmail: 'homer@gmail.com',
        missionPartnerName: 'Udemy',
        assignedAt: '2022-07-27T18:50:12.638Z',
        user: {
          branch: 'test-force',
          metadata: {
            command: 'usaf'
          }
        }
      }
    ],
    total: 1
  };

  const missionPartnersMinDetailsData = [
    {
      id: 'udemy',
      name: 'Udemy'
    }
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the Request License Table', () => {
    (useGetLicensesByVendorId as jest.Mock).mockReturnValue({
      licensesLoading: false,
      licensesError: false,
      licenses: licenseByVendorIdData
    });
    (useExportMissionPartnerLicensesForVendor as jest.Mock).mockReturnValue({
      exportMissionPartnerLicensesForVendor: jest.fn(),
      exportMissionPartnerLicensesForVendorLoading: false
    });
    (useFindAllMissionPartnersMinDetails as jest.Mock).mockReturnValue({
      missionPartnersMinDetails: missionPartnersMinDetailsData
    });

    renderV3(<LicensesTable vendor={vendor} />);
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Branch / Org')).toBeInTheDocument();
    expect(screen.getByText('License provider')).toBeInTheDocument();
    expect(screen.getByText('Assigned at')).toBeInTheDocument();
    expect(screen.getByText('homer@gmail.com')).toBeInTheDocument();
    expect(screen.getAllByText('test-force')[1]).toBeInTheDocument();
    expect(screen.getAllByText('Udemy')[1]).toBeInTheDocument();
    expect(screen.getByText(/27 Jul 2022/)).toBeInTheDocument();
  });

  // TODO: Update test when serverside is implemented w/ new loading state
  it.skip('should render nothing because licenses is loading', () => {
    (useGetLicensesByVendorId as jest.Mock).mockReturnValue({
      licensesLoading: true,
      licensesError: false,
      licenses: { licenseByVendorIdData }
    });
    (useExportMissionPartnerLicensesForVendor as jest.Mock).mockReturnValue({
      exportMissionPartnerLicensesForVendor: jest.fn(),
      exportMissionPartnerLicensesForVendorLoading: false
    });
    (useFindAllMissionPartnersMinDetails as jest.Mock).mockReturnValue({
      missionPartnersMinDetails: missionPartnersMinDetailsData
    });

    const table = renderV3(<LicensesTable vendor={vendor} />);
    const tableSkeleton = table.getByLabelText('Table Loading Skeleton');
    expect(tableSkeleton).toBeInTheDocument();
  });

  it('should render an error', () => {
    (useGetLicensesByVendorId as jest.Mock).mockReturnValue({
      licensesLoading: false,
      licensesError: true,
      licenses: { licenseByVendorIdData }
    });
    (useExportMissionPartnerLicensesForVendor as jest.Mock).mockReturnValue({
      exportMissionPartnerLicensesForVendor: jest.fn(),
      exportMissionPartnerLicensesForVendorLoading: false
    });
    (useFindAllMissionPartnersMinDetails as jest.Mock).mockReturnValue({
      missionPartnersMinDetails: missionPartnersMinDetailsData
    });

    renderV3(<LicensesTable vendor={vendor} />);
    expect(
      screen.getByText('An error occurred loading the licenses.')
    ).toBeInTheDocument();
  });
});
