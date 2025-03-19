import { renderV3, screen } from '@@/test-utils';
import { BadgeCard } from './BadgeCard';

const mockBadge = {
  id: '1',
  title: 'Test Badge',
  imageUrl: 'test',
  count: 1,
  missionPartnerCount: 5
};

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush
  })),
  useParams: jest.fn(() => ({ missionPartnerId: 'test' }))
}));

describe('BadgeCard', () => {
  it('should render BadgeCard component', () => {
    renderV3(
      <div id="app-root">
        <BadgeCard
          badge={mockBadge}
          exportingDisabled={false}
          missionPartnerId="1"
          missionPartnerName="Mock Partner Name"
          handleExportBadges={() => 0}
          gridType="missionPartnerBadgesGrid"
          missionPartnerCount={5}
        />
      </div>
    );
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });
});
