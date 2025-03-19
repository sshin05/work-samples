import { render, screen, fireEvent } from '@@/test-utils';
import { useQuery } from '@apollo/client';
import { useFindLearningPathById } from './useFindLearningPathById';

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(),
  gql: jest.fn()
}));

describe('useFindLearningPathById', () => {
  const LearningPath = () => {
    const { learningPathById, fetchLearningPath } =
      useFindLearningPathById('id');

    return (
      <>
        <p>{learningPathById?.id}</p>
        <button type="button" onClick={() => fetchLearningPath('id')}>
          Fetch Learning Path
        </button>
      </>
    );
  };
  it('should use hook without error', () => {
    const mockRefetch = jest.fn();

    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: false,
      data: {
        findLearningPathById: { id: 'test1' }
      },
      refetch: mockRefetch
    });

    render(<LearningPath />);
    expect(screen.getByText('test1')).toBeInTheDocument();

    const button = screen.getByText('Fetch Learning Path');
    fireEvent.click(button);
    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });
});
