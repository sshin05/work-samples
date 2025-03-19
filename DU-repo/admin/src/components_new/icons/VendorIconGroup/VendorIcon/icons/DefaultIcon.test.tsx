import React from 'react';
import { render } from '@@/test-utils';
import { DefaultIcon } from './DefaultIcon';

describe('DefaultIcon', () => {
  it('should render a small icon', () => {
    const { getByRole } = render(<DefaultIcon size="s" />);

    const icon = getByRole('img');
    const width = icon.getAttribute('width');
    const height = icon.getAttribute('height');

    expect(width).toBe('20px');
    expect(height).toBe('20px');
  });

  it('should render a medium icon', () => {
    const { getByRole } = render(<DefaultIcon size="m" />);

    const icon = getByRole('img');
    const width = icon.getAttribute('width');
    const height = icon.getAttribute('height');

    expect(width).toBe('60px');
    expect(height).toBe('60px');
  });

  it('should render a large icon', () => {
    const { getByRole } = render(<DefaultIcon size="l" />);

    const icon = getByRole('img');
    const width = icon.getAttribute('width');
    const height = icon.getAttribute('height');

    expect(width).toBe('100px');
    expect(height).toBe('100px');
  });

  it('should render an xl icon', () => {
    const { getByRole } = render(<DefaultIcon size="xl" />);

    const icon = getByRole('img');
    const width = icon.getAttribute('width');
    const height = icon.getAttribute('height');

    expect(width).toBe('150px');
    expect(height).toBe('150px');
  });

  it('should render a modal-sized icon', () => {
    const { getByRole } = render(<DefaultIcon size="du-create-modal" />);

    const icon = getByRole('img');
    const width = icon.getAttribute('width');
    const height = icon.getAttribute('height');

    expect(width).toBe('48px');
    expect(height).toBe('48px');
  });

  it('should render an narrow modal-sized icon', () => {
    const { getByRole } = render(<DefaultIcon size="du-create-modal-narrow" />);

    const icon = getByRole('img');
    const width = icon.getAttribute('width');
    const height = icon.getAttribute('height');

    expect(width).toBe('31px');
    expect(height).toBe('31px');
  });

  it('should be accessible', () => {
    const { getByRole } = render(<DefaultIcon />);

    expect(getByRole('img')).toHaveAccessibleName(
      'The Digital University Logo'
    );
  });
});
