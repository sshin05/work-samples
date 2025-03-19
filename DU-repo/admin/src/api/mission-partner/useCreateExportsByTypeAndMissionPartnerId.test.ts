import { renderHook } from '@@/test-utils';
import { useCreateExportsByTypeAndMissionPartnerId } from './useCreateExportsByTypeAndMissionPartnerId';
import { useMutation } from '@apollo/client';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useMutation: jest.fn()
}));

describe('useCreateExportsByTypeAndMissionPartnerId', () => {
  it('should return an object containing mutation variables', async () => {
    const mockCreateExportByTypeAndMissionPartnerId = jest.fn();
    (useMutation as jest.Mock).mockReturnValue([
      mockCreateExportByTypeAndMissionPartnerId,
      {
        loading: false,
        error: undefined,
        data: null
      }
    ]);

    const { result } = renderHook(() =>
      useCreateExportsByTypeAndMissionPartnerId()
    );

    const {
      createExportByTypeAndMissionPartnerId,
      createExportByTypeAndMissionPartnerIdLoading,
      createExportByTypeAndMissionPartnerIdError,
      createExportByTypeAndMissionPartnerIdData
    } = result.current;

    createExportByTypeAndMissionPartnerId('downloadType', 'missionPartnerId');

    expect(mockCreateExportByTypeAndMissionPartnerId).toHaveBeenCalledWith({
      variables: {
        downloadType: 'downloadType',
        missionPartnerId: 'missionPartnerId'
      }
    });

    expect(createExportByTypeAndMissionPartnerIdLoading).toEqual(false);
    expect(createExportByTypeAndMissionPartnerIdError).toEqual(undefined);
    expect(createExportByTypeAndMissionPartnerIdData).toEqual(null);
  });
});
