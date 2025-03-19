import React from 'react';
import { render, screen } from '@testing-library/react';
import { BadgesSection } from './BadgesSection';
import { abbreviatedDayDate } from '@/utils/date/abbreviatedDayDate';

jest.mock('@/utils/date/abbreviatedDayDate', () => ({
  abbreviatedDayDate: jest.fn()
}));

jest.mock('@cerberus/react', () => {
  const actual = jest.requireActual('@cerberus/react');

  return {
    ...actual,
    Text: ({ children }) => <div>{children}</div>
  };
});

jest.mock('@/components_new/images/AwsImage', () => ({
  AwsImage: (props: {
    src: string;
    alt: string;
    w: number | string;
    h: number | string;
  }) => <img alt={props.alt} src={props.src} width={props.w} height={props.h} />
}));

describe('BadgesSection', () => {
  const badges = [
    {
      badgeId: '1',
      imageUrl: '/path/to/image1.png',
      title: 'Badge 1',
      issuedAt: '2023-01-01T00:00:00.000Z',
      description: 'description for badge one',
      expiresAt: '2026-02-01T00:00:00.000Z',
      recipient: 'Jane Doe',
      jsonUrl: '/def/456'
    },
    {
      badgeId: '2',
      imageUrl: '/path/to/image2.png',
      title: 'Badge 2',
      issuedAt: '2023-02-01T00:00:00.000Z',
      description: 'description for badge two',
      expiresAt: '2026-02-01T00:00:00.000Z',
      recipient: 'Charles Young',
      jsonUrl: '/abc/123'
    }
  ];

  beforeEach(() => {
    (abbreviatedDayDate as jest.Mock).mockImplementation((date: string) => {
      if (date.includes('2023-01')) return 'Jan 1, 2023';
      if (date.includes('2023-02')) return 'Feb 1, 2023';
      return 'unknown';
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the badges header', () => {
    render(<BadgesSection badges={badges} isLoading={false} />);
    const header = screen.getByText('Badges');
    expect(header).toBeInTheDocument();
  });

  it('renders each badge with title, image, and formatted date', () => {
    render(<BadgesSection badges={badges} isLoading={false} />);

    badges.forEach(badge => {
      expect(screen.getByText(badge.title)).toBeInTheDocument();
    });

    expect(screen.getByText(/Awarded on Jan 1, 2023/)).toBeInTheDocument();
    expect(screen.getByText(/Awarded on Feb 1, 2023/)).toBeInTheDocument();

    const images = screen.getAllByAltText('badge image');
    expect(images).toHaveLength(badges.length);
    expect(images[0]).toHaveAttribute('src', badges[1].imageUrl);
    expect(images[1]).toHaveAttribute('src', badges[0].imageUrl);
  });

  it('applies the correct loading state via aria-busy', () => {
    const { container, rerender } = render(
      <BadgesSection badges={badges} isLoading={true} />
    );
    expect(container.firstChild).toHaveAttribute('aria-busy', 'true');

    rerender(<BadgesSection badges={badges} isLoading={false} />);
    expect(container.firstChild).toHaveAttribute('aria-busy', 'false');
  });
});
