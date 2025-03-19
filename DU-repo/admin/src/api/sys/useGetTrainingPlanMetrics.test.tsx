import { render, screen } from '@@/test-utils';
import { useQuery } from '@apollo/client';
import { useGetTrainingPlanMetrics } from './useGetTrainingPlanMetrics';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn()
}));

describe('useGetTrainingPlanMetrics', () => {
  const TestComponent = () => {
    const {
      trainingPlanMetrics,
      trainingPlanMetricsLoading,
      trainingPlanMetricsError
    } = useGetTrainingPlanMetrics(); // type seems to be missing .plansStopped and .plansAssigned

    if (trainingPlanMetricsLoading) return <p>Loading...</p>;
    if (trainingPlanMetricsError) return <p>Error</p>;

    return (
      <div>
        <p>Total Plans: {trainingPlanMetrics.totalPlans}</p>
        <p>Plans In Progress: {trainingPlanMetrics.plansInProgress}</p>
        <p>Plans Completed: {trainingPlanMetrics.plansCompleted}</p>
        {/* <p>Plans Stopped: {trainingPlanMetrics.plansStopped}</p>
        <p>Plans Assigned: {trainingPlanMetrics.plansAssigned}</p> */}
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
          // plansStopped: 2, todo add to backend codegen
          // plansAssigned: 7 todo add to backend codegen
        }
      }
    });

    render(<TestComponent />);
    expect(screen.getByText('Total Plans: 10')).toBeInTheDocument();
    expect(screen.getByText('Plans In Progress: 5')).toBeInTheDocument();
    expect(screen.getByText('Plans Completed: 3')).toBeInTheDocument();
    // expect(screen.getByText('Plans Stopped: 2')).toBeInTheDocument(); missing from backend codegen
    // expect(screen.getByText('Plans Assigned: 7')).toBeInTheDocument(); missing from backend codegen
  });

  it('should show loading state', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: true,
      error: null,
      data: null
    });

    render(<TestComponent />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should show error state', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: true,
      data: null
    });

    render(<TestComponent />);
    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});
