import { render, screen, userEvent } from '@@/test-utils';
import { AssignTrainingSection } from './AssignTrainingSection';

jest.mock('@digital-u/digital-ui', () => ({
  ...jest.requireActual('@digital-u/digital-ui'),
  Button: ({ children, onClick }) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  )
}));

jest.mock('./components/TrainingConditionCard', () => ({
  TrainingConditionCard: ({ trainingCriteria }) => (
    <div key={trainingCriteria.id}>Training Criteria {trainingCriteria.id}</div>
  )
}));

describe('AssignTrainingSection', () => {
  it('renders without error', () => {
    render(
      <AssignTrainingSection
        onAddConditionClicked={jest.fn()}
        onRemoveCondition={jest.fn()}
      />
    );

    expect(
      screen.getByRole('button', { name: /add a condition/i })
    ).toBeInTheDocument();
  });

  it('renders training criteria', () => {
    render(
      <AssignTrainingSection
        trainingCriteria={[
          {
            id: 'id-1',
            minScore: 30,
            ruleType: 'AtOrAbove',
            training: []
          },
          {
            id: 'id-2',
            maxScore: 90,
            ruleType: 'AtOrBelow',
            training: []
          }
        ]}
        onAddConditionClicked={jest.fn()}
        onRemoveCondition={jest.fn()}
      />
    );

    expect(screen.getByText('Training Criteria id-1')).toBeInTheDocument();
    expect(screen.getByText('Training Criteria id-2')).toBeInTheDocument();
  });

  it('should not display add condition button when isPublished', () => {
    render(
      <AssignTrainingSection
        isPublished
        onAddConditionClicked={jest.fn()}
        onRemoveCondition={jest.fn()}
      />
    );

    expect(screen.queryByText(/add a condition/i)).not.toBeInTheDocument();
  });

  it('should call onAddConditionClicked when add condition button is clicked', () => {
    const onAddConditionClicked = jest.fn();
    render(
      <AssignTrainingSection
        onAddConditionClicked={onAddConditionClicked}
        onRemoveCondition={jest.fn()}
      />
    );

    userEvent.click(screen.getByText(/add a condition/i));

    expect(onAddConditionClicked).toHaveBeenCalled();
  });
});
