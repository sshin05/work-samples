import React from 'react';
import { render, screen, fireEvent } from '@@/test-utils';
import { ServerErrorFallback } from './ServerErrorFallback';

describe('ErrorFallback', () => {
  const mockResetErrorBoundary = jest.fn();

  beforeEach(() => {
    render(<ServerErrorFallback resetErrorBoundary={mockResetErrorBoundary} />);
  });

  it('renders error message', () => {
    expect(
      screen.getByText(
        /Looks like Digital University is having an unexpected issue./i
      )
    ).toBeInTheDocument();
  });

  it('renders suggestions', () => {
    expect(
      screen.getByText(/Refresh the page after 30 seconds/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Try again in 30 minutes/i)).toBeInTheDocument();
  });

  it('renders Try again button', () => {
    const button = screen.getByRole('button', { name: /Try again/i });
    expect(button).toBeInTheDocument();
  });

  it('calls resetErrorBoundary on button click', () => {
    const button = screen.getByRole('button', { name: /Try again/i });
    fireEvent.click(button);
    expect(mockResetErrorBoundary).toHaveBeenCalledTimes(1);
  });
});
