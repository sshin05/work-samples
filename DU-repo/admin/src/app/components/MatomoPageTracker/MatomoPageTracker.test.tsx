import { useGetSession } from '@/hooks/useGetSession';
import { render, screen } from '@@/test-utils';
import { MatomoPageTracker } from './MatomoPageTracker';

jest.mock('@/hooks/useGetSession');
(useGetSession as jest.Mock).mockReturnValue({
  register: jest.fn()
});

describe('PageTrackingConsumer', () => {
  it('should render component', () => {
    render(
      <MatomoPageTracker>
        <div data-testid="page-tracking-consumer" />
      </MatomoPageTracker>
    );

    expect(screen.getByTestId('page-tracking-consumer')).toBeInTheDocument();
  });
});
