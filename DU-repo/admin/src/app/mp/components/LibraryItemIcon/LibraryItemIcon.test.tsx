jest.mock('@cerberus/icons', () => ({
  Document: jest.fn(() => <svg data-testid="Document" />),
  Video: jest.fn(() => <svg data-testid="Video" />),
  VolumeUp: jest.fn(() => <svg data-testid="Audio" />),
  Link: jest.fn(() => <svg data-testid="Link" />)
}));

import { render, screen } from '@testing-library/react';
import { LibraryItemIcon } from './LibraryItemIcon';

describe('LibraryItemIcon', () => {
  it('renders the correct icon for "File" type', () => {
    render(<LibraryItemIcon type="File" />);
    expect(screen.getByTestId('Document')).toBeInTheDocument();
  });

  it('renders the correct icon for "Video" type', () => {
    render(<LibraryItemIcon type="Video" />);
    expect(screen.getByTestId('Video')).toBeInTheDocument();
  });

  it('renders the correct icon for "Audio" type', () => {
    render(<LibraryItemIcon type="Audio" />);
    expect(screen.getByTestId('Audio')).toBeInTheDocument();
  });

  it('renders the correct icon for "Link" type', () => {
    render(<LibraryItemIcon type="Link" />);
    expect(screen.getByTestId('Link')).toBeInTheDocument();
  });
});
