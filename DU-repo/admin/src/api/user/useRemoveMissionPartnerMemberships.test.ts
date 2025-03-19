import { useMutation } from '@apollo/client';
import { useRemoveMissionPartnerMemberships } from './useRemoveMissionPartnerMemberships';

jest.mock('@apollo/client');

describe('useRemoveMissionPartnerMemberships', () => {
  it('should return data', async () => {
    const mockFN = jest.fn();
    const data = {
      removeMissionPartnerMemberships: {
        removedUserIds: ['123', '124'],
        invalidUserIds: ['1235']
      }
    };

    let testMutation = null;

    (useMutation as jest.Mock).mockImplementation(mutation => {
      testMutation = mutation;
      return [mockFN, { loading: false, error: null, data }];
    });

    const {
      removeMissionPartnerMembershipsData,
      removeMissionPartnerMembershipsError,
      removeMissionPartnerMembershipsLoading,
      removeMissionPartnerMemberships
    } = useRemoveMissionPartnerMemberships();

    expect(removeMissionPartnerMembershipsData).toEqual(
      data.removeMissionPartnerMemberships
    );
    expect(removeMissionPartnerMembershipsError).toEqual(null);
    expect(removeMissionPartnerMembershipsLoading).toEqual(false);
    expect(removeMissionPartnerMemberships.constructor.name).toBe('Function');
    await removeMissionPartnerMemberships(['123', '124'], 'missionpartnerID');
    expect(testMutation).toBeUndefined();
    expect(mockFN).toHaveBeenCalled();
  });

  it('should return null', () => {
    (useMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      { loading: false, error: null, data: null }
    ]);
    const {
      removeMissionPartnerMembershipsData,
      removeMissionPartnerMembershipsError,
      removeMissionPartnerMembershipsLoading,
      removeMissionPartnerMemberships
    } = useRemoveMissionPartnerMemberships();

    expect(removeMissionPartnerMembershipsData).toEqual(null);
    expect(removeMissionPartnerMembershipsError).toEqual(null);
    expect(removeMissionPartnerMembershipsLoading).toEqual(false);
    expect(removeMissionPartnerMemberships.constructor.name).toBe('Function');
  });
});
