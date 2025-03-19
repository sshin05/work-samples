import React from 'react';
import { screen, render, fireEvent } from '@@/test-utils';
import { FormTypeSelector } from './FormTypeSelector';
import { FORM_TYPES } from '../../UploadFileModal.types';

describe('FormTypeSelector', () => {
  const mockOnChange = jest.fn();

  const renderComponent = (selectedFormType: FORM_TYPES) => {
    return render(
      <FormTypeSelector
        selectedFormType={selectedFormType}
        onChange={mockOnChange}
      />
    );
  };

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders both radio options', () => {
    renderComponent(FORM_TYPES.UPLOAD);

    expect(screen.getByLabelText('Upload File')).toBeInTheDocument();
    expect(screen.getByLabelText('Add a Link')).toBeInTheDocument();
  });

  it('marks the "Upload File" radio as checked when selectedFormType is UPLOAD', () => {
    renderComponent(FORM_TYPES.UPLOAD);

    const uploadRadioElement = screen.getByLabelText('Upload File');
    expect(uploadRadioElement).toBeChecked();
  });

  it('marks the "Add a Link" radio as checked when selectedFormType is LINK', () => {
    renderComponent(FORM_TYPES.LINK);

    const linkRadioElement = screen.getByLabelText('Add a Link');
    expect(linkRadioElement).toBeChecked();
  });

  it('calls onChange with the correct value when "Upload File" is clicked', () => {
    renderComponent(FORM_TYPES.LINK);

    const uploadRadio = screen.getByLabelText('Upload File');
    fireEvent.click(uploadRadio);

    expect(mockOnChange).toHaveBeenCalledWith(FORM_TYPES.UPLOAD);
  });

  it('calls onChange with the correct value when "Add a Link" is clicked', () => {
    renderComponent(FORM_TYPES.UPLOAD);

    const linkRadioElement = screen.getByLabelText('Add a Link');
    fireEvent.click(linkRadioElement);

    expect(mockOnChange).toHaveBeenCalledWith(FORM_TYPES.LINK);
  });

  it('does not call onChange when a radio is already selected', () => {
    renderComponent(FORM_TYPES.UPLOAD);

    const uploadRadioElement = screen.getByLabelText('Upload File');
    fireEvent.click(uploadRadioElement);

    expect(mockOnChange).not.toHaveBeenCalled();
  });
});
