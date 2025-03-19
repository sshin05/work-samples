import { render, screen } from '@@/test-utils';
import { RingProgressBar } from './RingProgressBar';

describe('Ring Progress Bar', () => {
  it('should render a ring progress bar', () => {
    render(<RingProgressBar percentage={10} provisionedLicenses={10} />);
    expect(screen.getByText('10%')).toBeInTheDocument();
  });
});
