import React from 'react';
import { useSession } from 'next-auth/react';
import { renderV3, screen, fireEvent } from '@@/test-utils';
import ParentLevelErrorBoundary from './error';
import { useRouter } from 'next/navigation';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';

jest.mock('@apollo/client');
jest.mock('./components/providers/getApolloClient');
jest.mock('next-auth/react');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    push: mockPush
  }))
}));

const mockSignOut = jest.fn();
const mockReset = jest.fn();
const mockPush = jest.fn();

const renderComponent = (error: Error) => {
  return renderV3(
    <ParentLevelErrorBoundary error={error} reset={mockReset}>
      <div>Child Component</div>
    </ParentLevelErrorBoundary>
  );
};

const mockErrorMessage = 'Test error message';
const mockError = new Error(mockErrorMessage);

describe('ParentLevelErrorBoundary', () => {
  beforeAll(() => {
    (useSession as jest.Mock).mockReturnValue({ data: {} });
    (
      jest.requireMock('next-auth/react').signOut as jest.Mock
    ).mockImplementation(mockSignOut);
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush
    });
  });

  it('should display the error message', () => {
    renderComponent(mockError);

    expect(screen.getByText(mockErrorMessage)).toBeInTheDocument();
  });

  it('should call reset function when "Try Again" button is clicked', () => {
    renderComponent(mockError);

    fireEvent.click(screen.getByText('Try Again'));
    expect(mockReset).toHaveBeenCalled();
  });

  it('should navigate to root page when "Return to Dashboard" button is clicked', () => {
    renderComponent(mockError);

    fireEvent.click(screen.getByText('Return to Dashboard'));

    expect(mockPush).toHaveBeenCalledWith(
      getRouteUrl(routeGenerators.AdminHome())
    );
    expect(window.location.pathname).toBe('/');
  });

  it('should call signOut function when "Sign Out" button is clicked', () => {
    renderComponent(mockError);

    fireEvent.click(screen.getByText('Sign Out'));
    expect(mockSignOut).toHaveBeenCalled();
  });

  it('should render children components', () => {
    renderComponent(mockError);

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });
});
