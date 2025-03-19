import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { createMockClient } from 'mock-apollo-client';
import { renderV3, screen } from '@@/test-utils';
import { useGetUserDownloads, useDeleteDownload } from '@/api/downloads';
import { useGetUserUploads, useDeleteUpload } from '@/api/uploads';
import ReportCenterPage from './page';
import { PAGE_TITLE } from './constants';
import {
  useCreateExportsByTypeAndMissionPartnerId,
  useFindAllMissionPartnersAdminPortal
} from '@/api/mission-partner';

jest.mock('@/api/downloads');
jest.mock('@/api/uploads');
jest.mock('@/api/mission-partner');

describe('report center page', () => {
  let mockClient;
  const mockDelete = jest
    .fn()
    .mockImplementation(async () => Promise.resolve());
  beforeAll(() => {
    mockClient = createMockClient();
    (useGetUserDownloads as jest.Mock).mockReturnValue({
      downloadsLoading: false,
      downloadsError: false
    });

    (useGetUserUploads as jest.Mock).mockReturnValue({
      uploadsLoading: false,
      uploadsError: false,
      refetchUploads: jest.fn()
    });
    (useDeleteDownload as jest.Mock).mockReturnValue({
      deleteDownload: mockDelete
    });
    (useDeleteUpload as jest.Mock).mockReturnValue({
      deleteUpload: mockDelete
    });
    (useFindAllMissionPartnersAdminPortal as jest.Mock).mockReturnValue({
      missionPartners: []
    });
    (useCreateExportsByTypeAndMissionPartnerId as jest.Mock).mockReturnValue({
      createExportByTypeAndMissionPartnerId: jest.fn()
    });
  });

  it('should render Report Center page', () => {
    renderV3(
      <ApolloProvider client={mockClient}>
        <ReportCenterPage />
      </ApolloProvider>
    );
    expect(screen.getByText(PAGE_TITLE)).toBeInTheDocument();
  });
});
