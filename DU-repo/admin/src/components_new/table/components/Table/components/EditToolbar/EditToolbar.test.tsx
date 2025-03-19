import { fireEvent, renderV3, screen } from '@@/test-utils';
import { EditToolbar } from './EditToolbar';

const props = {
  amountItemsSelected: 0,
  removeProps: {
    disabled: false,
    buttonText: 'remove?',
    onButtonClick: jest.fn()
  },
  cancelProps: {
    buttonText: 'cancel',
    onButtonClick: jest.fn()
  },
  editProps: {
    showEdit: true,
    setShowEdit: jest.fn()
  }
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('EditToolbar', () => {
  it('should render with props, and hit cancel', () => {
    renderV3(<EditToolbar {...props} />);
    const cancelButton = screen.getByText(props.cancelProps.buttonText);
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);
    expect(props.cancelProps.onButtonClick).toHaveBeenCalledTimes(1);
  });

  it('should render with props and a selected user, then cancel', () => {
    renderV3(<EditToolbar {...props} amountItemsSelected={1} />);
    const cancelButton = screen.getByText(props.cancelProps.buttonText);
    const removeButton = screen.getByText(props.removeProps.buttonText);
    expect(cancelButton).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();
    fireEvent.click(cancelButton);
    expect(props.cancelProps.onButtonClick).toHaveBeenCalledTimes(1);
  });
});
