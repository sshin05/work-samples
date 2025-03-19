import { screen, render, fireEvent, waitFor } from '@@/test-utils';
import type { CohortData } from '../../../../cohort.types';
import {
  type EditReportingInstructionsProps,
  FORM_INPUTS
} from './EditReportingInstructions.types';
import { EditReportingInstructions } from '.';
import { useSQLMutation } from '@/app/api';
import { formatFormInputsForSave } from './utils/formatFormInputsForSave';
import { MAX_ADDITIONAL_DETAIL_CHARACTER_COUNT } from './EditReportingInstructions.constants';

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
    show: jest.fn()
  }))
}));

jest.mock('@cerberus/icons', () => ({
  ...jest.requireActual('@cerberus/icons'),
  Close: () => <div data-testid="close-icon" />
}));

jest.mock('./utils/formatFormInputsForSave');

describe('EditReportingInstructions', () => {
  const defaultProps = (): EditReportingInstructionsProps => ({
    cohortData: {} as CohortData,
    onClose: jest.fn(),
    afterSubmit: jest.fn()
  });

  it('renders', () => {
    render(<EditReportingInstructions {...defaultProps()} />);

    expect(screen.getAllByText('(optional)').length).toBe(3);
  });

  it('can be closed via the close icon', () => {
    const props = defaultProps();
    render(<EditReportingInstructions {...props} />);

    expect(props.onClose).toHaveBeenCalledTimes(0);

    fireEvent.click(screen.getByTestId('close-icon'));

    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  it('can be closed via the cancel button', () => {
    const props = defaultProps();
    render(<EditReportingInstructions {...props} />);

    expect(props.onClose).toHaveBeenCalledTimes(0);

    fireEvent.click(screen.getByText('Cancel'));

    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls updateCohort when the form is submitted', async () => {
    const updateCohortSpy = jest.fn();
    (useSQLMutation as jest.Mock).mockReturnValueOnce({
      mutation: updateCohortSpy
    });

    const formInputsMock = {
      formInputMock: true
    };
    (formatFormInputsForSave as jest.Mock).mockReturnValueOnce(formInputsMock);

    const props = defaultProps();
    render(<EditReportingInstructions {...props} />);

    // Set required form fields
    fireEvent.change(screen.getByLabelText(/^Start Date/), {
      target: { value: '2024-11-05' }
    });
    fireEvent.change(screen.getByLabelText(/^End Date/), {
      target: { value: '2024-11-15' }
    });

    expect(updateCohortSpy).toHaveBeenCalledTimes(0);

    fireEvent.click(screen.getByText('Save'));

    const expected = {
      ...props.cohortData,
      ...formInputsMock
    };

    await waitFor(() => {
      expect(updateCohortSpy).toHaveBeenCalledWith(expected);
      expect(props.onClose).toHaveBeenCalledTimes(1);
    });
  });

  it('updates the character count as expected', () => {
    render(<EditReportingInstructions {...defaultProps()} />);

    const mockInput = 'abc123';
    fireEvent.change(screen.getByLabelText(FORM_INPUTS.MEETING_DETAILS), {
      target: { value: mockInput }
    });

    expect(
      screen.getByText(
        `${mockInput.length} / ${MAX_ADDITIONAL_DETAIL_CHARACTER_COUNT}`
      )
    ).toBeInTheDocument();
  });

  it('displays an error if the end date is before the start date', async () => {
    render(<EditReportingInstructions {...defaultProps()} />);

    // Set required form fields
    fireEvent.change(screen.getByLabelText(/^Start Date/), {
      target: { value: '2025-11-15' }
    });
    fireEvent.change(screen.getByLabelText(/^End Date/), {
      target: { value: '2024-11-15' }
    });

    fireEvent.click(screen.getByText('Save'));

    await waitFor(() =>
      expect(
        screen.getByText(/End date must be after start date/i)
      ).toBeInTheDocument()
    );
  });

  it('should not display an error if the end date is after the start date', async () => {
    render(<EditReportingInstructions {...defaultProps()} />);

    // Set required form fields
    fireEvent.change(screen.getByLabelText(/^Start Date/), {
      target: { value: '2023-11-15' }
    });
    fireEvent.change(screen.getByLabelText(/^End Date/), {
      target: { value: '2024-11-15' }
    });

    fireEvent.click(screen.getByText('Save'));

    await waitFor(() =>
      expect(
        screen.queryByText(/End date must be after start date/i)
      ).not.toBeInTheDocument()
    );
  });
});
