import React from 'react';
import { render, screen } from '@@/test-utils';
import { Breadcrumbs } from './Breadcrumbs';

describe('Breadcrumbs', () => {
  const breadcrumbs = [
    {
      text: 'Admin',
      href: '/'
    },
    {
      text: 'Marketplace',
      href: '/marketplace'
    },
    {
      text: 'Products',
      href: '/marketplace/products'
    }
  ];

  it('should render the breadcrumbs', () => {
    render(<Breadcrumbs breadcrumbs={breadcrumbs} loading={false} />);

    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('Marketplace')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
  });

  it('renders dividers between the breadcrumbs', () => {
    render(<Breadcrumbs breadcrumbs={breadcrumbs} loading={false} />);

    const dividers = screen.getAllByText('/');
    expect(dividers.length).toBe(2);
  });
});
