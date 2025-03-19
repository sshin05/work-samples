import { renderV3, screen } from '@@/test-utils';
import { FieldSelect } from './FieldSelect';

const defaultProps = {
  label: 'Test Label',
  name: 'test',
  options: [{ value: 'test', label: 'Test' }]
};

describe('TextArea component', () => {
  describe('Rendering label', () => {
    it('should render the label if provided', () => {
      renderV3(<FieldSelect {...defaultProps} />);

      expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    });

    it('should not render a label if none is provided', () => {
      renderV3(<FieldSelect {...defaultProps} label={undefined} />);
      expect(screen.queryByLabelText('Test Label')).toBeNull();
    });
  });

  describe('Help Text and Error Message', () => {
    it('should render the help text if provided', () => {
      renderV3(<FieldSelect {...defaultProps} helpText="Help text" />);
      expect(screen.getByText('Help text')).toBeInTheDocument();
    });

    it('should render the error message if provided', () => {
      renderV3(<FieldSelect {...defaultProps} errorMessage="Error message" />);

      expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('should render only error message when helpText and errorMessage props are provided', () => {
      renderV3(
        <FieldSelect
          {...defaultProps}
          helpText="Help text"
          errorMessage="Error message"
        />
      );
      expect(screen.queryByText('Help text')).not.toBeInTheDocument();
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });
  });

  describe('Derived props', () => {
    it('should derive id from name if id is not provided', () => {
      renderV3(<FieldSelect {...defaultProps} />);
      expect(screen.getByRole('combobox')).toHaveAttribute('id', 'test');
    });

    it('should use the provided id if id is provided', () => {
      renderV3(<FieldSelect {...defaultProps} id="custom-id" />);
      expect(screen.getByRole('combobox')).toHaveAttribute('id', 'custom-id');
    });

    it('should mark textarea as invalid if errorMessage is set', () => {
      renderV3(<FieldSelect {...defaultProps} errorMessage="Error" />);
      expect(screen.getByRole('combobox')).toBeInvalid();
    });
  });

  describe('Field props handling', () => {
    it('should set disabled prop on textarea', () => {
      renderV3(<FieldSelect {...defaultProps} disabled />);
      expect(screen.getByRole('combobox')).toBeDisabled();
    });

    it('should set readOnly prop on textarea', () => {
      renderV3(<FieldSelect {...defaultProps} readOnly />);
      expect(screen.getByRole('combobox')).toHaveAttribute('readonly');
    });
  });
});
