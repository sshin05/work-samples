import { screen, render, fireEvent } from '@@/test-utils';
import { type UploadFileModalProps } from './UploadFileModal.types';
import { UploadFileModal } from '.';

jest.mock('@/app/api', () => ({
  useSQLMutation: jest
    .fn()
    .mockReturnValue({ loading: false, error: false, mutation: jest.fn })
}));

jest.mock('@/app/api/cohorts', () => ({
  sqlUpdateCohort: jest.fn()
}));

jest.mock('@cerberus/react', () => ({
  ...jest.requireActual('@cerberus/react'),
  useModal: jest.fn(() => ({
    modalRef: { current: null },
    show: jest.fn(),
    close: jest.fn()
  }))
}));

describe('UploadFileModal', () => {
  const defaultProps = (): UploadFileModalProps => ({
    title: 'Mock Title',
    description: 'Mock Description',
    cohortId: 'test-id',
    onClose: jest.fn(),
    visible: true
  });

  it('renders', () => {
    const props = defaultProps();
    render(<UploadFileModal {...props} />);

    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.description)).toBeInTheDocument();
  });

  it('can be closed via the close icon', () => {
    const props = defaultProps();
    render(<UploadFileModal {...props} />);

    expect(props.onClose).toHaveBeenCalledTimes(0);

    fireEvent.click(screen.getByLabelText('Close'));

    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  it('can be closed via the cancel button', () => {
    const props = defaultProps();
    render(<UploadFileModal {...props} />);

    expect(props.onClose).toHaveBeenCalledTimes(0);

    fireEvent.click(screen.getByText('Cancel'));

    expect(props.onClose).toHaveBeenCalledTimes(1);
  });
});
