import React from 'react';
import { render, screen } from '@testing-library/react';
import { SideDrawerDetailsCard } from './SideDrawerDetailsCard';

describe('SideDrawerDetailsCard', () => {
  it('renders a generic card with the provided label and value', () => {
    render(<SideDrawerDetailsCard label="Type" value="Admin" />);
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getAllByText('Admin')).toHaveLength(2);
  });

  it('renders a generic card with a default value when value is null', () => {
    render(<SideDrawerDetailsCard label="Type" value={null} />);
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('--')).toBeInTheDocument();
  });

  it('renders a Duty Station card with a Location icon and correct texts', () => {
    const { container } = render(
      <SideDrawerDetailsCard label="Duty Station" value="Base A" />
    );

    expect(screen.getByText('Duty Station')).toBeInTheDocument();
    expect(screen.getAllByText('Base A')).toHaveLength(2);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('renders a Duty Station card with a Location icon and default value when value is null', () => {
    const { container } = render(
      <SideDrawerDetailsCard label="Duty Station" value={null} />
    );

    expect(screen.getByText('Duty Station')).toBeInTheDocument();
    expect(screen.getByText('--')).toBeInTheDocument();
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });
});
