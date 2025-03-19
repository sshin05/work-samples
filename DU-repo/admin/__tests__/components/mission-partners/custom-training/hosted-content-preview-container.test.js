import React from 'react';
import { render } from '@testing-library/react';
import HostedContentPreviewContainer from '../../../../src/components/manage-mission-partners/custom-training/HostedContentPreviewContainer';

jest.mock(
  '../../../../src/components/manage-mission-partners/custom-training/HostedCoursePreviewContainer',
  () => props => {
    return <div key={props.item.id}>Course Placeholder</div>;
  }
);

jest.mock(
  '../../../../src/components/manage-mission-partners/custom-training/HostedExamPreviewContainer',
  () => props => {
    return <div key={props.item.id}>Exam Placeholder</div>;
  }
);

jest.mock(
  '../../../../src/components/manage-mission-partners/custom-training/HostedScormPreviewContainer',
  () => props => {
    return <div key={props.item.id}>Scorm Placeholder</div>;
  }
);

jest.mock(
  '../../../../src/components/manage-mission-partners/custom-training/SurveyPreviewContainer',
  () => props => {
    return <div key={props.item.id}>Survey Placeholder</div>;
  }
);

jest.mock(
  '../../../../src/components/manage-mission-partners/custom-training/LabPreviewContainer',
  () => props => {
    return <div key={props.item.id}>Lab Placeholder</div>;
  }
);

describe('HostedContentPreviewContainer', () => {
  it('should render a preview modal with a course', () => {
    const { getByText } = render(
      <HostedContentPreviewContainer
        item={{
          __typename: 'Course',
          courseUrl: 'https://app.com/app/ducreate/course'
        }}
        onClose={() => {}}
      />
    );
    expect(getByText('Course Placeholder')).toBeInTheDocument();
  });

  it('should render a preview modal with an exam', () => {
    const { getByText } = render(
      <HostedContentPreviewContainer
        item={{
          __typename: 'Assessment'
        }}
        onClose={() => {}}
      />
    );
    expect(getByText('Exam Placeholder')).toBeInTheDocument();
  });

  it('should render a preview modal with a scorm', () => {
    const { getByText } = render(
      <HostedContentPreviewContainer
        item={{
          __typename: 'Course',
          courseUrl: 'https://app.com/app/ducreate/scorm'
        }}
        onClose={() => {}}
      />
    );
    expect(getByText('Scorm Placeholder')).toBeInTheDocument();
  });

  it('should render a preview modal with a survey', () => {
    const { getByText } = render(
      <HostedContentPreviewContainer
        item={{
          __typename: 'Survey'
        }}
        onClose={() => {}}
      />
    );
    expect(getByText('Survey Placeholder')).toBeInTheDocument();
  });

  it('should render a preview modal with a Lab', () => {
    const { getByText } = render(
      <HostedContentPreviewContainer
        item={{
          __typename: 'Lab'
        }}
        onClose={() => {}}
      />
    );
    expect(getByText('Lab Placeholder')).toBeInTheDocument();
  });

  it('should render null with an unknown preview type', () => {
    const { container } = render(
      <HostedContentPreviewContainer
        item={{
          __typename: 'Unknown'
        }}
        onClose={() => {}}
      />
    );
    expect(container.firstChild).toBeNull();
  });
});
