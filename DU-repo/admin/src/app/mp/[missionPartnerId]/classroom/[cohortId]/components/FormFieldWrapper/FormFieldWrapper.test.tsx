import React from 'react';
import { FormFieldWrapper } from '.';
import type { ControllerFieldState } from 'react-hook-form';
import { screen, render } from '@@/test-utils';

describe('FormFieldWrapper', () => {
  const defaultProps = () => ({
    fieldState: {
      touched: true,
      error: null
    } as unknown as ControllerFieldState,
    fieldName: 'Mock Field Name',
    fieldDescription: 'Mock Field Description',
    isRequired: false
  });

  it('renders the field label with the correct name', () => {
    const props = defaultProps();

    render(
      <FormFieldWrapper {...props}>
        <input id="testField" />
      </FormFieldWrapper>
    );

    expect(screen.getByText(props.fieldName)).toBeInTheDocument();
  });

  it('renders the required text when `isRequired` is true', () => {
    const props = {
      ...defaultProps(),
      isRequired: true
    };

    render(
      <FormFieldWrapper {...props}>
        <input id="testField" />
      </FormFieldWrapper>
    );

    expect(screen.getByText('(required)')).toBeInTheDocument();
  });

  it('does not render the required text when `isRequired` is false', () => {
    const props = {
      ...defaultProps(),
      isRequired: false
    };

    render(
      <FormFieldWrapper {...props}>
        <input id="testField" />
      </FormFieldWrapper>
    );

    expect(screen.queryByText('(required)')).not.toBeInTheDocument();
  });

  it('renders the field description when provided', () => {
    const props = defaultProps();

    render(
      <FormFieldWrapper {...props}>
        <input id="testField" />
      </FormFieldWrapper>
    );

    expect(screen.getByText(props.fieldDescription)).toBeInTheDocument();
  });

  it('does not render the field description when it is not provided', () => {
    const props = {
      ...defaultProps(),
      fieldDescription: undefined
    };

    render(
      <FormFieldWrapper {...props}>
        <input id="testField" />
      </FormFieldWrapper>
    );

    expect(
      screen.queryByText(defaultProps().fieldDescription)
    ).not.toBeInTheDocument();
  });

  it('renders an error message when provided', () => {
    const mockErrorMessage = 'Mock Error Message';
    const props = {
      ...defaultProps(),
      fieldState: {
        ...defaultProps().fieldState,
        error: {
          message: mockErrorMessage
        }
      } as unknown as ControllerFieldState
    };

    render(
      <FormFieldWrapper {...props}>
        <input id="testField" />
      </FormFieldWrapper>
    );

    expect(screen.getByText(mockErrorMessage)).toBeInTheDocument();
  });

  it('does not render the error message when it is not provided', () => {
    const mockErrorMessage = 'Mock Error Message';
    const props = {
      ...defaultProps(),
      fieldState: {
        ...defaultProps().fieldState,
        error: {}
      } as unknown as ControllerFieldState
    };

    render(
      <FormFieldWrapper {...props}>
        <input id="testField" />
      </FormFieldWrapper>
    );

    expect(screen.queryByText(mockErrorMessage)).not.toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(
      <FormFieldWrapper {...defaultProps()}>
        <input id="testField" />
      </FormFieldWrapper>
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('applies the correct id to the field message', () => {
    const props = defaultProps();

    render(
      <FormFieldWrapper {...defaultProps()}>
        <input id="testField" />
      </FormFieldWrapper>
    );

    const fieldMessage = screen.getByText(props.fieldDescription);
    expect(fieldMessage).toHaveAttribute('id', 'help:Mock Field Name');
  });
});
