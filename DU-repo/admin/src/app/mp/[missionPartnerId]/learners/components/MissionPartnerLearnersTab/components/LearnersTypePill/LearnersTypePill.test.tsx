import { screen, renderV3 } from '@@/test-utils';
import { LearnersTypePill } from './LearnersTypePill';

describe('LearnersTypePill', () => {
  it('should render', () => {
    const mockValue = 'testing';

    renderV3(<LearnersTypePill value={mockValue} />);
    expect(screen.getByText('Testing')).toBeInTheDocument();
  });

  it('should return null if value is falsy', () => {
    const mockValue = '';

    const { container } = renderV3(<LearnersTypePill value={mockValue} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render with info palette when value is military', () => {
    const mockValue = 'military';

    renderV3(<LearnersTypePill value={mockValue} />);
    const element = screen.getByText('Military');
    expect(element).toHaveAttribute('palette', 'info');
  });

  it('should render with page palette when value is civilian', () => {
    const mockValue = 'civilian';

    renderV3(<LearnersTypePill value={mockValue} />);
    const element = screen.getByText('Civilian');
    expect(element).toHaveAttribute('palette', 'page');
  });

  it('should render with warning palette when value is contractor', () => {
    const mockValue = 'contractor';

    renderV3(<LearnersTypePill value={mockValue} />);
    const element = screen.getByText('Contractor');
    expect(element).toHaveAttribute('palette', 'warning');
  });
});
