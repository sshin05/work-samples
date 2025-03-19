import { renderV3, screen, fireEvent } from '@@/test-utils';
import { Checkbox } from './Checkbox';

jest.mock('@cerberus/react', () => ({
  ...jest.requireActual('@cerberus/react'),
  Checkbox: ({ id, size, disabled, ...props }) => (
    <input
      type="checkbox"
      id={id}
      data-size={size}
      disabled={disabled}
      {...props}
    />
  ),
  Label: ({ children, htmlFor, size }) => (
    <label htmlFor={htmlFor} data-size={size}>
      {children}
    </label>
  )
}));

const CHECKBOX_ID = 'test-checkbox';
const LABEL_TEXT = 'Test Label';
const CHECKBOX_SIZE = 'lg';
const LABEL_SIZE = 'sm';
const ON_CHANGE = jest.fn();

describe('Checkbox', () => {
  const props = {
    id: CHECKBOX_ID,
    name: CHECKBOX_ID,
    labelText: LABEL_TEXT,
    onChange: ON_CHANGE,
    value: false
  };

  describe('Basic Render', () => {
    it('renders with label and checkbox', () => {
      renderV3(<Checkbox {...props} />);

      const label = screen.getByLabelText(LABEL_TEXT);
      expect(label).toBeInTheDocument();

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    it('applies the correct default checkbox size', () => {
      renderV3(<Checkbox {...props} />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('data-size', 'md');
    });

    it('applies the correct default label size', () => {
      renderV3(<Checkbox {...props} />);

      const label = screen.getByText(LABEL_TEXT);
      expect(label).toHaveAttribute('data-size', 'md');
    });
  });

  describe('Size Properties', () => {
    it('applies the correct checkbox size from props', () => {
      renderV3(<Checkbox {...props} size={CHECKBOX_SIZE} />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('data-size', CHECKBOX_SIZE);
    });

    it('applies the correct label size from props', () => {
      renderV3(<Checkbox {...props} labelSize={LABEL_SIZE} />);

      const label = screen.getByText(LABEL_TEXT);
      expect(label).toHaveAttribute('data-size', LABEL_SIZE);
    });
  });

  describe('Event and State', () => {
    it('calls onChange when the checkbox is clicked', () => {
      const mockOnChange = jest.fn();
      renderV3(<Checkbox {...props} onChange={mockOnChange} />);

      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);
      expect(mockOnChange).toHaveBeenCalledTimes(1);
    });

    it('supports checked and unchecked states', () => {
      const { rerender } = renderV3(<Checkbox {...props} value={true} />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();

      rerender(<Checkbox {...props} value={false} />);
      expect(checkbox).not.toBeChecked();
    });
  });
});
