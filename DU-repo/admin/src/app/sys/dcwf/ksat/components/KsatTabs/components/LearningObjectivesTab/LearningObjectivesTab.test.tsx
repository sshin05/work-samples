import { renderV3, screen } from '@@/test-utils';
import { LearningObjectivesTab } from './LearningObjectivesTab';

const mockLearningObjectives = {
  findLearningObjectives: {
    data: [
      {
        id: '00000000-0000-0000-0000-000000000000',
        description: 'Test Description',
        domain: {
          id: '1234',
          name: 'Test Domain'
        }
      }
    ],
    total: 1
  }
};

jest.mock('@/api/dcwf/learning-objective/useFindLearningObjectives', () => ({
  useFindLearningObjectives: () => ({
    data: mockLearningObjectives,
    isLoading: false,
    isError: false
  })
}));

jest.mock(
  '@/app/sys/dcwf/components/DcwfPage/components/DcwfTabs/components/LearningObjectivesTab/components/CreateLearningObjectiveModal',
  () => ({
    CreateLearningObjectiveModal: () => <div>CreateLearningObjectiveModal</div>
  })
);

describe('LearningObjectivesTab', () => {
  it('should render', () => {
    renderV3(<LearningObjectivesTab ksatId="1234" />);

    const [description, view] = screen.getAllByRole('columnheader');

    expect(description).toHaveTextContent('Description');
    expect(view).toHaveTextContent('');
  });
});
