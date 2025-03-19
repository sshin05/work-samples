import { renderV3, screen } from '@@/test-utils';
import { LearningObjectivesTab } from './LearningObjectivesTab';

jest.mock('./components/CreateLearningObjectiveModal', () => ({
  CreateLearningObjectiveModal: () => <div>CreateLearningObjectiveModal</div>
}));
jest.mock('../Filters/FiltersModal/FiltersModal', () => ({
  FiltersModal: () => <div>FiltersModal</div>
}));

const mockLearningObjectives = {
  findLearningObjectives: {
    data: [
      {
        id: '00000000-0000-0000-0000-000000000000',
        description: 'Test Description',
        domain: {
          id: '00000000-0000-0000-0000-000000000000',
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

describe('LearningObjectivesTab', () => {
  it('should render', () => {
    renderV3(<LearningObjectivesTab />);

    const [description, view] = screen.getAllByRole('columnheader');

    expect(description).toHaveTextContent('Description');
    expect(view).toHaveTextContent('');
    expect(
      screen.getByRole('button', { name: 'add Create Learning Objective' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('CreateLearningObjectiveModal')
    ).toBeInTheDocument();
  });
});
