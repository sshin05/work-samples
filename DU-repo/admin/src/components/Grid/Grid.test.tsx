import React from 'react';
import { render, screen } from '@@/test-utils';
import { Grid } from '.';

describe('grid', () => {
  it('should render a empty grid', () => {
    render(<Grid data-testid="emptygrid" />);

    expect(screen.getByTestId('emptygrid')).toBeInTheDocument();
  });
});
