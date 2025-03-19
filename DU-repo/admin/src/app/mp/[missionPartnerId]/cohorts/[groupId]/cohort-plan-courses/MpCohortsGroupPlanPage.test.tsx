import React from 'react';
import { render, screen } from '@testing-library/react';
import CohortPlanCoursesPage from './page';
import { useRouteParams } from '@/hooks/useRouteParams';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  useAggregateTranscriptItemsForTrainingPlan,
  useAggregateTrainingPlanVersions
} from '@/api/course';
import { useExportCourseLevelMetricsForTrainingPlan } from '@/api/mission-partner';

jest.mock('@/api/mission-partner');
jest.mock('@/api/course');
jest.mock('@/hooks/useRouteParams');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn()
}));

const mockNotify = jest.fn();
jest.mock('@cerberus/react', () => ({
  useNotificationCenter: jest.fn(() => ({
    notify: mockNotify
  })),
  NotificationCenter: ({ children }) => <div>{children}</div>,
  Button: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  Input: ({ value = '', onChange }) => (
    <input value={value} onChange={onChange} />
  ),
  Field: ({ children }) => <div>{children}</div>,
  Label: ({ children }) => <div>{children}</div>,
  IconButton: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  Table: ({ children }) => <table>{children}</table>,
  Td: ({ children }) => <td>{children}</td>,
  Tr: ({ children }) => <tr>{children}</tr>,
  Th: ({ children }) => <th>{children}</th>,
  Thead: ({ children }) => <thead>{children}</thead>,
  Tbody: ({ children }) => <tbody>{children}</tbody>,
  Select: ({ children }) => <select>{children}</select>,
  Option: ({ children }) => <option>{children}</option>
}));

jest.mock('@/components_new/form', () => ({
  TextInput: ({ children, ...props }) => <input {...props}>{children}</input>
}));

describe('CohortPlanCoursesPage', () => {
  const mockExportMetrics = jest.fn(async () => Promise.resolve());
  let data = [];

  beforeEach(() => {
    data = [
      {
        itemId: 'testCourseId1',
        itemTitle: 'Becoming a Cloud Architect — Learn the Fundamentals',
        vendorName: 'DigitalU',
        total: 123,
        started: 0,
        stopped: 0,
        pendingReview: 0,
        markedCompleted: 0,
        completed: 0
      },
      {
        itemId: 'testCourseId2',
        itemTitle: 'Becoming an AWS Cloud Architect — Started',
        vendorName: 'DigitalU',
        total: 0,
        started: 0,
        stopped: 0,
        pendingReview: 0,
        markedCompleted: 0,
        completed: 0
      }
    ];

    (useRouter as jest.Mock).mockReturnValue({
      back: jest.fn(),
      query: {}
    });
    (
      useAggregateTranscriptItemsForTrainingPlan as jest.Mock
    ).mockImplementation(() => ({
      transcriptItems: data,
      transcriptItemsLoading: false
    }));

    (useAggregateTrainingPlanVersions as jest.Mock).mockImplementation(() => ({
      trainingPlanVersions: {
        versions: [],
        versionEnabled: false
      }
    }));

    (
      useExportCourseLevelMetricsForTrainingPlan as jest.Mock
    ).mockImplementation(() => ({
      exportCourseLevelMetricsForTrainingPlan: mockExportMetrics
    }));
    (useRouteParams as jest.Mock).mockReturnValue({
      missionPartnerId: 'testMissionPartnerId',
      groupId: 'testGroupId'
    });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(param => {
        switch (param) {
          case 'planType':
            return 'testPlanType';
          case 'planSourceId':
            return 'testPlanSourceId';
          case 'planVersion':
            return '1';
          case 'title':
            return 'Test Title';
          default:
            return null;
        }
      })
    });
  });

  it('should render PlanCourses component', () => {
    render(<CohortPlanCoursesPage />);

    expect(screen.getByText('Test Title | Plan Courses')).toBeInTheDocument();
    expect(
      screen.getByText('Becoming a Cloud Architect — Learn the Fundamentals')
    ).toBeInTheDocument();
    expect(screen.getByText('1 - 2 of 2 items')).toBeInTheDocument();
  });
});
