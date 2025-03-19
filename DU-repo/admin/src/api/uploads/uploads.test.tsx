import { useMutation, useQuery } from '@apollo/client';
import { render, screen, fireEvent } from '@@/test-utils';
import { useGetUserUploads } from './useGetUserUploads';
import { useDeleteUpload } from './useDeleteUpload';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(),
  useMutation: jest.fn()
}));

describe('useGetUserUploads', () => {
  const UploadsComponent = () => {
    const { uploads, refetchUploads } = useGetUserUploads();
    const { deleteUpload } = useDeleteUpload();

    deleteUpload('id');

    return (
      <>
        <p>{uploads[0].id}</p>
        <button type="button" onClick={() => refetchUploads()}>
          Fetch Uploads
        </button>
      </>
    );
  };
  it('should use hook without error', () => {
    const mockRefetch = jest.fn();
    const data = {};

    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: false,
      data: {
        getUserUploads: [{ id: 'testId' }]
      },
      refetch: mockRefetch
    });

    (useMutation as jest.Mock).mockReturnValue([
      () => {
        // Intentionally left empty.
      },
      { loading: false, error: false, data }
    ]);

    render(<UploadsComponent />);
    expect(screen.getByText('testId')).toBeInTheDocument();

    const button = screen.getByText('Fetch Uploads');
    fireEvent.click(button);
    expect(mockRefetch).toHaveBeenCalled();
  });
});
