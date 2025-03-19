import { AboutSection } from './AboutSection';
import { render, screen } from '@@/test-utils';

jest.mock('@cerberus/react', () => ({
  ...jest.requireActual('@cerberus/react'),
  Button: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  )
}));

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  Controller: ({ render, rules }) => (
    <div>
      {render({ field: {}, fieldState: {} })}
      <div>{rules.validate ? rules.validate() : ''}</div>
    </div>
  )
}));

describe('MarketingContentTab About Section', () => {
  it('should render', () => {
    render(
      <AboutSection
        forceMultiplierTitle="test"
        missionPartnerName="test"
        marketingControl={jest.fn()}
        disabled={false}
        isMarketingSubmitting={false}
        isSubmitting={false}
      />
    );
    expect(screen.getByText(/Save/i)).toBeInTheDocument();
  });
});
