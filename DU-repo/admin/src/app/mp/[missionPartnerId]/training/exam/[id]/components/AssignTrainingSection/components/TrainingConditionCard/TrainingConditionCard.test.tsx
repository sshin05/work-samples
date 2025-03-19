import { render, screen, userEvent, waitFor } from '@@/test-utils';
import { TrainingConditionCard } from './TrainingConditionCard';

jest.mock('@digital-u/digital-ui', () => ({
  ...jest.requireActual('@digital-u/digital-ui'),
  Flex: ({ children }) => <div>{children}</div>,
  Text: ({ children }) => <span>{children}</span>,
  Button: ({ disabled, onClick, children, type }) => {
    return (
      <button disabled={disabled} onClick={onClick} type={type}>
        {children}
      </button>
    );
  }
}));

jest.mock('@cerberus/react', () => ({
  ConfirmModal: ({ children }) => <div>{children}</div>,
  NotificationCenter: ({ children }) => <div>{children}</div>
}));

jest.mock('@/components_new/modals/ConfirmActionModal', () => ({
  ConfirmActionModal: ({ handleSubmit }) => (
    <button onClick={handleSubmit}>Remove</button>
  )
}));

describe('TrainingConditionCard', () => {
  it('should render', () => {
    render(
      <TrainingConditionCard
        trainingCriteria={{
          id: '1',
          minScore: 30,
          ruleType: 'AtOrAbove',
          training: []
        }}
      />
    );
    expect(screen.getByText(/at or above 30%/i)).toBeInTheDocument();
  });

  it('should render specific copy on condition rule Always', () => {
    render(
      <TrainingConditionCard
        trainingCriteria={{
          id: '1',
          ruleType: 'Always',
          training: []
        }}
      />
    );
    expect(
      screen.getByText('Always assign no matter the score:')
    ).toBeInTheDocument();
    expect(screen.queryByText(/if learner scores/i)).not.toBeInTheDocument();
  });

  it('should take action when clicked', async () => {
    const mockOnClick = jest.fn();
    render(
      <TrainingConditionCard
        trainingCriteria={{
          id: '1',
          minScore: 30,
          ruleType: 'AtOrAbove',
          training: []
        }}
        onEdit={mockOnClick}
      />
    );

    await waitFor(() => {
      userEvent.click(screen.getByRole('button', { name: 'at or above 30%' }));
      expect(mockOnClick).toHaveBeenCalled();
    });
  });

  it('should allow option to remove', async () => {
    const mockOnRemove = jest.fn();
    render(
      <TrainingConditionCard
        trainingCriteria={{
          id: 'criteria-id',
          minScore: 30,
          ruleType: 'AtOrAbove',
          training: []
        }}
        onRemove={mockOnRemove}
      />
    );

    await waitFor(() => {
      userEvent.click(screen.getByRole('button', { name: 'Remove' }));
      expect(mockOnRemove).toHaveBeenCalledWith('criteria-id');
    });
  });

  it('should display training items', () => {
    render(
      <TrainingConditionCard
        trainingCriteria={{
          id: '1',
          minScore: 30,
          ruleType: 'AtOrAbove',
          training: [
            {
              title: 'Training Plan 1',
              planSourceId: '1',
              planType: 'Force Multiplier',
              type: 'TRAINING_PLAN'
            },
            { title: 'Course 1', courseId: '2', type: 'COURSE' },
            { title: 'Assessment 1', assessmentId: '3', type: 'ASSESSMENT' }
          ]
        }}
      />
    );

    // Need to filter by textContent because the dom elements are split by a span
    // Ex: <div><span>My bold text</span> and then the rest</div>
    expect(
      screen.getByText(
        (_, element) =>
          element.textContent === 'Force Multiplier: Training Plan 1'
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        (_, element) => element.textContent === 'Course: Course 1'
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        (_, element) => element.textContent === 'Assessment: Assessment 1'
      )
    ).toBeInTheDocument();
  });
});
