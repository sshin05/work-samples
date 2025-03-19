import React from 'react';
import { renderV3, screen } from '@@/test-utils';
import { MMPSkeleton } from './MMPSkeleton';

jest.mock('@cerberus/styled-system/patterns', () => ({
  flex: jest.fn(() => 'mock-flex-class'),
  grid: jest.fn(() => 'mock-grid-class'),
  vstack: jest.fn(() => 'mock-vstack-class'),
  animateIn: jest.fn(() => 'mock-animate-in')
}));

jest.mock('@/components_new/loaders/SkeletonPanel', () => ({
  SkeletonPanel: ({ children, ...props }) => (
    <div {...props} aria-busy="true" data-testid="base-skeleton">
      {children}
    </div>
  )
}));

describe('MMPSkeleton', () => {
  const DEFAULT_NUMBER_OF_SKELETONS = 8;

  describe('Basic Render', () => {
    it('renders the default number of skeletons', () => {
      renderV3(<MMPSkeleton />);

      const skeletons = screen.getAllByTestId('base-skeleton');
      expect(skeletons.length).toBe(DEFAULT_NUMBER_OF_SKELETONS);
    });

    it('renders the correct number of skeletons based on the prop', () => {
      const numberOfSkeletons = 5;
      renderV3(<MMPSkeleton numberOfSkeletons={numberOfSkeletons} />);

      const skeletons = screen.getAllByTestId('base-skeleton');
      expect(skeletons.length).toBe(numberOfSkeletons);
    });
  });

  describe('Skeleton Content', () => {
    it('contains a placeholder ProgramLink', () => {
      renderV3(<MMPSkeleton />);

      const programLinks = screen.getAllByRole('link');
      programLinks.forEach(link => {
        expect(link).toHaveAttribute('href', '#');
        expect(link).toBeInTheDocument();
      });
    });

    it('is loading with aria-busy="true"', () => {
      renderV3(<MMPSkeleton />);

      const skeletons = screen.getAllByTestId('base-skeleton');
      skeletons.forEach(skeleton => {
        expect(skeleton).toHaveAttribute('aria-busy', 'true');
      });
    });
  });
});
