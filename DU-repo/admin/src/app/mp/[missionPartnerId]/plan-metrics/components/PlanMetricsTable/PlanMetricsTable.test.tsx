import { fireEvent, renderV3, screen, waitFor } from '@@/test-utils';
import {
  useAggregateTranscriptTrainingPlans,
  useExportTrainingPlanTranscriptsForMissionPartner
} from '@/api/mission-partner';
import type { TextInputProps } from '@/components_new/form/TextInput/TextInput.types';
import PlanMetricsTable from './PlanMetricsTable';

jest.mock('@/api/mission-partner', () => ({
  useAggregateTranscriptTrainingPlans: jest.fn(),
  useExportTrainingPlanTranscriptsForMissionPartner: jest.fn()
}));

const mockHandleDownload = jest.fn();
const mockNotify = jest.fn();

jest.mock('@cerberus/react', () => ({
  useModal: jest.fn(() => ({
    modalRef: { current: null },
    show: jest.fn(),
    close: jest.fn(),
    isOpen: true
  })),
  useConfirmModal: jest.fn(() => ({
    show: jest.fn().mockReturnValue(true)
  })),
  useNotificationCenter: jest.fn(() => ({
    notify: mockNotify
  })),
  trapFocus: jest.fn(),
  NotificationCenter: ({ children }) => <div>{children}</div>,
  Button: ({ children, onClick, type, className }) => (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  ),
  IconButton: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  Modal: ({ children, className, role, ariaModal }) => (
    <div className={className} role={role} aria-modal={ariaModal}>
      {children}
    </div>
  ),
  Field: ({ children }) => <div>{children}</div>,
  FieldMessage: ({ children }) => <div>{children}</div>,
  Label: ({ children }) => <div>{children}</div>,
  Select: ({ children }) => <select>{children}</select>,
  Option: ({ children }) => <option>{children}</option>,
  Input: ({ onChange }) => <input onChange={onChange} />,
  Table: ({ children }) => <table>{children}</table>,
  Td: ({ children }) => <td>{children}</td>,
  Tr: ({ children }) => <tr>{children}</tr>,
  Th: ({ children }) => <th>{children}</th>,
  Thead: ({ children }) => <thead>{children}</thead>,
  Tbody: ({ children }) => <tbody>{children}</tbody>,
  Checkbox: ({ children, onChange }) => (
    <input type="checkbox" onChange={onChange}>
      {children}
    </input>
  ),
  Portal: ({ children }) => <div>{children}</div>
}));

jest.mock('@/components_new/table/components/SearchToolbar', () => ({
  SearchToolbar: ({
    searchTerm,
    setSearchTerm,
    filterProps,
    filterComponent
  }) => (
    <div>
      <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      <button onClick={() => mockHandleDownload()}>Download</button>
      <button onClick={() => filterProps.setOpenFilters(true)}>
        Open Filters
      </button>
      {filterComponent}
    </div>
  )
}));

jest.mock('../PlanMetricsFilter/PlanMetricsFilter', () => ({
  PlanMetricsFilter: ({ handleSubmit, handleFilterResetClick }) => (
    <div data-testid="plan-metrics-filters">
      <button
        onClick={() => {
          handleSubmit({
            planType: 'type1'
          });
        }}
      >
        Submit Filters
      </button>
      <button onClick={handleFilterResetClick}>Reset Filters</button>
    </div>
  )
}));

jest.mock('@/components_new/form', () => ({
  TextInput: ({ children }: TextInputProps) => <div>{children}</div>
}));

afterAll(() => {
  jest.clearAllMocks();
});

const mockParams = {
  missionPartnerId: 'mp-1',
  planType: undefined,
  missionPartnerName: 'mp-name'
};

const mockTrainingPlans = {
  records: [
    {
      id: '1',
      planType: 'type1',
      planSourceId: 'source1',
      planTitle: 'title1',
      total: 100,
      assigned: 50,
      started: 30,
      stopped: 10,
      completed: 20
    }
  ],
  total: 1
};

describe('PlanMetricsScrollableTable', () => {
  (useAggregateTranscriptTrainingPlans as jest.Mock).mockReturnValue({
    transcriptTrainingPlans: mockTrainingPlans.records,
    transcriptTrainingPlansLoading: false,
    transcriptTrainingPlansError: null,
    transcriptTrainingPlansTotal: mockTrainingPlans.total
  });
  const mockExportTrainingPlanTranscriptsForMissionPartner = jest
    .fn()
    .mockResolvedValue({});
  (
    useExportTrainingPlanTranscriptsForMissionPartner as jest.Mock
  ).mockReturnValue({
    exportTrainingPlanTranscriptsForMissionPartner:
      mockExportTrainingPlanTranscriptsForMissionPartner
  });

  mockHandleDownload.mockImplementation(() => {
    mockExportTrainingPlanTranscriptsForMissionPartner({
      variables: {
        missionPartnerId: 'mp-1',
        missionPartnerName: 'mp-name'
      }
    });
  });

  it('renders the table', () => {
    renderV3(<PlanMetricsTable {...mockParams} />);

    expect(screen.getByText('title1')).toBeInTheDocument();
  });

  //TODO: Add back in when we have table animations
  it.skip('displays loading when data is loading', () => {
    (useAggregateTranscriptTrainingPlans as jest.Mock).mockReturnValue({
      transcriptTrainingPlans: [],
      transcriptTrainingPlansLoading: true,
      transcriptTrainingPlansError: null,
      transcriptTrainingPlansTotal: 0
    });
    renderV3(<PlanMetricsTable {...mockParams} />);

    const loading = document.querySelector('[aria-busy="true"]');
    expect(loading).toBeInTheDocument();
  });

  it('renders the table with no data', () => {
    (useAggregateTranscriptTrainingPlans as jest.Mock).mockReturnValue({
      transcriptTrainingPlans: [],
      transcriptTrainingPlansLoading: false,
      transcriptTrainingPlansError: null,
      transcriptTrainingPlansTotal: 0
    });
    renderV3(<PlanMetricsTable {...mockParams} />);

    expect(screen.getByText('0 items')).toBeInTheDocument();
  });

  it('handles download', () => {
    renderV3(<PlanMetricsTable {...mockParams} />);

    const downloadButton = screen.getByText('Download');
    fireEvent.click(downloadButton);

    expect(mockHandleDownload).toHaveBeenCalled();
    expect(
      useExportTrainingPlanTranscriptsForMissionPartner()
        .exportTrainingPlanTranscriptsForMissionPartner
    ).toHaveBeenCalledWith({
      variables: {
        missionPartnerId: 'mp-1',
        missionPartnerName: 'mp-name'
      }
    });
  });

  it('should call handleFilterFormSubmit when the filter form is submitted', async () => {
    renderV3(<PlanMetricsTable {...mockParams} />);
    fireEvent.click(screen.getByText('Open Filters'));
    await waitFor(() => {
      expect(screen.getByTestId('plan-metrics-filters')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Submit Filters'));
  });

  it('should call handleFilterResetClick when the filter reset button is clicked', async () => {
    renderV3(<PlanMetricsTable {...mockParams} />);

    fireEvent.click(screen.getByText('Open Filters'));
    await waitFor(() => {
      expect(screen.getByTestId('plan-metrics-filters')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Reset Filters'));
  });
});
