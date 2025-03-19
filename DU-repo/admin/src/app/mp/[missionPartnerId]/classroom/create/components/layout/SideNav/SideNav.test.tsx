import React, { useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { type SideNavProps, SideNav } from './SideNav';
import type {
  CohortData,
  CreateCohortSubPageDetail
} from '../../pages/CreateCohortPage/CreateCohortPage.types';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn()
}));

describe('SideNav Component', () => {
  const mockCohort = {
    id: '123',
    name: 'Test Cohort',
    meetingStartDate: '2025-01-01'
  } as unknown as CohortData;

  const mockNavItems: CreateCohortSubPageDetail[] = [
    {
      id: 'step1',
      displayName: 'Step 1',
      isSetupStepComplete: jest.fn(() => true)
    } as unknown as CreateCohortSubPageDetail,
    {
      id: 'step2',
      displayName: 'Step 2',
      isSetupStepComplete: jest.fn(() => false)
    } as unknown as CreateCohortSubPageDetail
  ];

  const mockOnNavItemClick = jest.fn();

  const defaultProps: SideNavProps = {
    activeSubPage: mockNavItems[0],
    nextSubPage: mockNavItems[1],
    navItems: mockNavItems,
    isNextPageEnabled: true,
    onNavItemClick: mockOnNavItemClick,
    onSaveAndExit: function (): Promise<void> {
      return Promise.resolve();
    }
  };

  beforeEach(() => {
    (useContext as jest.Mock).mockReturnValue({
      cohortDetails: {
        cohort: mockCohort
      },
      isLoadingCohort: false
    });
    jest.clearAllMocks();
  });

  it('renders correctly with given props', () => {
    render(<SideNav {...defaultProps} />);

    expect(screen.getByText(mockCohort.name)).toBeInTheDocument();

    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
  });

  it('disables the Save and Close button when loading is true', () => {
    (useContext as jest.Mock).mockReturnValue({
      isLoadingCohort: true
    });

    render(<SideNav {...defaultProps} />);
    const saveButton = screen.getByRole('button', { name: /save and close/i });

    expect(saveButton).toBeDisabled();
  });

  it('calls onNavItemClick when a nav item is clicked', () => {
    render(<SideNav {...defaultProps} />);
    const navItem = screen.getByText('Step 1');

    fireEvent.click(navItem);
    expect(mockOnNavItemClick).toHaveBeenCalledWith(defaultProps.navItems[0]);
  });

  it('disables subsequent nav items when they are not eligible for selection', () => {
    const props = {
      ...defaultProps,
      isNextPageEnabled: false
    };

    render(<SideNav {...props} />);

    const enabledNavItem = screen.getByText('Step 1');
    const disabledNavItem = screen.getByText('Step 2');

    expect(disabledNavItem.closest('button')).toBeDisabled();
    expect(enabledNavItem.closest('button')).not.toBeDisabled();
  });
});
