import { renderV3, screen } from '@@/test-utils';
import { DcwfTabs } from './DcwfTabs';
import {
  KSAT_TAB,
  DOMAIN_TAB,
  ROLE_TAB,
  LEARNING_OBJECTIVES_TAB
} from './constants';

jest.mock('./components/KsatTab', () => ({
  KsatTab: () => <div>KsatTab content</div>
}));

jest.mock('./components/DomainTab', () => ({
  DomainTab: () => <div>DomainTab content</div>
}));

jest.mock('./components/CurriculumTab', () => ({
  CurriculumTab: () => <div>CurriculumTab content</div>
}));

jest.mock('./components/RoleTab', () => ({
  RoleTab: () => <div>RoleTab content</div>
}));

jest.mock('./components/LearningObjectivesTab', () => ({
  LearningObjectivesTab: () => <div>LearningObjectivesTab content</div>
}));

describe('DcwfTabs', () => {
  it('should render the expected tabs', () => {
    renderV3(<DcwfTabs />);

    const tabs = [
      KSAT_TAB,
      DOMAIN_TAB,
      // CURRICULUM_TAB,
      ROLE_TAB,
      LEARNING_OBJECTIVES_TAB
    ];

    tabs.forEach(name => {
      expect(screen.getByRole('tab', { name })).toBeInTheDocument();
    });
  });
});
