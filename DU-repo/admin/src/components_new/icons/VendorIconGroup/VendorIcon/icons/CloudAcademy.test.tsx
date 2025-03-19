import { CloudAcademy } from './CloudAcademy';
import { render, screen } from '@@/test-utils';

describe('CloudAcademy', () => {
  it('should render a dark icon', () => {
    render(<CloudAcademy variant="dark" />);

    const icon = screen.getByRole('img');
    const path = icon.querySelector('path');
    const fill = path.getAttribute('data-fill');

    expect(fill).toBe('purple');
  });

  it('should render a light icon', () => {
    render(<CloudAcademy variant="light" />);

    const icon = screen.getByRole('img');
    const path = icon.querySelector('path');
    const fill = path.getAttribute('data-fill');

    expect(fill).toBe('white');
  });

  it('should render a small icon', () => {
    render(<CloudAcademy size="s" />);

    const icon = screen.getByRole('img');
    const width = icon.getAttribute('width');
    const height = icon.getAttribute('height');

    expect(width).toBe('20px');
    expect(height).toBe('20px');
  });

  it('should render a medium icon', () => {
    render(<CloudAcademy size="m" />);

    const icon = screen.getByRole('img');
    const width = icon.getAttribute('width');
    const height = icon.getAttribute('height');

    expect(width).toBe('60px');
    expect(height).toBe('60px');
  });

  it('should render a large icon', () => {
    render(<CloudAcademy size="l" />);

    const icon = screen.getByRole('img');
    const width = icon.getAttribute('width');
    const height = icon.getAttribute('height');

    expect(width).toBe('100px');
    expect(height).toBe('100px');
  });

  it('should render an xl icon', () => {
    render(<CloudAcademy size="xl" />);

    const icon = screen.getByRole('img');
    const width = icon.getAttribute('width');
    const height = icon.getAttribute('height');

    expect(width).toBe('150px');
    expect(height).toBe('150px');
  });

  it('should be accessible', () => {
    render(<CloudAcademy />);

    expect(screen.getByRole('img')).toHaveAccessibleName(
      'The Cloud Academy Logo'
    );
  });
});
