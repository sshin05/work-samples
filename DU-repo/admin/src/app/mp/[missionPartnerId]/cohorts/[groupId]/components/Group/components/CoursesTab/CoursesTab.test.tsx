import React from 'react';
import { renderV3, screen } from '@@/test-utils';
import { CoursesTab } from './CoursesTab';
import type { NoDataMessageProps } from '@/components_new/table/components/NoDataMessage/NoDataMessageProps';

jest.mock('@/components_new/table/components/NoDataMessage', () => ({
  NoDataMessage: (props: NoDataMessageProps) => (
    <>
      {props.message}
      {props.buttonText && (
        <button onClick={props.cta} data-testid="call-to-action-button">
          {props.buttonText}
        </button>
      )}
    </>
  )
}));

describe('ManageGroupTabs', () => {
  it('should render Courses Tab', () => {
    renderV3(
      <CoursesTab
        courses={[]}
        addCourse={jest.fn()}
        isLoading={false}
        pageLoading={false}
      />
    );
    expect(
      screen.getByText('Once a course has been added, it will appear here.')
    ).toBeInTheDocument();
    expect(screen.getByTestId('call-to-action-button')).toBeInTheDocument();
  });

  it('should render Courses Tab with courses', () => {
    const courses = [
      {
        id: 'courseId',
        title: 'courseTitle',
        type: 'type',
        source: 'source',
        vendorName: 'vendorName',
        status: 'Assigned',
        notStarted: 1,
        inProgress: 2,
        completed: 4
      }
    ];

    renderV3(
      <CoursesTab
        courses={courses}
        addCourse={jest.fn()}
        isLoading={false}
        pageLoading={false}
      />
    );
    expect(screen.getByText('courseTitle')).toBeInTheDocument();
    expect(screen.getByText('vendorName')).toBeInTheDocument();
    expect(screen.getByText('Enrolled')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });
});
