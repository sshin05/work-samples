import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { renderHook } from '@@/test-utils';
import { useFindAllMissionPartnersAdminPortal } from './useFindAllMissionPartnersAdminPortal';
import { useFindMissionPartnerById } from './useFindMissionPartnerById';
import { useExportLearners } from './useExportLearners';
import { useExportSurveys } from './useExportSurveys';
import { useExportQuizExams } from './useExportQuizExams';
import { useExportTrainingPlanTranscriptsForMissionPartner } from './useExportTrainingPlanTranscriptsForMissionPartner';
import { useExportTrainingPlanTranscriptsForGroup } from './useExportTrainingPlanTranscriptsForGroup';
import { useExportTrainingPlanCoursesForMissionPartner } from './useExportTrainingPlanCoursesForMissionPartner';
import { useExportCourseLevelMetricsForTrainingPlan } from './useExportCourseLevelMetricsForTrainingPlan';
import { useSendReminderToNonOnboarded } from './useSendReminderToNonOnboarded';
import { useFindUserMissionPartnerMemberships } from './useFindUserMissionPartnerMemberships';
import { useCreateMissionPartner } from './useCreateMissionPartner';
import { useUpdateMissionPartner } from './useUpdateMissionPartner';
import { useAggregateTranscriptTrainingPlansForGroup } from './useAggregateTranscriptTrainingPlansForGroup';
import { useFindCategorizedTimeSpentLearningMissionPartnerDashboard } from './useFindCategorizedTimeSpentLearningMissionPartnerDashboard';
import { useGetPlansQuarterlyByMissionPartner } from './useGetPlansQuarterlyByMissionPartner';
import { useGetCoursesQuarterlyByMissionPartner } from './useGetCoursesQuarterlyByMissionPartner';
import { useAddFeaturedTrainingItems } from './useAddFeaturedTrainingItems';
import { useFindMissionPartnerMembersByUserId } from './useFindMissionPartnerMembersByUserId';
import { useUpdateIsMarketplaceEnabled } from './useUpdateIsMarketplaceEnabled';
import { useUploadMissionPartnerLogo } from './useUploadMissionPartnerLogo';
import { useFindMissionPartnerMinDetails } from './useFindMissionPartnerMinDetails';
import { useFindAllMissionPartnersMinDetails } from './useFindAllMissionPartnersMinDetails';
import { useRemoveFeaturedTrainingItems } from './useRemoveFeaturedTrainingItems';
import { useEnableExportsByTypesForMissionPartnerId } from './useEnableExportsByTypesForMissionPartnerId';
import { useDisableExportsByTypesForMissionPartnerId } from './useDisableExportsByTypesForMissionPartnerId';
import { useGetPublicMissionPartnerExports } from './useGetPublicMissionPartnerExports';
import { useToggleMissionPartnerTrial } from './useToggleMissionPartnerTrial';
import { useFindFeaturedTrainingIds } from './useFindFeaturedTrainingIds';
import { useExportIndividualLearnerActivity } from './useExportIndividualLearnerActivity';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useMemo: jest.fn()
}));

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useLazyQuery: jest.fn(),
  useQuery: jest.fn(),
  useMutation: jest.fn()
}));

