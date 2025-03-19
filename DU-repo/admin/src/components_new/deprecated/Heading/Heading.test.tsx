import React from 'react';
import { render, screen } from '@@/test-utils';
import { Heading } from '.';

describe('Heading', () => {
  it('should render a Heading', () => {
    render(<Heading hasEyebrow>dummy text</Heading>);

    expect(screen.getByText('dummy text')).toBeInTheDocument();
  });
});
