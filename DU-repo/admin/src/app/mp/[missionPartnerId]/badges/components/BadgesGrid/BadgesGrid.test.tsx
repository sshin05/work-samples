import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderV3, screen } from '@@/test-utils';
import { BadgesGrid } from './BadgesGrid';
import type { Badge, MissionPartnerType } from '../mpBadges.types';
import { useSearchParams } from 'next/navigation';

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockResolvedValueOnce(undefined)
  }
});

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush
  })),
  useSearchParams: jest.fn()
}));
jest.mock('@/api/badge');
jest.mock('@/api/mission-partner');

const mockHandleExportBadges = jest.fn();
const mockBadges: Badge[] = [
  {
    id: '1',
    title: 'Badge 1',
    count: 2,
    imageUrl: 'test-1.png',
    missionPartnerCount: 5
  },
  {
    id: '2',
    title: 'Badge 2',
    count: 3,
    imageUrl: 'test-2.png',
    missionPartnerCount: 4
  },
  {
    id: '3',
    title: 'Badge 3',
    count: 1,
    imageUrl: 'test-3.png',
    missionPartnerCount: 3
  },
  {
    id: '4',
    title: 'Badge 3',
    count: 1,
    imageUrl: 'test-4.png',
    missionPartnerCount: 2
  }
];

const mockDigitalUniversityBadges: Badge[] = [
  { id: '3', title: 'Badge 3', missionPartnerCount: 1, imageUrl: 'test-3.png' }
];

const mockMissionPartner: MissionPartnerType = {
  id: 'mp1',
  name: 'Mission Partner 1',
  affiliateId: 'affiliate-1',
  courses: [],
  customTrainingEnabled: true,
  exams: [],
  forceMultipliers: [],
  labs: [],
  scorms: [],
  surveys: [],
  trialEnabled: false
};

describe('BadgesGrid', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (param: string) => {
        switch (param) {
          case 'showAllDUBadges':
            return 'true';
          case 'showAllMPBadges':
            return 'true';
          default:
            return null;
        }
      }
    });
  });

  afterEach(() => {
    mockPush.mockReset();
  });

  it('renders the correct number of badges', () => {
    renderV3(
      <BadgesGrid
        badges={mockBadges}
        missionPartner={mockMissionPartner}
        handleExportBadges={mockHandleExportBadges}
        gridType="missionPartnerBadgesGrid"
      />
    );

    expect(
      screen.getByText(`${mockBadges.length} Mission Partner 1 Badges`)
    ).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 5 })).toHaveLength(1);
  });

  it('renders "Badge" when there is only one badge', () => {
    renderV3(
      <BadgesGrid
        badges={[mockBadges[0]]}
        missionPartner={mockMissionPartner}
        handleExportBadges={mockHandleExportBadges}
        gridType="missionPartnerBadgesGrid"
      />
    );

    expect(screen.getByText('1 Mission Partner 1 Badge')).toBeInTheDocument();
  });

  it('calls handleExportBadges with correct arguments when downloadList is clicked', () => {
    renderV3(
      <BadgesGrid
        badges={mockBadges}
        missionPartner={mockMissionPartner}
        handleExportBadges={mockHandleExportBadges}
        gridType="missionPartnerBadgesGrid"
      />
    );

    const downloadButton = screen.getAllByText('Download')[0];
    fireEvent.click(downloadButton);

    expect(mockHandleExportBadges).toHaveBeenCalledWith(
      undefined,
      undefined,
      '1'
    );
  });

  it('disables download buttons when exportingDisabled is true', () => {
    renderV3(
      <BadgesGrid
        badges={mockBadges}
        missionPartner={mockMissionPartner}
        handleExportBadges={mockHandleExportBadges}
        exportingDisabled={true}
        gridType="missionPartnerBadgesGrid"
      />
    );

    const downloadButtons = screen.getAllByText('Download');
    downloadButtons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });

  it('disables download buttons when exportingDisabled is true', () => {
    renderV3(
      <BadgesGrid
        badges={mockBadges}
        missionPartner={mockMissionPartner}
        handleExportBadges={mockHandleExportBadges}
        exportingDisabled={true}
        gridType="missionPartnerBadgesGrid"
      />
    );

    const downloadButtons = screen.getAllByText('Download');
    downloadButtons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });

  it('renders the correct heading for Digital University badges', () => {
    renderV3(
      <BadgesGrid
        badges={mockDigitalUniversityBadges}
        missionPartner={mockMissionPartner}
        handleExportBadges={mockHandleExportBadges}
        gridType="digitalUniversityBadgesGrid"
      />
    );

    expect(screen.getByText('1 Digital University Badge')).toBeInTheDocument();
  });

  it('calls handleExportBadges with correct arguments when download all badges button is clicked', () => {
    const mockHandleExportBadges = jest.fn();

    renderV3(
      <BadgesGrid
        badges={mockBadges}
        missionPartner={mockMissionPartner}
        handleExportBadges={mockHandleExportBadges}
        gridType="missionPartnerBadgesGrid"
      />
    );

    const downloadButton = screen.getByLabelText('download all badges button');
    fireEvent.click(downloadButton);

    expect(mockHandleExportBadges).toHaveBeenCalledWith(
      mockMissionPartner.id,
      undefined,
      undefined
    );
  });

  it('shows all badges when limit is not provided', () => {
    renderV3(
      <BadgesGrid
        badges={mockBadges}
        missionPartner={mockMissionPartner}
        handleExportBadges={jest.fn()}
        gridType="missionPartnerBadgesGrid"
      />
    );

    const badges = screen.getAllByRole('heading', { level: 6 });
    expect(badges).toHaveLength(mockBadges.length);
  });
});
