import { useQuery, useMutation } from '@apollo/client';
import { render, screen, fireEvent } from '@testing-library/react';
import { useFindLabById } from './useFindLabById';
import { useCreateLab } from './useCreateLab';
import { useUpdateLab } from './useUpdateLab';
import { useUploadPreviewImage } from './useUploadPreviewImage';
import { useUploadVideoInstruction } from './useUploadVideoInstruction';
import { useUploadTextInstructionImage } from './useUploadTextInstructionImage';
import { useFindLabAndInfoById } from './useFindLabAndInfoById';

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  gql: jest.fn()
}));

describe('useFindLabById', () => {
  const LabComponent = () => {
    const { findLabById, fetchLabById } = useFindLabById('labId');
    const { createLab } = useCreateLab();
    const { updateLab } = useUpdateLab();
    const { uploadPreviewImage } = useUploadPreviewImage();
    const { uploadVideoInstruction } = useUploadVideoInstruction();
    const { uploadTextInstructionImage } = useUploadTextInstructionImage();

    createLab({
      name: 'name',
      missionPartnerId: 'missionPartnerId'
    });

    updateLab({ id: 'id', missionPartnerId: 'missionPartnerId' });

    uploadPreviewImage('file', 'labId');

    uploadVideoInstruction('file', 'labId', 'labInstructionId');

    uploadTextInstructionImage('file', 'labId');

    return (
      <>
        <p>{findLabById?.id}</p>
        <button type="button" onClick={() => fetchLabById('id')}>
          Fetch Lab
        </button>
      </>
    );
  };
  it('should use lab hook without error', () => {
    const mockRefetch = jest.fn();
    const data = {};

    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: false,
      data: {
        findLabById: { id: 'test1' }
      },
      refetch: mockRefetch
    });

    (useMutation as jest.Mock).mockReturnValue([
      () => {
        // Intentionally left empty.
      },
      { loading: false, error: false, data }
    ]);
    render(<LabComponent />);
    expect(screen.getByText('test1')).toBeInTheDocument();
    const button = screen.getByText('Fetch Lab');
    fireEvent.click(button);
    expect(mockRefetch).toHaveBeenCalled();
  });
});

describe('useFindLabAndInfoById', () => {
  const LabComponent = () => {
    const { relevantLabInfo, fetchLabAndInfoById } =
      useFindLabAndInfoById('labId');

    const [coreConcept] = relevantLabInfo?.coreConcepts;

    return (
      <>
        <p>{coreConcept.id}</p>
        <button type="button" onClick={() => fetchLabAndInfoById('id')}>
          Fetch Lab
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
        fetchRelevantLabInformation: { coreConcepts: [{ id: 'test2' }] }
      },
      refetch: mockRefetch
    });

    render(<LabComponent />);
    expect(screen.getByText('test2')).toBeInTheDocument();
    const button = screen.getByText('Fetch Lab');
    fireEvent.click(button);
    expect(mockRefetch).toHaveBeenCalled();
  });
});