describe('Mission Partners test', () => {
  describe('useFindAllMissionPartnersAdminPortal', () => {
    it('should return an object containing mutation variables', () => {
      useQuery.mockReturnValue({
        loading: false,
        error: undefined,
        data: undefined
      });

      const result = useFindAllMissionPartnersAdminPortal();

      expect(result.missionPartnersLoading).toEqual(false);
      expect(result.missionPartnersError).toEqual(undefined);
      expect(result.missionPartners).toEqual([]);
    });
  });

  describe('useFindMissionPartnerById', () => {
    it('should return an object containing mutation variables', () => {
      useQuery.mockReturnValue({
        loading: false,
        error: undefined,
        data: null
      });

      const result = useFindMissionPartnerById();

      expect(result.missionPartnerLoading).toEqual(false);
      expect(result.missionPartnerError).toEqual(undefined);
      expect(result.missionPartner).toEqual(undefined);
    });
  });

  describe('useExportLearners', () => {
    it('should return an object containing mutation variables', () => {
      useLazyQuery.mockReturnValue([
        jest.fn,
        {
          loading: false,
          error: undefined,
          data: undefined
        }
      ]);

      const result = useExportLearners();

      expect(result.exportLearners).toBeDefined();
      expect(result.exportLearnersLoading).toEqual(false);
      expect(result.exportLearnersError).toEqual(undefined);
      expect(result.exportLearnersData).toEqual(null);
    });
  });

  describe('useExportIndividualLearnerActivity', () => {
    it('should return an object containing mutation variables', () => {
      useLazyQuery.mockReturnValue([
        jest.fn,
        {
          loading: false,
          error: undefined,
          data: undefined
        }
      ]);

      const result = useExportIndividualLearnerActivity();

      expect(result.exportIndividualLearnerActivity).toBeDefined();
      expect(result.exportIndividualLearnerActivityLoading).toEqual(false);
      expect(result.exportIndividualLearnerActivityError).toEqual(undefined);
      expect(result.exportIndividualLearnerActivityData).toEqual(undefined);
    });
  });

  describe('useExportSurveys', () => {
    it('should return an object containing mutation variables', () => {
      useLazyQuery.mockReturnValue([
        jest.fn,
        {
          loading: false,
          error: undefined,
          data: undefined
        }
      ]);

      const result = useExportSurveys();

      expect(result.exportSurveys).toBeDefined();
      expect(result.exportSurveysLoading).toEqual(false);
      expect(result.exportSurveysError).toEqual(undefined);
      expect(result.exportSurveysData).toEqual(null);
    });
  });

  describe('useExportQuizExams', () => {
    it('should return an object containing mutation variables', () => {
      useLazyQuery.mockReturnValue([
        jest.fn,
        {
          loading: false,
          error: undefined,
          data: undefined
        }
      ]);

      const result = useExportQuizExams();

      expect(result.exportQuizExams).toBeDefined();
      expect(result.exportQuizExamsLoading).toEqual(false);
      expect(result.exportQuizExamsError).toEqual(undefined);
      expect(result.exportQuizExamsData).toEqual(null);
    });
  });

  describe('useExportTrainingPlanTranscriptsForMissionPartner', () => {
    it('should return an object containing mutation variables', () => {
      useLazyQuery.mockReturnValue([
        jest.fn,
        {
          loading: false,
          error: undefined,
          data: undefined
        }
      ]);

      const result = useExportTrainingPlanTranscriptsForMissionPartner();

      expect(
        result.exportTrainingPlanTranscriptsForMissionPartner
      ).toBeDefined();
      expect(
        result.exportTrainingPlanTranscriptsForMissionPartnerLoading
      ).toEqual(false);
      expect(
        result.exportTrainingPlanTranscriptsForMissionPartnerError
      ).toEqual(undefined);
      expect(result.exportTrainingPlanTranscriptsForMissionPartnerData).toEqual(
        null
      );
    });
  });

  describe('useExportTrainingPlanTranscriptsForGroup', () => {
    it('should return an object containing mutation variables', () => {
      useLazyQuery.mockReturnValue([
        jest.fn,
        {
          loading: false,
          error: undefined,
          data: undefined
        }
      ]);

      const result = useExportTrainingPlanTranscriptsForGroup();

      expect(result.exportTrainingPlanTranscriptsForGroup).toBeDefined();
      expect(result.exportTrainingPlanTranscriptsForGroupLoading).toEqual(
        false
      );
      expect(result.exportTrainingPlanTranscriptsForGroupError).toEqual(
        undefined
      );
      expect(result.exportTrainingPlanTranscriptsForGroupData).toEqual(null);
    });
  });

  describe('useExportTrainingPlanCoursesForMissionPartner', () => {
    it('should return an object containing mutation variables', () => {
      useLazyQuery.mockReturnValue([
        jest.fn,
        {
          loading: false,
          error: undefined,
          data: undefined
        }
      ]);

      const result = useExportTrainingPlanCoursesForMissionPartner();

      expect(result.exportTrainingPlanCoursesForMissionPartner).toBeDefined();
      expect(result.exportTrainingPlanCoursesForMissionPartnerLoading).toEqual(
        false
      );
      expect(result.exportTrainingPlanCoursesForMissionPartnerError).toEqual(
        undefined
      );
      expect(result.exportTrainingPlanCoursesForMissionPartnerData).toEqual(
        null
      );
    });
  });

  describe('useExportCourseLevelMetricsForTrainingPlan', () => {
    it('should return an object containing mutation variables', () => {
      useLazyQuery.mockReturnValue([
        jest.fn,
        {
          loading: false,
          error: undefined,
          data: undefined
        }
      ]);

      const result = useExportCourseLevelMetricsForTrainingPlan();

      expect(result.exportCourseLevelMetricsForTrainingPlan).toBeDefined();
      expect(result.exportCourseLevelMetricsForTrainingPlanLoading).toEqual(
        false
      );
      expect(result.exportCourseLevelMetricsForTrainingPlanError).toEqual(
        undefined
      );
      expect(result.exportCourseLevelMetricsForTrainingPlanData).toEqual(null);
    });
  });

  describe('useSendReminderToNonOnboarded', () => {
    it('should return emails sent and not sent', () => {
      useMutation.mockReturnValue([
        jest.fn,
        {
          loading: false,
          error: undefined,
          data: undefined
        }
      ]);

      const result = useSendReminderToNonOnboarded();

      expect(result.sendReminderToNonOnboarded).toBeDefined();
      expect(result.sendReminderToNonOnboardedLoading).toEqual(false);
      expect(result.sendReminderToNonOnboardedError).toEqual(undefined);
      expect(result.sendReminderToNonOnboardedData).toEqual(undefined);
    });
  });

  describe('useCreateMissionPartner', () => {
    const missionPartnersData = {
      data: { id: '1', name: 'test-1', affiliateId: 'usaf' }
    };

    it('should return create new mission partner', () => {
      const testMock = jest.fn();
      useMutation.mockReturnValue([
        data => testMock(data),
        { loading: false, error: null }
      ]);

      const { createMissionPartner } = useCreateMissionPartner();

      createMissionPartner(missionPartnersData.data);

      expect(createMissionPartner).toBeInstanceOf(Function);
      expect(testMock).toHaveBeenCalledWith({
        variables: {
          input: { id: '1', name: 'test-1', affiliateId: 'usaf' }
        }
      });
    });
  });

  describe('useUpdateMissionPartner', () => {
    const missionPartnersData = {
      data: { id: '1', name: 'test-1', affiliateId: 'usaf' }
    };

    it('should return update mission partner', () => {
      const testMock = jest.fn();
      useMutation.mockReturnValue([
        data => testMock(data),
        { loading: false, error: null }
      ]);

      const { updateMissionPartner } = useUpdateMissionPartner();

      updateMissionPartner(missionPartnersData.data);

      expect(updateMissionPartner).toBeInstanceOf(Function);
      expect(testMock).toHaveBeenCalledWith({
        variables: {
          input: { id: '1', name: 'test-1', affiliateId: 'usaf' }
        }
      });
    });
  });

  describe('useAggregateTranscriptTrainingPlansForGroup', () => {
    it('should return data', () => {
      useQuery.mockReturnValue({
        loading: false,
        error: null,
        data: { aggregateTranscriptTrainingPlansForGroup: { foo: 'bar' } },
        refetch: jest.fn()
      });

      const {
        transcriptTrainingPlansLoading,
        transcriptTrainingPlansError,
        transcriptTrainingPlans
      } = useAggregateTranscriptTrainingPlansForGroup();

      expect(transcriptTrainingPlans).toEqual({ foo: 'bar' });
      expect(transcriptTrainingPlansError).toEqual(null);
      expect(transcriptTrainingPlansLoading).toEqual(false);
    });
  });

  describe('useFindCategorizedTimeSpentLearningMissionPartnerDashboard', () => {
    it('should return data', () => {
      useQuery.mockReturnValue({
        loading: false,
        error: null,
        data: { findCategorizedTimeSpentLearning: { foo: 'bar' } },
        refetch: jest.fn()
      });

      const {
        findCategorizedTimeSpentLearningLoading,
        findCategorizedTimeSpentLearningError,
        findCategorizedTimeSpentLearning
      } = useFindCategorizedTimeSpentLearningMissionPartnerDashboard();

      expect(findCategorizedTimeSpentLearning).toEqual({ foo: 'bar' });
      expect(findCategorizedTimeSpentLearningError).toEqual(null);
      expect(findCategorizedTimeSpentLearningLoading).toEqual(false);
    });
  });

  describe('useGetPlansQuarterlyByMissionPartner', () => {
    it('should return data', () => {
      useQuery.mockReturnValue({
        loading: false,
        error: null,
        data: { getPlansQuarterlyByMissionPartner: { foo: 'bar' } },
        refetch: jest.fn()
      });

      const {
        getPlansQuarterlyByMissionPartnerLoading,
        getPlansQuarterlyByMissionPartnerError,
        getPlansQuarterlyByMissionPartner
      } = useGetPlansQuarterlyByMissionPartner();

      expect(getPlansQuarterlyByMissionPartner).toEqual({ foo: 'bar' });
      expect(getPlansQuarterlyByMissionPartnerError).toEqual(null);
      expect(getPlansQuarterlyByMissionPartnerLoading).toEqual(false);
    });
  });

  describe('useGetCoursesQuarterlyByMissionPartner', () => {
    it('should return data', () => {
      useQuery.mockReturnValue({
        loading: false,
        error: null,
        data: { getCoursesQuarterlyByMissionPartner: { foo: 'bar' } },
        refetch: jest.fn()
      });

      const {
        getCoursesQuarterlyByMissionPartnerLoading,
        getCoursesQuarterlyByMissionPartnerError,
        getCoursesQuarterlyByMissionPartner
      } = useGetCoursesQuarterlyByMissionPartner();

      expect(getCoursesQuarterlyByMissionPartner).toEqual({ foo: 'bar' });
      expect(getCoursesQuarterlyByMissionPartnerError).toEqual(null);
      expect(getCoursesQuarterlyByMissionPartnerLoading).toEqual(false);
    });
  });

  describe('useAddFeaturedTrainingItems', () => {
    const featuredTrainingInputData = {
      data: { id: '1', featuredTraining: [{ id: 'test' }] }
    };

    it('should return data', () => {
      const testMock = jest.fn();
      useMutation.mockReturnValue([
        data => testMock(data),
        { loading: false, error: null }
      ]);

      const {
        addFeaturedTrainingItems,
        addFeaturedTrainingItemsData,
        addFeaturedTrainingItemsLoading,
        addFeaturedTrainingItemsError
      } = useAddFeaturedTrainingItems();

      addFeaturedTrainingItems(featuredTrainingInputData.data);

      expect(addFeaturedTrainingItems).toBeInstanceOf(Function);
      expect(testMock).toHaveBeenCalledWith({
        variables: { input: { id: '1', featuredTraining: [{ id: 'test' }] } }
      });
      expect(addFeaturedTrainingItemsData).toEqual([]);
      expect(addFeaturedTrainingItemsLoading).toEqual(false);
      expect(addFeaturedTrainingItemsError).toEqual(null);
    });
  });

  describe('useRemoveFeaturedTrainingItems', () => {
    const removeFeaturedTrainingInputData = {
      data: {
        missionPartnerId: '1',
        input: { type: 'test' }
      }
    };

    it('should return data', () => {
      const testMock = jest.fn();
      useMutation.mockReturnValue([
        data => testMock(data),
        { loading: false, error: null }
      ]);

      const {
        removeFeaturedTrainingItems,
        removeFeaturedTrainingItemsData,
        removeFeaturedTrainingItemsLoading,
        removeFeaturedTrainingItemsError
      } = useRemoveFeaturedTrainingItems();

      removeFeaturedTrainingItems(removeFeaturedTrainingInputData.data);

      expect(removeFeaturedTrainingItems).toBeInstanceOf(Function);
      expect(testMock).toHaveBeenCalled();
      expect(removeFeaturedTrainingItemsData).toEqual([]);
      expect(removeFeaturedTrainingItemsLoading).toEqual(false);
      expect(removeFeaturedTrainingItemsError).toEqual(null);
    });
  });

  describe('useFindMissionPartnerMembersByUserId', () => {
    it('should return data', () => {
      useQuery.mockReturnValue({
        loading: false,
        error: null,
        data: { findMissionPartnerMembersByUserId: [{ id: '1' }] }
      });

      const {
        userMissonPartnersLoading,
        userMissonPartnersError,
        userMissonPartners
      } = useFindMissionPartnerMembersByUserId();

      expect(userMissonPartners).toEqual([{ id: '1' }]);
      expect(userMissonPartnersError).toEqual(null);
      expect(userMissonPartnersLoading).toEqual(false);
    });
  });

  describe('useUpdateIsMarketplaceEnabled', () => {
    const input = {
      id: '1',
      isMarketplaceEnabled: true
    };

    it('should return data', () => {
      const testMock = jest.fn();
      useMutation.mockReturnValue([
        data => testMock(data),
        {
          loading: false,
          error: null
        }
      ]);

      const {
        updateIsMarketplaceEnabled,
        updateIsMarketplaceEnabledLoading,
        updateIsMarketplaceEnabledError,
        updateIsMarketplaceEnabledData
      } = useUpdateIsMarketplaceEnabled();

      updateIsMarketplaceEnabled(input);

      expect(updateIsMarketplaceEnabled).toBeInstanceOf(Function);
      expect(testMock).toHaveBeenCalledWith({
        variables: { input: { id: '1', isMarketplaceEnabled: true } }
      });
      expect(updateIsMarketplaceEnabledData).toBeUndefined();
      expect(updateIsMarketplaceEnabledLoading).toEqual(false);
      expect(updateIsMarketplaceEnabledError).toEqual(null);
    });

    it('should handle loading state', () => {
      const testMock = jest.fn();
      useMutation.mockReturnValue([
        data => testMock(data),
        {
          loading: true,
          error: null
        }
      ]);

      const { updateIsMarketplaceEnabled, updateIsMarketplaceEnabledLoading } =
        useUpdateIsMarketplaceEnabled();

      updateIsMarketplaceEnabled(input);
      expect(updateIsMarketplaceEnabledLoading).toEqual(true);
    });
  });

  describe('useUploadMissionPartnerLogo', () => {
    const input = {
      id: '1',
      logo: 'test'
    };

    it('should return data', () => {
      const testMock = jest.fn();
      useMutation.mockReturnValue([
        data => testMock(data),
        {
          loading: false,
          error: null
        }
      ]);

      const {
        uploadMissionPartnerLogo,
        uploadMissionPartnerLogoLoading,
        uploadMissionPartnerLogoError,
        uploadMissionPartnerLogoData
      } = useUploadMissionPartnerLogo();

      uploadMissionPartnerLogo(input);

      expect(uploadMissionPartnerLogo).toBeInstanceOf(Function);
      expect(testMock).toHaveBeenCalledWith({
        variables: { file: { id: '1', logo: 'test' } }
      });
      expect(uploadMissionPartnerLogoData).toBeUndefined();
      expect(uploadMissionPartnerLogoLoading).toEqual(false);
      expect(uploadMissionPartnerLogoError).toEqual(null);
    });
  });

  describe('useFindMissionPartnerMinDetails', () => {
    it('should return an object containing mutation variables', () => {
      useQuery.mockReturnValue({
        loading: false,
        error: undefined,
        data: null
      });

      const result = useFindMissionPartnerMinDetails();

      expect(result.missionPartnerMinDetailsLoading).toEqual(false);
      expect(result.missionPartnerMinDetailsError).toEqual(undefined);
      expect(result.missionPartnerMinDetails).toEqual(null);
    });
  });

  describe('useFindAllMissionPartnersMinDetails', () => {
    it('should return an object containing mutation variables', () => {
      useQuery.mockReturnValue({
        loading: false,
        error: undefined,
        data: []
      });

      const result = useFindAllMissionPartnersMinDetails();

      expect(result.missionPartnersMinDetailsLoading).toEqual(false);
      expect(result.missionPartnersMinDetailsError).toEqual(undefined);
      expect(result.missionPartnersMinDetails).toEqual([]);
    });
  });

  describe('useFindUserMissionPartnerMemberships', () => {
    const missionPartnerData = {
      data: [
        {
          id: '1',
          name: 'test-1',
          slug: 'usaf',
          description: 'test description'
        }
      ]
    };
    it('should return user mission partner memberships data', () => {
      const data = {
        findUserMissionPartnerMemberships: missionPartnerData
      };

      useQuery.mockReturnValue({
        loading: false,
        error: null,
        data: data,
        refetch: jest.fn()
      });

      const {
        userMissionPartnersLoading,
        userMissionPartnersError,
        userMissionPartners
      } = useFindUserMissionPartnerMemberships();

      expect(userMissionPartners).toEqual(missionPartnerData);
      expect(userMissionPartnersError).toEqual(null);
      expect(userMissionPartnersLoading).toEqual(false);
    });
  });

  describe('useEnableExportsByTypesForMissionPartnerId', () => {
    it('should return an object containing enabled exports', async () => {
      const mockEnableExportsByTypesForMissionPartner = jest.fn();
      useMutation.mockReturnValue([
        mockEnableExportsByTypesForMissionPartner,
        {
          loading: false,
          error: undefined,
          data: null
        }
      ]);

      const { result } = renderHook(() =>
        useEnableExportsByTypesForMissionPartnerId()
      );

      const {
        enableExportsByTypesForMissionPartner,
        enableExportsByTypesForMissionPartnerData,
        enableExportsByTypesForMissionPartnerLoading,
        enableExportsByTypesForMissionPartnerError
      } = result.current;

      await enableExportsByTypesForMissionPartner(
        'downloadTypes',
        'missionPartnerId'
      );
      expect(mockEnableExportsByTypesForMissionPartner).toHaveBeenCalledWith({
        variables: {
          downloadTypes: 'downloadTypes',
          missionPartnerId: 'missionPartnerId'
        }
      });

      expect(enableExportsByTypesForMissionPartnerLoading).toEqual(false);
      expect(enableExportsByTypesForMissionPartnerError).toEqual(undefined);
      expect(enableExportsByTypesForMissionPartnerData).toEqual(null);
    });
  });

  describe('useDisableExportsByTypesForMissionPartnerId', () => {
    it('should return an object containing enabled exports', async () => {
      const mockDisableExportsByTypesForMissionPartner = jest.fn();
      useMutation.mockReturnValue([
        mockDisableExportsByTypesForMissionPartner,
        {
          loading: false,
          error: undefined,
          data: null
        }
      ]);

      const { result } = renderHook(() =>
        useDisableExportsByTypesForMissionPartnerId()
      );

      const {
        disableExportsByTypesForMissionPartner,
        disableExportsByTypesForMissionPartnerData,
        disableExportsByTypesForMissionPartnerLoading,
        disableExportsByTypesForMissionPartnerError
      } = result.current;

      await disableExportsByTypesForMissionPartner(
        ['downloadTypes'],
        'missionPartnerId'
      );

      expect(mockDisableExportsByTypesForMissionPartner).toHaveBeenCalledWith({
        variables: {
          downloadTypes: ['downloadTypes'],
          missionPartnerId: 'missionPartnerId'
        }
      });

      expect(disableExportsByTypesForMissionPartnerLoading).toEqual(false);
      expect(disableExportsByTypesForMissionPartnerError).toEqual(undefined);
      expect(disableExportsByTypesForMissionPartnerData).toEqual(null);
    });
  });

  describe('useGetPublicMissionPartnerExports', () => {
    it('should return an object containing enabled exports', () => {
      const mockRefetch = jest.fn();
      useQuery.mockReturnValue({
        refetch: mockRefetch,
        loading: undefined,
        error: undefined,
        data: []
      });

      const result = useGetPublicMissionPartnerExports();
      result.fetchPublicMissionPartnerExports('missionPartnerId');

      expect(mockRefetch).toHaveBeenCalled();
      expect(result.getPublicMissionPartnerExportsLoading).toEqual(undefined);
      expect(result.getPublicMissionPartnerExportsError).toEqual(undefined);
      expect(result.getPublicMissionPartnerExportsData).toEqual([]);
    });
  });

  describe('useToggleMissionPartnerTrial', () => {
    it('should return an object containing trial start and end dates', () => {
      const testMock = jest.fn();
      useMutation.mockReturnValue([
        testMock,
        {
          loading: false,
          error: undefined,
          data: undefined
        }
      ]);

      const result = useToggleMissionPartnerTrial();

      result.toggleMissionPartnerTrial('123', false);
      expect(testMock).toHaveBeenCalledWith({
        variables: { missionPartnerId: '123', enable: false }
      });
      expect(result.toggleMissionPartnerTrialLoading).toEqual(false);
      expect(result.toggleMissionPartnerTrialError).toEqual(undefined);
      expect(result.toggleMissionPartnerTrialData).toEqual(undefined);
    });
    describe('useFindFeaturedTrainingIds', () => {
      it('should return an array containing featured training ids', async () => {
        useQuery.mockReturnValue({
          data: {
            findMissionPartnerById: {
              featuredTraining: [
                { type: 'COURSE', courseId: '1' },
                { type: 'ASSESSMENT', assessmentId: '2' },
                { type: 'TRAINING_PLAN', planSourceId: '3' },
                { type: 'XYZ' }
              ]
            }
          },
          loading: false,
          error: undefined
        });

        const result = useFindFeaturedTrainingIds();
        expect(result.featuredTrainingIds).toEqual(['1', '2', '3']);
      });
    });
  });
});
