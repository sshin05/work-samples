import { renderV3 as render, screen } from '@@/test-utils';
import { CardContainer } from './CardContainer';
import { Information, type CarbonIconType } from '@carbon/icons-react';

describe('CardContainer', () => {
  const mockOnClick = jest.fn();
  const defaultProps = {
    title: 'Mock Title',
    description: 'Mock Description',
    Icon: Information,
    onClick: mockOnClick
  };

  it('renders the title and description correctly', () => {
    render(<CardContainer {...defaultProps} />);

    expect(screen.getByText('Mock Title')).toBeInTheDocument();
    expect(screen.getByText('Mock Description')).toBeInTheDocument();
  });

  it('displays the custom Icon when provided', () => {
    const MockIcon = jest.fn(() => <div>Custom Icon</div>);

    render(
      <CardContainer
        {...defaultProps}
        Icon={MockIcon as unknown as CarbonIconType}
      />
    );

    expect(screen.getByText('Custom Icon')).toBeInTheDocument();
    expect(MockIcon).toHaveBeenCalled();
  });

  it('calls the onClick function when clicked', () => {
    render(<CardContainer {...defaultProps} />);

    screen.getByText('Mock Title').click();
    expect(mockOnClick).toHaveBeenCalled();
  });
});
