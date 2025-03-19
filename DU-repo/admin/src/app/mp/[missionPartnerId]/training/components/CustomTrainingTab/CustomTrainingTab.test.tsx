import { fireEvent, renderV3, screen, userEvent, waitFor } from '@@/test-utils';
import CustomTrainingTab from './CustomTrainingTab';

const missionPartner = {
  id: '1234',
  scorms: [],
  courses: [],
  exams: [],
  surveys: [],
  labs: []
};

jest.mock('@cerberus/react', () => ({
  useModal: jest.fn(() => ({
    modalRef: { current: null },
    show: jest.fn(),
    close: jest.fn()
  })),
  trapFocus: jest.fn(),
  NotificationCenter: ({ children }) => <div>{children}</div>,
  Field: ({ children }) => <div>{children}</div>,
  Label: ({ children }) => <div>{children}</div>,
  Button: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  Select: ({ onChange, id }) => (
    <button
      type="button"
      onClick={() =>
        id === 'item-section'
          ? onChange({ target: { value: 'Manual Course' } })
          : onChange({ target: { value: 'Assessment' } })
      }
    >
      {id === 'item-section' ? 'Manual Course' : 'Assessment'}
    </button>
  ),
  Option: ({ children }) => <option>{children}</option>,
  Modal: ({ children }) => <div>{children}</div>,
  IconButton: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  Input: ({ onChange }) => <input onChange={onChange} />,
  Tabs: ({ children }) => <div>{children}</div>,
  TabsList: ({ children }) => <div>{children}</div>,
  Tab: ({ children }) => <div>{children}</div>,
  TabPanel: ({ children }) => <div>{children}</div>,
  Table: ({ children }) => <table>{children}</table>,
  Td: ({ children }) => <td>{children}</td>,
  Tr: ({ children }) => <tr>{children}</tr>,
  Th: ({ children }) => <th>{children}</th>,
  Thead: ({ children }) => <thead>{children}</thead>,
  Tbody: ({ children }) => <tbody>{children}</tbody>
}));

jest.mock('@/components_new/form', () => ({
  TextInput: ({ children }) => <input>{children}</input>
}));

jest.mock('../AddCustomTrainingItemModalContent', () => ({
  AddCustomTrainingItemModalContent: () => <div>Add Custom Training Item</div>
}));

describe('<CustomTrainingTab />', () => {
  const defaultProps = {
    missionPartner,
    tab: 'Plans',
    loading: false,
    pageLoading: false
  };

  it('should render', () => {
    renderV3(<CustomTrainingTab {...defaultProps} />);

    expect(screen.getByText('Training item')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Once custom training has been created, it will appear here.'
      )
    ).toBeInTheDocument();
  });

  it('should render with courses', () => {
    const missionPartnerWithCourses = {
      ...missionPartner,
      courses: [
        {
          id: 'course-1',
          type: 'Course',
          status: 'Active',
          name: 'Course 1',
          duration: 60,
          createdAt: '2021-08-01',
          updatedAt: '2021-08-01'
        }
      ]
    };

    renderV3(
      <CustomTrainingTab
        {...defaultProps}
        missionPartner={missionPartnerWithCourses}
      />
    );

    expect(screen.getByText('Course 1')).toBeInTheDocument();
  });

  it('should open modal when "Add Custom Training Items" button is clicked', () => {
    renderV3(<CustomTrainingTab {...defaultProps} />);

    const addButton = screen.getByText('Add Custom Training Items');
    userEvent.click(addButton);

    waitFor(() => {
      expect(screen.getByText('Add Custom Training Item')).toBeInTheDocument();
    });
  });

  it('should filter items by type', async () => {
    const missionPartner2 = {
      id: '1234',
      scorms: [],
      courses: [
        {
          id: '123',
          type: 'Course',
          status: 'Active',
          name: 'Course 1',
          duration: 60,
          createdAt: '2021-08-01',
          updatedAt: '2021-08-01'
        }
      ],
      exams: [],
      surveys: [],
      labs: []
    };
    renderV3(
      <CustomTrainingTab {...defaultProps} missionPartner={missionPartner2} />
    );

    fireEvent.click(screen.getAllByRole('button')[0]);
    await waitFor(() => {
      expect(screen.getByText('Select Item Type')).toBeInTheDocument();
    });
    const selectOption = screen.getAllByRole('textbox')[0];
    fireEvent.change(selectOption, { target: { value: 'Manual Course' } });
    fireEvent.click(screen.getByText('Course'));
    await waitFor(() => {
      expect(screen.getByText('Course')).toBeInTheDocument();
    });
  });

  describe('no data message', () => {
    it('shows the no data message if there are no custom training items', () => {
      renderV3(<CustomTrainingTab {...defaultProps} />);

      expect(
        screen.getByText(
          'Once custom training has been created, it will appear here.'
        )
      ).toBeInTheDocument();
    });
  });
});
