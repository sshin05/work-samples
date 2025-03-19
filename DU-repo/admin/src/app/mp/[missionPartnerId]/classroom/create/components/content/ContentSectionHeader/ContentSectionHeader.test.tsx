import { render, screen } from '@testing-library/react';
import { ContentSectionHeader } from './ContentSectionHeader';
import type { CarbonIconType } from '@carbon/icons-react';
import { useContext } from 'react';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn()
}));

jest.mock('@carbon/icons-react', () => ({
  InformationSquare: jest.fn(() => (
    <div data-testid="default-icon">Default Icon</div>
  ))
}));

describe('ContentSectionHeader', () => {
  const defaultProps = {
    title: 'Mock Title',
    description: 'Mock Description',
    Icon: undefined
  };

  beforeEach(() => {
    (useContext as jest.Mock).mockReturnValue({
      isLoadingCohort: false
    });
  });

  it('renders the title and description correctly', () => {
    render(<ContentSectionHeader {...defaultProps} />);

    expect(screen.getByText('Mock Title')).toBeInTheDocument();
    expect(screen.getByText('Mock Description')).toBeInTheDocument();
  });

  it('displays the default icon when no Icon is provided', () => {
    render(<ContentSectionHeader {...defaultProps} />);

    expect(screen.getByTestId('default-icon')).toBeInTheDocument();
  });

  it('displays the custom Icon when provided', () => {
    const MockIcon = jest.fn(() => <div>Custom Icon</div>);

    render(
      <ContentSectionHeader
        {...defaultProps}
        Icon={MockIcon as unknown as CarbonIconType}
      />
    );

    expect(screen.getByText('Custom Icon')).toBeInTheDocument();
    expect(MockIcon).toHaveBeenCalled();
  });
});
