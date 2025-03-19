import { render, screen } from '@@/test-utils';
import { useQuery } from '@apollo/client';
import { useGetNewTrainingPlanMetrics } from './useGetNewTrainingPlanMetrics';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn()
}));

describe('useGetNewTrainingPlanMetrics', () => {
  const TestComponent = ({ branch, dayRange }) => {
    const {
      trainingPlanMetrics,
      trainingPlanMetricsLoading,
      trainingPlanMetricsError
    } = useGetNewTrainingPlanMetrics(branch, dayRange);

    if (trainingPlanMetricsLoading) return <p>Loading...</p>;
    if (trainingPlanMetricsError) return <p>Error</p>;

    return (
      <div>
        <p>Total Plans: {trainingPlanMetrics.totalPlans}</p>
        <p>Plans In Progress: {trainingPlanMetrics.plansInProgress}</p>
        <p>Plans Completed: {trainingPlanMetrics.plansCompleted}</p>
      </div>
    );
  };

  it('should return the training plan metrics', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: {
        getTrainingPlanMetrics: {
          totalPlans: 10,
          plansInProgress: 5,
          plansCompleted: 3
        }
      }
    });

    render(<TestComponent branch="test-branch" dayRange={7} />);
    expect(screen.getByText('Total Plans: 10')).toBeInTheDocument();
    expect(screen.getByText('Plans In Progress: 5')).toBeInTheDocument();
    expect(screen.getByText('Plans Completed: 3')).toBeInTheDocument();
  });

  it('should show loading state', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: true,
      error: null,
      data: null
    });

    render(<TestComponent branch="test-branch" dayRange={7} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should show error state', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: true,
      data: null
    });

    render(<TestComponent branch="test-branch" dayRange={7} />);
    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});
