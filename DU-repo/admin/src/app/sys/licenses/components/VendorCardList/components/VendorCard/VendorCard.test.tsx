import { VendorCard } from './VendorCard';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { render, screen } from '@@/test-utils';
import { type ClickableTileProps } from '../ClickableTile/ClickableTile';
import { type RingProgressBarProps } from '../RingProgressBar/RingProgressBar';

jest.mock('../ClickableTile', () => ({
  ClickableTile: ({ children, href }: ClickableTileProps) => (
    <a data-testid="clickable-tile" href={href}>
      {children}
    </a>
  )
}));

jest.mock('../RingProgressBar', () => ({
  RingProgressBar: ({
    percentage,
    provisionedLicenses
  }: RingProgressBarProps) => (
    <div data-testid="ring-progress-bar">
      <div>Percentage: {percentage}</div>
      <div>Provisioned Licenses: {provisionedLicenses}</div>
    </div>
  )
}));

describe('VendorCard', () => {
  describe('vendor assignment calculations', () => {
    it('should render VendorCard with unlimited available when provisioned is -1', () => {
      const vendor = {
        id: 'vendor1',
        name: 'Vendor 1',
        provisioned: -1,
        assigned: 10
      };

      render(<VendorCard vendor={vendor} />);

      expect(screen.getByTestId('clickable-tile')).toHaveAttribute(
        'href',
        getRouteUrl(routeGenerators.ManageLicense({ id: 'vendor1' }))
      );
      expect(screen.getByText('Vendor 1')).toBeInTheDocument();
      expect(screen.getByText('Enterprise License')).toBeInTheDocument();
      expect(screen.getByText('10 assigned')).toBeInTheDocument();
      expect(screen.getByText('Unlimited available')).toBeInTheDocument();
    });

    it('should render VendorCard with calculated available licenses', () => {
      const vendor = {
        id: 'vendor2',
        name: 'Vendor 2',
        provisioned: 100,
        assigned: 40
      };

      render(<VendorCard vendor={vendor} />);

      expect(screen.getByText('provisioned')).toBeInTheDocument();
      expect(screen.getByText('assigned')).toBeInTheDocument();
      expect(screen.getByText('available')).toBeInTheDocument();
      expect(screen.getByText('40')).toBeInTheDocument();
      expect(screen.getByText('60')).toBeInTheDocument();
    });
  });

  describe('RingProgressBar rendering', () => {
    it('should render VendorCard with correct RingProgressBar percentage', () => {
      const vendor = {
        id: 'vendor3',
        name: 'Vendor 3',
        provisioned: 50,
        assigned: 10
      };

      render(<VendorCard vendor={vendor} />);

      const ringProgressBar = screen.getByTestId('ring-progress-bar');
      expect(ringProgressBar).toBeInTheDocument();
      expect(ringProgressBar).toHaveTextContent('Percentage: 20');
      expect(ringProgressBar).toHaveTextContent('Provisioned Licenses: 50');
    });
  });
});
