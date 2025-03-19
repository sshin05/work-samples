import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import { useCreateManualAssessment } from './useCreateManualAssessment';
import { useFindAssessmentsBySource } from './useFindAssessmentsBySource';
import { useGetAssessmentById } from './useGetAssessmentById';
import { useUpdateAssessment } from './useUpdateAssessment';
import { useFindLearnerAssessments } from './useFindLearnerAssessments';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(),
  useLazyQuery: jest.fn(),
  useMutation: jest.fn()
}));

const mockRefetch = jest.fn();
const mockLazyRefecth = jest.fn();
const mockMutation = jest.fn();

const mockUseQuery = data => {
  useQuery.mockReturnValue({
    loading: false,
    error: false,
    data,
    refetch: mockRefetch
  });
};

const mockUseLazyQuery = data => {
  useLazyQuery.mockReturnValue([
    mockLazyRefecth,
    {
      loading: false,
      error: false,
      data
    }
  ]);
};

const mockUseMutation = data => {
  useMutation.mockReturnValue([
    mockMutation,
    {
      loading: false,
      error: false,
      data
    }
  ]);
};

describe('assessment test', () => {
  afterEach(() => {
    useMutation.mockReset();
    mockRefetch.mockReset();
    mockLazyRefecth.mockReset();
    mockMutation.mockReset();
  });

  describe('useCreateManualAssessment', () => {
    it('should return useCreateManualAssessment', async () => {
      mockUseMutation({
        createManualAssessment: {}
      });

      const createManualAssessment = useCreateManualAssessment();

      createManualAssessment.createManualAssessment({ id: 'foo' });

      expect(createManualAssessment).toEqual(
        expect.objectContaining({
          createManualAssessmentLoading: false,
          createManualAssessmentError: false,
          createManualAssessmentData: {
            createManualAssessment: {}
          },
          createManualAssessment: expect.any(Function)
        })
      );

      expect(createManualAssessment.createManualAssessment).toBeInstanceOf(
        Function
      );
      expect(mockMutation).toHaveBeenCalledWith({
        variables: {
          assessment: {
            id: 'foo'
          }
        }
      });
    });
  });

  describe('useFindAssessmentsBySource', () => {
    it('should return useFindAssessmentsBySource', () => {
      mockUseQuery({
        findAssessmentsBySource: []
      });

      const {
        assessmentsBySourceLoading,
        assessmentsBySourceError,
        assessmentsBySource
      } = useFindAssessmentsBySource();

      expect(useQuery).toHaveBeenCalled();

      expect(assessmentsBySourceLoading).toBe(false);
      expect(assessmentsBySourceError).toBe(false);
      expect(assessmentsBySource).toEqual([]);
    });

    it('should return static array if no data is passed', async () => {
      mockUseQuery();

      const { assessmentsBySource } = useFindAssessmentsBySource();

      expect(useQuery).toHaveBeenCalled();

      expect(assessmentsBySource).toEqual([]);
    });
  });

  describe('useGetAssessmentById', () => {
    it('should return useGetAssessmentById', async () => {
      mockUseLazyQuery({
        getAssessmentById: {}
      });

      const getAssessmentById = useGetAssessmentById();
      getAssessmentById.fetchAssessment({ id: 'assessment-id' });

      expect(useLazyQuery).toHaveBeenCalled();

      expect(getAssessmentById).toEqual(
        expect.objectContaining({
          assessmentByIdLoading: false,
          assessmentByIdError: false,
          assessmentById: {}
        })
      );

      expect(getAssessmentById.fetchAssessment).toBeInstanceOf(Function);
      expect(mockLazyRefecth).toHaveBeenCalledWith({
        variables: {
          id: 'assessment-id'
        }
      });
    });

    it('should return static object if no data is passed', async () => {
      mockUseLazyQuery();

      const { assessmentById } = useGetAssessmentById();

      expect(useLazyQuery).toHaveBeenCalled();

      expect(assessmentById).toEqual({});
    });
  });

  describe('useUpdateAssessment', () => {
    it('should return useUpdateAssessment', async () => {
      mockUseMutation({
        updateAssessment: {}
      });

      const updateAssessmentById = useUpdateAssessment();
      updateAssessmentById.updateAssessment({ id: 'assessment-id' });

      // We have to retrieve the VALUE of the argument (since it is a function)
      // it was called with in order to test that it is returning the correct value.
      const refetchQueriesOutput = useMutation.mock.calls[0][1].refetchQueries({
        data: {
          updateAssessment: { id: 'foo' }
        }
      });

      expect(refetchQueriesOutput).toEqual([
        {
          query: expect.anything(),
          variables: { id: 'foo' }
        }
      ]);

      expect(updateAssessmentById).toEqual(
        expect.objectContaining({
          updateAssessmentLoading: false,
          updateAssessmentError: false,
          updateAssessmentData: {
            updateAssessment: {}
          },
          updateAssessment: expect.any(Function)
        })
      );

      expect(updateAssessmentById.updateAssessment).toBeInstanceOf(Function);
      expect(mockMutation).toHaveBeenCalledWith({
        variables: {
          assessment: { id: 'assessment-id' }
        }
      });
    });
  });

  describe('useFindLearnerAssessments', () => {
    it('should return useFindLearnerAssessments', async () => {
      mockUseQuery({
        findAssessmentsByUserId: []
      });

      const getLearnerAssessments = useFindLearnerAssessments();
      getLearnerAssessments.refetchLearnerAssessments('userId');

      expect(useQuery).toHaveBeenCalled();

      expect(getLearnerAssessments).toEqual(
        expect.objectContaining({
          learnerAssessmentsLoading: false,
          learnerAssessmentsError: false,
          learnerAssessments: [],
          totalLearnerAAssessments: 0
        })
      );

      expect(getLearnerAssessments.refetchLearnerAssessments).toBeInstanceOf(
        Function
      );
      expect(mockRefetch).toHaveBeenCalledWith({
        userId: 'userId'
      });
    });

    it('should return static array if no data is passed', async () => {
      mockUseQuery();

      const { learnerAssessments } = useFindLearnerAssessments();

      expect(useQuery).toHaveBeenCalled();

      expect(learnerAssessments).toEqual([]);
    });
  });
});
