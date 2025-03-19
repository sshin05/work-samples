import { useQuery } from '@apollo/client';
import { render, screen, fireEvent } from '@testing-library/react';
import { useFindTranscriptLabsByUserId } from './useFindTranscriptLabsByUserId';

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  gql: jest.fn()
}));

describe('useFindTranscriptLabsByUserId', () => {
  const TranscriptLabsComponent = () => {
    const {
      transcriptLabs,
      transcriptLabsLoading,
      transcriptLabsError,
      refetchTranscriptLabs
    } = useFindTranscriptLabsByUserId('userId');

    return (
      <>
        {transcriptLabsLoading && <p>Loading...</p>}
        {transcriptLabsError && <p>Error: {transcriptLabsError.message}</p>}
        {transcriptLabs.map(lab => (
          <p key={lab.lab.id}>{lab.lab.name}</p>
        ))}
        <button type="button" onClick={() => refetchTranscriptLabs('userId')}>
          Refetch Transcript Labs
        </button>
      </>
    );
  };

  it('should use transcript labs hook without error', () => {
    const mockRefetch = jest.fn();
    const mockData = {
      findTranscriptLabsByUserId: [
        {
          lab: { id: 'lab1', name: 'Test Lab 1' },
          progress: { userId: 'userId', labId: 'lab1', status: 'IN_PROGRESS' }
        }
      ]
    };

    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: mockData,
      refetch: mockRefetch
    });

    render(<TranscriptLabsComponent />);
    expect(screen.getByText('Test Lab 1')).toBeInTheDocument();

    const button = screen.getByText('Refetch Transcript Labs');
    fireEvent.click(button);
    expect(mockRefetch).toHaveBeenCalledWith({ userId: 'userId' });
  });

  it('should handle error state', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: new Error('Test error'),
      data: null,
      refetch: jest.fn()
    });

    render(<TranscriptLabsComponent />);
    expect(screen.getByText('Error: Test error')).toBeInTheDocument();
  });
});
