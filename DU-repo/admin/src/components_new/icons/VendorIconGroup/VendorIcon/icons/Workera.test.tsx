import React from 'react';
import { render, screen } from '@@/test-utils';
import { Workera } from './Workera';

describe('Workera', () => {
  it('should render a dark icon', () => {
    render(<Workera variant="dark" />);

    const icon = screen.getByRole('img');
    const path = icon.querySelector('path');
    const fill = path.getAttribute('data-fill');

    expect(fill).toBe('purple');
  });

  it('should render a light icon', () => {
    render(<Workera variant="light" />);

    const icon = screen.getByRole('img');
    const path = icon.querySelector('path');
    const fill = path.getAttribute('data-fill');

    expect(fill).toBe('white');
  });

  it('should render a small icon', () => {
    render(<Workera size="s" />);

    const icon = screen.getByRole('img');
    const width = icon.getAttribute('width');
    const height = icon.getAttribute('height');

    expect(width).toBe('20px');
    expect(height).toBe('20px');
  });

  it('should render a medium icon', () => {
    render(<Workera size="m" />);

    const icon = screen.getByRole('img');
    const width = icon.getAttribute('width');
    const height = icon.getAttribute('height');

    expect(width).toBe('60px');
    expect(height).toBe('60px');
  });

  it('should render a large icon', () => {
    render(<Workera size="l" />);

    const icon = screen.getByRole('img');
    const width = icon.getAttribute('width');
    const height = icon.getAttribute('height');

    expect(width).toBe('100px');
    expect(height).toBe('100px');
  });

  it('should render an xl icon', () => {
    render(<Workera size="xl" />);

    const icon = screen.getByRole('img');
    const width = icon.getAttribute('width');
    const height = icon.getAttribute('height');

    expect(width).toBe('150px');
    expect(height).toBe('150px');
  });

  it('should be accessible', () => {
    render(<Workera />);

    expect(screen.getByRole('img')).toHaveAccessibleName('The Workera Logo');
  });
});
