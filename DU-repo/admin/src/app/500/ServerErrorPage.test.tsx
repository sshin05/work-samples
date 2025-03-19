import React from 'react';
import { useRouter } from 'next/navigation';
import { render, screen, fireEvent } from '@@/test-utils';
import { ServerErrorPage } from './ServerErrorPage';

jest.mock('next-auth/react');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    push: mockPush,
    back: mockBack
  }))
}));

const mockPush = jest.fn();
const mockBack = jest.fn();

beforeAll(() => {
  (useRouter as jest.Mock).mockReturnValue({
    push: mockPush,
    back: mockBack
  });
});

describe('ServerErrorPage', () => {
  it('renders the error message', () => {
    render(<ServerErrorPage />);
    const errorMessage = screen.getByText(
      /Looks like Digital University is having an unexpected issue./i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders the instructions', () => {
    render(<ServerErrorPage />);
    const instructions = screen.getByText(
      /We'll be up and running soon. In the meantime, here is what you can do:/i
    );
    expect(instructions).toBeInTheDocument();
  });

  it('renders the refresh button', () => {
    render(<ServerErrorPage />);
    const refreshButton = screen.getByRole('button', { name: /Refresh page/i });
    expect(refreshButton).toBeInTheDocument();
  });

  it('refresh button calls router.back()', () => {
    render(<ServerErrorPage />);
    const refreshButton = screen.getByRole('button', { name: /Refresh page/i });

    fireEvent.click(refreshButton);
    expect(mockBack).toHaveBeenCalled();
  });
});
