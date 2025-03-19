import React from 'react';
import { render, screen } from '@@/test-utils';
import { Icon } from '.';

describe('Icon', () => {
  it('should render an icon', () => {
    render(<Icon name="WebAsset" />);

    expect(screen.getByText('WebAsset')).toBeInTheDocument();
  });

  it('should render an icon extra small', () => {
    render(<Icon name="WebAsset" size="xs" />);

    expect(screen.getByText('WebAsset')).toHaveStyle('font-size: 16px;');
  });

  it('should render an icon small', () => {
    render(<Icon name="WebAsset" size="s" />);

    expect(screen.getByText('WebAsset')).toHaveStyle('font-size: 18px;');
  });

  it('should render an icon medium', () => {
    render(<Icon name="WebAsset" size="m" />);

    expect(screen.getByText('WebAsset')).toHaveStyle('font-size: 24px;');
  });

  it('should render an icon large', () => {
    render(<Icon name="WebAsset" size="l" />);

    expect(screen.getByText('WebAsset')).toHaveStyle('font-size: 36px;');
  });

  it('should render an icon extra large', () => {
    render(<Icon name="WebAsset" size="xl" />);

    expect(screen.getByText('WebAsset')).toHaveStyle('font-size: 48px;');
  });
});
