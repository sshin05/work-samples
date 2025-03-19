import React from 'react';
import { useRouter } from 'next/navigation';
import { renderV3, fireEvent } from '@@/test-utils';
import { RefreshPageButton } from './RefreshPageButton';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));
describe('RefreshPageButton', () => {
  it('renders correctly', () => {
    const { getByText } = renderV3(<RefreshPageButton />);
    expect(getByText('Refresh page')).toBeInTheDocument();
  });

  it('calls window.location.reload when clicked', () => {
    const refreshMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      refresh: refreshMock
    });

    const { getByText } = renderV3(<RefreshPageButton />);
    fireEvent.click(getByText('Refresh page'));
    expect(refreshMock).toHaveBeenCalled();
  });
});
