import React from 'react';
import { renderV3, fireEvent } from '@@/test-utils';
import { useRouter } from 'next/navigation';
import { BackArrowButton } from './BackArrowButton';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

describe('BackArrowButton', () => {
  it('renders correctly', () => {
    const { getByText } = renderV3(<BackArrowButton />);
    expect(getByText('Back')).toBeInTheDocument();
  });

  it('calls router.back when button is clicked', () => {
    const backMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ back: backMock });

    const { getByText } = renderV3(<BackArrowButton />);
    fireEvent.click(getByText('Back'));

    expect(backMock).toHaveBeenCalled();
  });
});
