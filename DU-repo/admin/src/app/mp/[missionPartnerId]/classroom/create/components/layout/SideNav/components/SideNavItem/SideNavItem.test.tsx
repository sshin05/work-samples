import { render, screen, fireEvent } from '@testing-library/react';
import { getTextColor, SideNavItem } from './SideNavItem';

describe('SideNavItem Component', () => {
  const mockOnNavItemClick = jest.fn();

  const FIRST_STEP_DISPLAY_TEXT = 'First Step Display Text';
  const defaultProps = {
    isSelected: false,
    isComplete: false,
    isDisabled: false,
    displayName: FIRST_STEP_DISPLAY_TEXT,
    onNavItemClick: mockOnNavItemClick
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the display name', () => {
    render(<SideNavItem {...defaultProps} />);
    expect(screen.getByText(FIRST_STEP_DISPLAY_TEXT)).toBeInTheDocument();
  });

  it('should call onNavItemClick when the button is clicked', () => {
    render(<SideNavItem {...defaultProps} />);

    const button = screen.getByRole('button', {
      name: FIRST_STEP_DISPLAY_TEXT
    });
    fireEvent.click(button);

    expect(mockOnNavItemClick).toHaveBeenCalled();
  });

  it('should disable the button when isDisabled is true', () => {
    render(<SideNavItem {...defaultProps} isDisabled={true} />);
    const button = screen.getByRole('button', {
      name: FIRST_STEP_DISPLAY_TEXT
    });
    expect(button).toBeDisabled();
  });

  describe('getTextColor', () => {
    it.each([
      {
        isSelected: true,
        isDisabled: false,
        expected: 'action.text.200',
        case: 'returns the expected color when isSelected is true and isDisable is false'
      },
      {
        isSelected: true,
        isDisabled: true,
        expected: 'action.text.200',
        case: 'returns the expected color when isSelected is true and isDisable is true'
      },
      {
        isSelected: false,
        isDisabled: true,
        expected: 'page.text.100',
        case: 'returns the expected color when isSelected is false and isDisable is true'
      },
      {
        isSelected: false,
        isDisabled: false,
        expected: null,
        case: 'returns null (falls back to default color) when not selected or disabled'
      }
    ])('$case', ({ isSelected, isDisabled, expected }) => {
      const actual = getTextColor(isDisabled, isSelected);

      expect(actual).toBe(expected);
    });
  });
});
