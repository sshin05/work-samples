import React from 'react';
import { render, screen } from '@@/test-utils';
import { InlineLoading } from '@/components_new/deprecated/InlineLoading';

describe('inline-loading', () => {
  it('should render default active state', () => {
    render(<InlineLoading status="active" description="some description" />);

    expect(screen.getByText('loading')).toBeInTheDocument();
  });
  it('should render error state', () => {
    render(<InlineLoading status="error" description="some description" />);

    expect(screen.getByText('error')).toBeInTheDocument();
  });
});
