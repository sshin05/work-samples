import React from 'react';
import { render, screen } from '@@/test-utils';
import { Coursera } from './Coursera';

describe('Coursera', () => {
  it('should render a dark icon', () => {
    render(<Coursera variant="dark" />);

    const icon = screen.getByRole('img');
    const path = icon.querySelector('mask');
    const id = path.getAttribute('id');

    expect(id).toBe('path-1-inside-1_2709_30952');
  });

  it('should render a light icon', () => {
    render(<Coursera variant="light" />);

    const icon = screen.getByRole('img');
    const path = icon.querySelector('mask');
    const id = path.getAttribute('id');

    expect(id).toBe('path-1-inside-1_593_23126');
  });

  it('should render a small icon', () => {
    render(<Coursera size="s" />);

    const icon = screen.getByRole('img');
    const width = icon.getAttribute('width');
    const height = icon.getAttribute('height');

    expect(width).toBe('20px');
    expect(height).toBe('20px');
  });

  it('should render a medium icon', () => {
    render(<Coursera size="m" />);

    const icon = screen.getByRole('img');
    const width = icon.getAttribute('width');
    const height = icon.getAttribute('height');

    expect(width).toBe('60px');
    expect(height).toBe('60px');
  });

  it('should render a large icon', () => {
    render(<Coursera size="l" />);

    const icon = screen.getByRole('img');
    const width = icon.getAttribute('width');
    const height = icon.getAttribute('height');

    expect(width).toBe('100px');
    expect(height).toBe('100px');
  });

  it('should render an xl icon', () => {
    render(<Coursera size="xl" />);

    const icon = screen.getByRole('img');
    const width = icon.getAttribute('width');
    const height = icon.getAttribute('height');

    expect(width).toBe('150px');
    expect(height).toBe('150px');
  });

  it('should be accessible', () => {
    render(<Coursera />);

    expect(screen.getByRole('img')).toHaveAccessibleName('The Coursera Logo');
  });
});
