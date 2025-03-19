import { screen, fireEvent } from '@@/test-utils';
import { render } from '@testing-library/react';

import { Footer } from './Footer';
import { useRouteParams } from '@/hooks/useRouteParams';
import { act, useContext } from 'react';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn().mockReturnValue({})
}));

jest.mock('@/hooks/useRouteParams');
jest.mock('@/utils/getRouteUrl', () => ({
  getRouteUrl: jest.fn().mockReturnValue('/classrooms/cohortId'),
  routeGenerators: {
    Classrooms: jest.fn()
  }
}));

describe('Footer', () => {
  const mockOnNextPageSelected = jest.fn();

  const defaultProps = {
    nextPageName: 'Details',
    isLastPage: false,
    onNextPageSelected: mockOnNextPageSelected,
    isNextPageEnabled: true
  };

  beforeEach(() => {
    (useRouteParams as jest.Mock).mockReturnValue({ missionPartnerId: '123' });
    (useContext as jest.Mock).mockReturnValue({
      isLoadingCohort: false
    });
  });

  it('should render the footer with the expected defaults', () => {
    render(<Footer {...defaultProps} />);

    const cancelButton = screen.getByText('Cancel');

    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton.closest('a')).toHaveAttribute(
      'href',
      '/classrooms/cohortId'
    );

    const nextButton = screen.getByText('Next: Details');

    expect(nextButton).toBeInTheDocument();
  });

  it('should call onNextPageSelected when the "Next" button is clicked', async () => {
    render(<Footer {...defaultProps} />);

    await act(async () => {
      const nextButton = screen.getByText('Next: Details');
      fireEvent.click(nextButton);
    });

    expect(mockOnNextPageSelected).toHaveBeenCalledTimes(1);
  });

  it('should disable the "Next" button when isNextPageEnabled is false', () => {
    render(<Footer {...defaultProps} isNextPageEnabled={false} />);

    const nextButton = screen.getByText('Next: Details');

    expect(nextButton).toBeDisabled();
  });

  it('should disable the "Next" button when isLoadingCohort is true', () => {
    (useContext as jest.Mock).mockReturnValue({
      isLoadingCohort: true
    });

    render(<Footer {...defaultProps} />);

    const nextButton = screen.getByText('Next: Details');

    expect(nextButton).toBeDisabled();
    expect(nextButton).toHaveAttribute('aria-busy', 'true');
  });

  it('should show the "Publish" button when on the last page', () => {
    render(<Footer {...defaultProps} isLastPage={true} />);

    const publishButton = screen.getByText('Publish');
    const nextButton = screen.queryByText('Next: Details');

    expect(publishButton).toBeInTheDocument();
    expect(nextButton).not.toBeInTheDocument();
  });
});
