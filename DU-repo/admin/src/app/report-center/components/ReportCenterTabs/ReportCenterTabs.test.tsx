import { ReportCenterTabs } from '.';
import { renderV3, screen } from '@@/test-utils';
import { DOWNLOADS_TAB, UPLOADS_TAB } from './constants';

jest.mock('./components/Table/Table', () => {
  const MockTable = () => <div data-testid="mock-table" />;
  MockTable.displayName = 'MockTable';
  return MockTable;
});

jest.mock('@/api/uploads', () => ({
  useDeleteUpload: () => ({
    deleteUpload: jest.fn()
  }),
  useGetUserUploads: () => ({
    uploads: [],
    uploadsLoading: false
  })
}));

jest.mock('@/api/downloads', () => ({
  useDeleteDownload: () => ({
    deleteDownload: jest.fn()
  }),
  useGetUserDownloads: () => ({
    downloads: [],
    downloadsLoading: false
  })
}));

describe('ReportCenterTabs', () => {
  it('renders the expected tabs', () => {
    renderV3(<ReportCenterTabs />);

    const tabs = [DOWNLOADS_TAB, UPLOADS_TAB];

    tabs.forEach(name => {
      expect(screen.getByRole('tab', { name })).toBeInTheDocument();
    });
    expect(screen.getByTestId('mock-table')).toBeInTheDocument();
  });
});
