import { render, screen } from '@testing-library/react';
import { useQuery, useMutation } from '@apollo/client';
import { useGetTrainingPlansByUserId } from './useGetTrainingPlansByUserId';
import { useGetAllTrainingPlans } from './useGetAllTrainingPlans';
import { useGetLearnerTrainingPlans } from './useGetLearnerTrainingPlans';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(),
  useLazyQuery: jest.fn(),
  useMutation: jest.fn()
}));

describe('useGetTrainingPlansByUserId', () => {
  const TrainingPlanTest = () => {
    const { trainingPlanById } = useGetTrainingPlansByUserId('userId');

    return (
      <>
        {trainingPlanById.map(plan => (
          <p key={plan.id}>{plan.title}</p>
        ))}
      </>
    );
  };

  it('should use training plan hook without error', () => {
    const data = {};

    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: false,
      data: {
        getTrainingPlansByUserId: [{ title: 'test title' }]
      }
    });

    (useMutation as jest.Mock).mockReturnValue([
      () => {
        // Intentionally left empty.
      },
      { loading: false, error: false, data }
    ]);
    render(<TrainingPlanTest />);
    expect(screen.getByText('test title')).toBeInTheDocument();
  });
});

describe('useGetAllTrainingPlans', () => {
  const TrainingPlanTest = () => {
    const { allTrainingPlans } = useGetAllTrainingPlans();

    return (
      <>
        {allTrainingPlans.map(plan => (
          <p key={plan.title}>{plan.title}</p>
        ))}
      </>
    );
  };

  it('should use training plan hook without error', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: false,
      data: {
        getAllTrainingPlans: [{ title: 'test title2' }]
      }
    });

    render(<TrainingPlanTest />);
    expect(screen.getByText('test title2')).toBeInTheDocument();
  });
});

describe('useGetLearnerTrainingPlans', () => {
  const TrainingPlanTest = () => {
    const { learnerTrainingPlans } = useGetLearnerTrainingPlans('userId');

    return (
      <>
        {learnerTrainingPlans.map(plan => (
          <p key={plan.title}>{plan.title}</p>
        ))}
      </>
    );
  };

  it('should use training plan hook without error', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: false,
      data: {
        getTrainingPlansByUserId: [{ title: 'test title' }]
      }
    });

    render(<TrainingPlanTest />);
    expect(screen.getByText('test title')).toBeInTheDocument();
  });
});
