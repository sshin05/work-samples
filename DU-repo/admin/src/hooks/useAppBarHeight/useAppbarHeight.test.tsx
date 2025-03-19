import React from 'react';
import { useAppBarHeight } from './useAppBarHeight';
import { render, screen } from '@@/test-utils';

const MockRender = () => {
  const heightOffset = useAppBarHeight();
  return <div>{heightOffset}</div>;
};

describe('useAppBarHeight hook', () => {
  it('should handle innerWidth < 767', () => {
    global.innerWidth = 766;

    render(<MockRender />);
    expect(screen.getByText('44')).toBeInTheDocument();
  });

  it('should handle innerWidth >= 767', () => {
    global.innerWidth = 767;

    render(<MockRender />);
    expect(screen.getByText('60')).toBeInTheDocument();
  });
});
