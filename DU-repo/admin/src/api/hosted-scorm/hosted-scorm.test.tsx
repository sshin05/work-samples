import { useMutation, useQuery } from '@apollo/client';
import { fireEvent, render, screen } from '@testing-library/react';
import { useFindHostedScormById } from './useFindHostedScormById';
import { useCreateHostedScorm } from './useCreateHostedScorm';
import { useUpdateHostedScorm } from './useUpdateHostedScorm';
import { useUploadHostedScormPackage } from './useUploadHostedScormPackage';
import { usePublishHostedScorm } from './usePublishHostedScorm';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(),
  useMutation: jest.fn()
}));

describe('useFindHostedScormById plus mutations', () => {
  const HostedScorm = () => {
    const { hostedScormById, fetchHostedScormById } =
      useFindHostedScormById('id');
    const { createHostedScorm } = useCreateHostedScorm();
    const { updateHostedScorm } = useUpdateHostedScorm();
    const { uploadHostedScormPackage } = useUploadHostedScormPackage();
    const { publishHostedScorm } = usePublishHostedScorm();

    createHostedScorm({
      missionPartnerId: 'yourMissionPartnerId',
      name: 'Exam name'
    });

    updateHostedScorm({
      description: '',
      duration: 123,
      id: 'hostedScormId',
      missionPartnerId: 'missionPartnerId',
      name: 'updateHostedScorm: mock name'
    });

    uploadHostedScormPackage({ file: 'file', id: 'id' }, 'missionPartnerId');

    publishHostedScorm('id', 'missionPartnerId');

    return (
      <>
        <p>{hostedScormById.id}</p>
        <button onClick={() => fetchHostedScormById('id')}>Fetch Scorm</button>
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
        findHostedScormById: { id: 'test' }
      },
      refetch: mockRefetch
    });

    (useMutation as jest.Mock).mockReturnValue([
      () => {
        // Intentionally left empty.
      },
      { loading: false, error: false, data }
    ]);
    render(<HostedScorm />);
    expect(screen.getByText('test')).toBeInTheDocument();

    const button = screen.getByText('Fetch Scorm');
    fireEvent.click(button);
    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });
});
