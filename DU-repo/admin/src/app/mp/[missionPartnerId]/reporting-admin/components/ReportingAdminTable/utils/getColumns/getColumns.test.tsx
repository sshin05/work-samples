import { getColumns, getReportColumns } from './getColumns';
import { fireEvent, render, screen } from '@@/test-utils';

describe('getColumns', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  const mockOptions = {
    enabledReports: [{ id: '1', name: 'Report 1' }],
    handleEnableReports: jest.fn(),
    handleDisableReports: jest.fn(),
    createReportDownloadHandler: jest.fn(),
    createExportByTypeAndMissionPartnerId: jest.fn(),
    notify: jest.fn(),
    missionPartnerId: 'mock-id',
    isDuAdmin: true
  };

  it('should return report columns', () => {
    const columns = getColumns('report', mockOptions, false);
    expect(columns).toHaveLength(3);
    expect(columns[0].header).toBe('Report availability');
    expect(columns[1].header).toBe('Available');
    expect(columns[2].header).toBe('Download');
  });
});

describe('getReportColumns', () => {
  const mockOptions = {
    enabledReports: [{ id: '1', name: 'Report 1' }],
    handleEnableReports: jest.fn(),
    handleDisableReports: jest.fn(),
    createReportDownloadHandler: jest.fn(),
    createExportByTypeAndMissionPartnerId: jest.fn(),
    notify: jest.fn(),
    missionPartnerId: 'mock-id',
    isDuAdmin: true
  };

  const columns = getReportColumns(mockOptions);

  it('should render report name', () => {
    const reportDetail = { id: '1', name: 'Report 1' };
    render(columns[0].cell({ row: { original: reportDetail } }));
    expect(screen.getByText('Report 1')).toBeInTheDocument();
  });

  it('should render download button', () => {
    const reportDetail = { id: '1', name: 'Report 1' };
    render(columns[2].cell({ row: { original: reportDetail } }));
    const button = screen.getByRole('button', { name: /Download/i });
    expect(button).toBeInTheDocument();
  });

  it('should handle download button click', async () => {
    const reportDetail = { id: '1', name: 'Report 1' };
    render(columns[2].cell({ row: { original: reportDetail } }));
    const button = screen.getByRole('button', { name: /Download/i });
    button.click();
    expect(mockOptions.createReportDownloadHandler).toHaveBeenCalled();
  });

  it('should handle toggle change when checked', async () => {
    const reportDetail = { id: '1', name: 'Report 1' };
    render(columns[1].cell({ row: { original: reportDetail } }));

    const toggle = screen.getByRole('switch');
    expect(toggle).toBeInTheDocument();
    expect(toggle).toBeChecked();

    toggle.click();
    expect(mockOptions.handleDisableReports).toHaveBeenCalled();
  });
  it('should handle toggle change when unchecked', async () => {
    const mockOptions2 = {
      enabledReports: [],
      handleEnableReports: jest.fn(),
      handleDisableReports: jest.fn(),
      createReportDownloadHandler: jest.fn(),
      createExportByTypeAndMissionPartnerId: jest.fn(),
      notify: jest.fn(),
      missionPartnerId: 'mock-id',
      isDuAdmin: true
    };

    const columns = getReportColumns(mockOptions2);
    const reportDetail = { id: '1', name: 'Report 1' };
    render(columns[1].cell({ row: { original: reportDetail } }));
    const newToggle = screen.getByRole('switch');
    expect(newToggle).toBeInTheDocument();
    expect(newToggle).not.toBeChecked();
    fireEvent.click(newToggle);
    expect(mockOptions2.handleEnableReports).toHaveBeenCalled();
  });

  it('should create delete column when displayEditOptions & editOptions are true', () => {
    const editOptions = {
      onDelete: jest.fn()
    };
    const columns = getColumns('report', mockOptions, true, editOptions);
    const reportDetail = { id: '1', name: 'Report 1' };
    render(columns[3].cell({ row: { original: reportDetail } }));
    const deleteButton = screen.getByLabelText('Delete');
    expect(deleteButton).toBeInTheDocument();
  });
});
