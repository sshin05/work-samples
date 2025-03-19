import { renderV3, screen } from '@@/test-utils';
import { TextArea } from './TextArea';

describe('TextArea component', () => {
  describe('Rendering label', () => {
    it('should render the label if provided', () => {
      renderV3(<TextArea label="Test Label" name="test" />);
      expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    });

    it('should not render a label if none is provided', () => {
      renderV3(<TextArea name="test" label="testLabel" />);
      expect(screen.queryByLabelText('Test Label')).toBeNull();
    });
  });

  describe('Help Text and Error Message', () => {
    it('should render the help text if provided', () => {
      renderV3(<TextArea name="test" label="testLabel" helpText="Help text" />);
      expect(screen.getByText('Help text')).toBeInTheDocument();
    });

    it('should render the error message if provided', () => {
      renderV3(
        <TextArea name="test" label="testLabel" errorMessage="Error message" />
      );
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('should render only error message when helpText and errorMessage props are provided', () => {
      renderV3(
        <TextArea
          name="test"
          label="testLabel"
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
      renderV3(<TextArea name="test" label="testLabel" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('id', 'test');
    });

    it('should use the provided id if id is provided', () => {
      renderV3(<TextArea name="test" label="testLabel" id="custom-id" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('id', 'custom-id');
    });

    it('should mark textarea as invalid if errorMessage is set', () => {
      renderV3(<TextArea name="test" label="testLabel" errorMessage="Error" />);
      expect(screen.getByRole('textbox')).toBeInvalid();
    });
  });

  describe('Field props handling', () => {
    it('should set disabled prop on textarea', () => {
      renderV3(<TextArea name="test" label="testLabel" disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('should set readOnly prop on textarea', () => {
      renderV3(<TextArea name="test" label="testLabel" readOnly />);
      expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
    });
  });

  describe('maxLength prop', () => {
    it('should display FieldMessage when maxLength is provided', () => {
      const { getByText } = renderV3(
        <TextArea
          name="test"
          label="testLabel"
          inputLength={5}
          maxLength={10}
        />
      );
      expect(getByText('5/10')).toBeInTheDocument();
    });

    it('should not display FieldMessage when maxLength is not provided', () => {
      const { queryByText } = renderV3(
        <TextArea name="test" label="testLabel" />
      );
      expect(queryByText('5/10')).not.toBeInTheDocument();
    });

    it('should display the correct input length and max length', () => {
      const { getByText } = renderV3(
        <TextArea
          name="test"
          label="testLabel"
          inputLength={5}
          maxLength={10}
        />
      );
      expect(getByText('5/10')).toBeInTheDocument();
    });
  });
});
