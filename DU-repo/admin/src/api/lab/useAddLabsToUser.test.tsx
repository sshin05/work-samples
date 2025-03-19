import { render, screen, fireEvent } from '@testing-library/react';
import { useMutation } from '@apollo/client';
import { useAddLabsToUser } from './useAddLabsToUser';

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  gql: jest.fn()
}));

describe('useAddLabsToUser', () => {
  const AddLabsComponent = () => {
    const {
      addLabsToUser,
      addLabsToUserLoading,
      addLabsToUserError,
      addLabsToUserData
    } = useAddLabsToUser();

    return (
      <>
        {addLabsToUserLoading && <p>Adding labs...</p>}
        {addLabsToUserError && <p>Error: {addLabsToUserError.message}</p>}
        {addLabsToUserData && <p>Labs added successfully</p>}
        <button
          type="button"
          onClick={() => addLabsToUser('userId', ['lab1', 'lab2'])}
        >
          Add Labs
        </button>
      </>
    );
  };

  it('should use add labs hook without error', async () => {
    const mockAddLabsToUser = jest
      .fn()
      .mockResolvedValue({ data: { addLabsToUser: true } });
    (useMutation as jest.Mock).mockReturnValue([
      mockAddLabsToUser,
      { loading: false, error: null, data: null }
    ]);

    render(<AddLabsComponent />);

    const button = screen.getByText('Add Labs');
    fireEvent.click(button);

    expect(mockAddLabsToUser).toHaveBeenCalledWith({
      variables: { userId: 'userId', labIds: ['lab1', 'lab2'] }
    });
  });

  it('should handle error state', () => {
    (useMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      { loading: false, error: new Error('Test error'), data: null }
    ]);

    render(<AddLabsComponent />);
    expect(screen.getByText('Error: Test error')).toBeInTheDocument();
  });

  it('should handle successful addition', () => {
    (useMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      { loading: false, error: null, data: { addLabsToUser: true } }
    ]);

    render(<AddLabsComponent />);
    expect(screen.getByText('Labs added successfully')).toBeInTheDocument();
  });
});
