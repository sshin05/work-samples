import { render, screen } from '@testing-library/react';
import { CardContainer } from './CardContainer';
import { Information, type CarbonIconType } from '@carbon/icons-react';

describe('CardContainer', () => {
  const defaultProps = {
    title: 'Mock Title',
    description: 'Mock Description',
    Icon: Information,
    onClick: () => {}
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
});
