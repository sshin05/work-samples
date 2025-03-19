import { render, screen } from '@@/test-utils';
import { UserTrainingModal } from './UserTrainingModal';

const props = {
  title: 'Title',
  onClose: jest.fn(),
  tableData: {
    columns: ['Full Name'],
    rowData: [['Terra']],
    rowTemplate: [
      function (data) {
        return <div id="rowID">{data.cellData}</div>;
      }
    ],
    stylings: null
  }
};

describe('<UserTrainingModal>', () => {
  it('should display given information', () => {
    render(<div id="app-root">App Root</div>);
    render(<UserTrainingModal {...props} />);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Full Name')).toBeInTheDocument();
    expect(screen.getByText('Terra')).toBeInTheDocument();
  });

  it('should handle an empty object', () => {
    props.tableData = {
      columns: [],
      rowData: [[]],
      rowTemplate: [
        function (_) {
          return <div />;
        }
      ],
      stylings: null
    };
    render(<div id="app-root">App Root</div>);
    render(<UserTrainingModal {...props} />);
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('should display the close button', () => {
    render(<div id="app-root">App Root</div>);
    render(<UserTrainingModal {...props} />);
    expect(screen.getByText('Close')).toBeInTheDocument();
  });
});
