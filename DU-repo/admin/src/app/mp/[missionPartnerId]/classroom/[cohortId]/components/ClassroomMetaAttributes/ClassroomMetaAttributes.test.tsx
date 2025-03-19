import { render } from '@testing-library/react';
import { ClassroomMetaAttributes } from './ClassroomMetaAttributes';
import type { sqlGetMissionPartnerById } from '@/app/api/mission-partner';
import type { CohortData } from '../../cohort.types';

const mockMissionPartner = {
  name: 'Mock Partner',
  logoUrl: '/mock-logo.png'
} as unknown as Awaited<
  ReturnType<typeof sqlGetMissionPartnerById>
>['_serviceData'];

const mockCohort = {
  evaluationType: 'Mock Evaluation',
  environment: 'Mock Environment'
} as unknown as CohortData;

describe('ClassroomMetaAttributes', () => {
  it('renders', () => {
    const { container } = render(
      <ClassroomMetaAttributes
        missionPartner={mockMissionPartner}
        cohort={mockCohort}
      />
    );
    expect(container).toBeInTheDocument();
  });
});
