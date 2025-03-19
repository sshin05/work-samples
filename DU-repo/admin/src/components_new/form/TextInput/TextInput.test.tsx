import React from 'react';
import { renderV3, screen } from '@@/test-utils';
import { TextInput } from './TextInput';

describe('TextInput Component', () => {
  const requiredProps = {
    name: 'username',
    label: 'username'
  };

  describe('Basic Rendering', () => {
    it('renders with required props (name)', () => {
      renderV3(<TextInput {...requiredProps} />);
      const inputElement = screen.getByRole('textbox');
      expect(inputElement).toBeInTheDocument();
      expect(inputElement).toHaveAttribute('name', requiredProps.name);
    });

    it('uses name as id when id is not provided', () => {
      renderV3(<TextInput {...requiredProps} />);
      const inputElement = screen.getByRole('textbox');
      expect(inputElement).toHaveAttribute('id', requiredProps.name);
    });

    it('renders with a custom id when provided', () => {
      const props = {
        ...requiredProps,
        id: 'custom-id'
      };
      renderV3(<TextInput {...props} />);
      const inputElement = screen.getByRole('textbox');
      expect(inputElement).toHaveAttribute('id', props.id);
    });
  });

  describe('Labels and Messages', () => {
    it('displays a label when label prop is provided', () => {
      renderV3(<TextInput {...requiredProps} />);
      const labelElement = screen.getByText(requiredProps.label);
      expect(labelElement).toBeInTheDocument();
    });

    it('displays help text when helpText prop is provided', () => {
      const props = {
        ...requiredProps,
        helpText: 'This is help text'
      };
      renderV3(<TextInput {...props} />);
      const helpTextElement = screen.getByText(props.helpText);
      expect(helpTextElement).toBeInTheDocument();
    });

    it('displays an error message when errorMessage prop is provided', () => {
      renderV3(
        <TextInput
          name="username"
          errorMessage="This is an error message"
          label="username"
        />
      );
      const errorMessageElement = screen.getByText('This is an error message');
      expect(errorMessageElement).toBeInTheDocument();
    });

    it('displays only error text when helpText and errorMessage props are provided', () => {
      const props = {
        ...requiredProps,
        helpText: 'This is help text',
        errorMessage: 'This is an error message'
      };
      renderV3(<TextInput {...props} />);
      expect(screen.queryByText('This is help text')).not.toBeInTheDocument();
      expect(screen.getByText('This is an error message')).toBeInTheDocument();
    });

    it('correctly sets aria-describedby attribute when helpText and errorMessage are provided', () => {
      const props = {
        ...requiredProps,
        helpText: 'This is help text',
        errorMessage: 'This is an error message'
      };
      renderV3(<TextInput {...props} />);
      const inputElement = screen.getByRole('textbox');
      expect(inputElement).toHaveAttribute(
        'aria-describedby',
        `help:${props.name} error:${props.name}`
      );
    });
  });

  describe('Attributes Handling', () => {
    it('applies disabled attribute when disabled prop is true', () => {
      renderV3(<TextInput {...requiredProps} disabled />);
      const inputElement = screen.getByRole('textbox');
      expect(inputElement).toBeDisabled();
    });

    it('applies readOnly attribute when readOnly prop is true', () => {
      renderV3(<TextInput {...requiredProps} readOnly />);
      const inputElement = screen.getByRole('textbox');
      expect(inputElement).toHaveAttribute('readOnly');
    });
  });
});
