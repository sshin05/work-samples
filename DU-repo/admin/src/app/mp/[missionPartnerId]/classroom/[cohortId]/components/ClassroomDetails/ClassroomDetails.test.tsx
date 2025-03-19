import React from 'react';
import { render, screen } from '@@/test-utils';
import { ClassroomDetails } from './ClassroomDetails';
import type { CohortData } from '../../cohort.types';

jest.mock('@/components_new/loaders', () => ({
  BaseSkeleton: () => <div data-testid="base-skeleton">Loading...</div>
}));

jest.mock('./components/EditReportingInstructions', () => ({
  EditReportingInstructions: () => (
    <div data-testid="edit-view">Edit State View</div>
  )
}));

jest.mock('../UploadFileModal/components/UploadForm/UploadForm', () => ({
  UploadForm: () => <div data-testid="upload-view">Upload Modal</div>
}));

jest.mock('@cerberus/icons', () => ({
  InformationFilled: () => <span data-testid="InformationFilled-icon" />,
  Calendar: () => <span data-testid="calendar-icon" />,
  Edit: ({ onClick }) => (
    <div data-testid="edit-icon" onClick={onClick}>
      Edit Icon
    </div>
  ),
  Link: () => <span data-testid="link-icon" />,
  Location: () => <span data-testid="location-icon" />
}));

jest.mock('@cerberus/react', () => ({
  ...jest.requireActual('@cerberus/react'),
  Tag: ({ children }) => <span data-testid="tag">{children}</span>
}));

const mockCohort = {
  meetingStartDate: new Date('2025-01-01'),
  meetingEndDate: new Date('2025-01-05'),
  location: 'Mock Location Value',
  libraryItems: [{ id: 1 }],
  meetingDetails: 'Mock Meeting Details'
} as unknown as CohortData;

describe('ClassroomDetails', () => {
  const defaultProps = () => ({
    cohort: { ...mockCohort },
    onDetailsUpdate: jest.fn()
  });

  it.skip('renders reporting instructions details when cohort is provided', () => {
    render(<ClassroomDetails {...defaultProps()} />);

    expect(screen.getByText('Mock Location Value')).toBeInTheDocument();
    expect(screen.getByTestId('tag')).toBeInTheDocument();
  });

  it('renders "Dates are pending." if meetingStartDate is not available', () => {
    const props = {
      ...defaultProps(),
      cohort: {
        ...defaultProps().cohort,
        meetingStartDate: null
      }
    };

    render(<ClassroomDetails {...props} />);
    expect(screen.getByText('Dates are pending.')).toBeInTheDocument();
  });

  it('renders "Location is pending." if location is not available', () => {
    const props = {
      ...defaultProps(),
      cohort: {
        ...defaultProps().cohort,
        location: null
      }
    };

    render(<ClassroomDetails {...props} />);
    expect(screen.getByText('Location is pending.')).toBeInTheDocument();
  });

  it('does not show file attached tag if libraryItems is empty', () => {
    const props = {
      ...defaultProps(),
      cohort: {
        ...defaultProps().cohort,
        libraryItems: []
      }
    };

    render(<ClassroomDetails {...props} />);
    expect(screen.queryByTestId('tag')).not.toBeInTheDocument();
  });
});
