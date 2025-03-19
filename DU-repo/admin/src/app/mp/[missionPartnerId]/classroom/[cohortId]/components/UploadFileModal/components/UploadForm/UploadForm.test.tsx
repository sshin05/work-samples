import React from 'react';
import { render, screen } from '@@/test-utils';
import { UploadForm } from './UploadForm';
import type { Control, FieldValues } from 'react-hook-form';
import type { processStatus } from '@cerberus/react';

jest.mock('@cerberus/react', () => ({
  ...jest.requireActual('@cerberus/react'),
  FileUploader: () => <div>MockFileUploader</div>,
  FileStatus: () => <div>MockFileStatus</div>
}));

jest.mock('@cerberus/icons', () => ({
  WarningAltFilled: () => <div data-testid="warning-icon" />
}));

const mockOnAttachFile = jest.fn();

const defaultProps = () => ({
  formControl: {} as unknown as Control<FieldValues, any>,
  attachedFile: null,
  uploadStatus: 'todo' as processStatus,
  onAttachFile: mockOnAttachFile,
  displayRequiredError: false,
  isUploading: false,
  didError: false,
  didUpload: false
});

describe('UploadForm', () => {
  beforeEach(() => {
    mockOnAttachFile.mockClear();
  });

  it('renders the FileUploader component', () => {
    render(<UploadForm {...defaultProps()} />);
    expect(screen.getByText('MockFileUploader')).toBeInTheDocument();
  });

  it('renders the error message when displayRequiredError is true', () => {
    render(<UploadForm {...defaultProps()} displayRequiredError={true} />);
    expect(
      screen.getByText('A file is required to continue')
    ).toBeInTheDocument();
    expect(screen.getByTestId('warning-icon')).toBeInTheDocument();
  });

  it('does not render the error message when displayRequiredError is false', () => {
    render(<UploadForm {...defaultProps()} />);
    expect(
      screen.queryByText('A file is required to continue')
    ).not.toBeInTheDocument();
  });
});
