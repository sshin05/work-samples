import React from 'react';
import { render, screen } from '@@/test-utils';
import { DuiBreadcrumbs } from '.';

interface SetupAndRenderArgs {
  context?: 'light' | 'dark';
  trailingSlash?: boolean;
  highlightLast?: boolean;
}

describe('DuiBreadcrumbs', () => {
  const paths = [
    {
      text: 'Home',
      href: '/'
    },
    {
      text: 'Products',
      href: '/products'
    },
    {
      text: 'Product',
      href: '/products/product'
    }
  ];

  const setupAndRender = (args: SetupAndRenderArgs = {}) => {
    render(<DuiBreadcrumbs paths={paths} {...args} />);
  };

  it('should render a breadcrumb', () => {
    setupAndRender();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Product')).toBeInTheDocument();
  });

  it('should render a breadcrumb with a trailing slash', () => {
    setupAndRender({ trailingSlash: true });
    const dividers = screen.getAllByText('/');
    expect(dividers.length).toBe(3);
  });

  it('should render a breadcrumb without highlighting last item', () => {
    setupAndRender({ highlightLast: false });
    expect(screen.getByText('Product')).toHaveStyle('font-weight: 400');
  });

  it('should render a breadcrumb with a dark context', () => {
    setupAndRender({ context: 'dark' });
    expect(screen.getByText('Home')).toHaveStyle('color: #E4E3E9');
  });
});
