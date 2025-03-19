import React from 'react';
import { render, screen } from '@@/test-utils';
import { type UploadFormProps, UploadForm } from './UploadForm';
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

const defaultProps = (): UploadFormProps => ({
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
      screen.getByText('A CSV file is required to continue')
    ).toBeInTheDocument();
    expect(screen.getByTestId('warning-icon')).toBeInTheDocument();
  });

  it('does not render the error message when displayRequiredError is false', () => {
    render(<UploadForm {...defaultProps()} />);
    expect(
      screen.queryByText('A CSV file is required to continue')
    ).not.toBeInTheDocument();
  });
});
