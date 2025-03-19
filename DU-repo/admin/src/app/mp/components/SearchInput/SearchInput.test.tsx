import React from 'react';
import { renderV3, screen, fireEvent } from '@@/test-utils';
import { SearchInput } from './SearchInput';

const ID = 'test-partner';
const PLACEHOLDER = 'Search Test';
const VALUE = 'test value';
const UPDATED_VALUE = 'updated value';

describe('SearchInput', () => {
  const mockOnChange = jest.fn();
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    id: ID,
    value: VALUE,
    onChange: mockOnChange,
    onSearch: mockOnSearch,
    placeholder: PLACEHOLDER
  };

  describe('Basic Rendering', () => {
    it('renders the input element', () => {
      renderV3(<SearchInput {...defaultProps} />);
      const inputElement = screen.getByRole('textbox');

      expect(inputElement).toBeInTheDocument();
      expect(inputElement).toHaveAttribute('id', ID);
      expect(inputElement).toHaveValue(VALUE);
      expect(inputElement).toHaveProperty('placeholder', PLACEHOLDER);
    });

    it('uses the default placeholder when none is provided', () => {
      renderV3(<SearchInput {...defaultProps} placeholder={null} />);
      const inputElement = screen.getByPlaceholderText('Search');

      expect(inputElement).toBeInTheDocument();
    });
  });

  describe('Events', () => {
    it('calls onChange when the input value changes', () => {
      renderV3(<SearchInput {...defaultProps} />);
      const inputElement = screen.getByRole('textbox');
      fireEvent.change(inputElement, { target: { value: UPDATED_VALUE } });

      expect(mockOnChange).toHaveBeenCalledWith(UPDATED_VALUE);
    });

    it('calls onSearch when the Enter key is pressed', () => {
      renderV3(<SearchInput {...defaultProps} />);
      const inputElement = screen.getByRole('textbox');
      fireEvent.keyDown(inputElement, { key: 'Enter' });

      expect(mockOnSearch).toHaveBeenCalledTimes(1);
    });

    it('does not call onSearch when a key other than Enter is pressed', () => {
      renderV3(<SearchInput {...defaultProps} />);
      const inputElement = screen.getByRole('textbox');
      fireEvent.keyDown(inputElement, { key: 'Space' });

      expect(mockOnSearch).not.toHaveBeenCalled();
    });
  });
});
