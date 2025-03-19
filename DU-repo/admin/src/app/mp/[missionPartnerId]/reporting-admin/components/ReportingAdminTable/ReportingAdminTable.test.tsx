import { renderV3, screen } from '@@/test-utils';
import {
  useCreateExportsByTypeAndMissionPartnerId,
  useDisableExportsByTypesForMissionPartnerId,
  useEnableExportsByTypesForMissionPartnerId,
  useFindAllMissionPartnersAdminPortal,
  useGetPublicMissionPartnerExports
} from '@/api/mission-partner';
import ReportingAdminTable from './ReportingAdminTable';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ApolloProvider } from '@apollo/client';
import { type MockApolloClient, createMockClient } from 'mock-apollo-client';

jest.mock('@/api/downloads');
jest.mock('@/api/uploads');
jest.mock('@/api/mission-partner');
jest.mock('next-auth/react');

jest.mock('next/navigation', () => ({
  useParams: jest.fn()
}));

const enableExportsByTypesForMissionPartnerMock = jest.fn();
const disableExportsByTypesForMissionPartnerMock = jest.fn();
const mockExports = [
  {
    description: 'mock report 1',
    id: '111',
    name: 'name'
  },
  {
    description: 'mock report 2',
    id: '222',
    name: 'name'
  }
];

const mockMps = [
  {
    id: '001',
    name: 'MP1',
    affiliateId: 'air-force',
    enabledReports: [mockExports]
  },
  {
    id: '002',
    name: 'MP2',
    affiliateId: 'air-force',
    enabledReports: []
  }
];

const mockSession = {
  expires: '1',
  user: { email: 'foo@bar.com', name: 'foo bar', roles: ['admin'] },
  isDuAdmin: true
};

let mockClient: MockApolloClient;

describe('Reporting Admin page', () => {
  beforeAll(() => {
    mockClient = createMockClient();

    (useParams as jest.Mock).mockReturnValue({
      missionPartnerId: mockMps[0].id
    });
    (useFindAllMissionPartnersAdminPortal as jest.Mock).mockReturnValue({
      missionPartners: mockMps,
      missionPartnersLoading: false
    });
    (useCreateExportsByTypeAndMissionPartnerId as jest.Mock).mockReturnValue({
      CreateExportByTypeAndMissionPartnerId: jest.fn()
    });
    (useEnableExportsByTypesForMissionPartnerId as jest.Mock).mockReturnValue({
      enableExportsByTypesForMissionPartner:
        enableExportsByTypesForMissionPartnerMock
    });
    (useDisableExportsByTypesForMissionPartnerId as jest.Mock).mockReturnValue({
      disableExportsByTypesForMissionPartner:
        disableExportsByTypesForMissionPartnerMock
    });
    (useGetPublicMissionPartnerExports as jest.Mock).mockReturnValue({
      getPublicMissionPartnerExportsData: mockExports,
      getPublicMissionPartnerExportsLoading: false
    });
    (useSession as jest.Mock).mockReturnValue({ data: mockSession });
  });

  it('should render the component', () => {
    renderV3(
      <ApolloProvider client={mockClient}>
        <ReportingAdminTable missionPartnerId={mockMps[0].id} />
      </ApolloProvider>
    );
    expect(screen.getByText('Report availability')).toBeInTheDocument();
    expect(screen.getByText('Available')).toBeInTheDocument();
    expect(screen.getAllByText('Download')[0]).toBeInTheDocument();
  });

  it('should render the component with the correct number of reports', () => {
    renderV3(<ReportingAdminTable missionPartnerId={mockMps[0].id} />);
    expect(screen.getAllByRole('button')).toHaveLength(mockExports.length);
    expect(screen.getByText('1 - 2 of 2 items')).toBeInTheDocument();
  });

  it('should enable a report', () => {
    renderV3(<ReportingAdminTable missionPartnerId={mockMps[0].id} />);
    const button = screen.getAllByRole('switch')[0];
    button.click();
    expect(enableExportsByTypesForMissionPartnerMock).toHaveBeenCalled();
  });
});
