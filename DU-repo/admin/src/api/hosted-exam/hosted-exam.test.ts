import { useMutation, useQuery } from '@apollo/client';
import { useCreateHostedExam } from './useCreateHostedExam';
import { useFindHostedExamById } from './useFindHostedExamById';
import { useUpdateHostedExam } from './useUpdateHostedExam';
import { usePublishHostedExam } from './usePublishHostedExam';
import { useAddTrainingCriteria } from './useAddTrainingCriteria';
import { useAddItemsToTrainingCriteria } from './useAddItemsToTrainingCriteria';
import { useDeleteTrainingCriteria } from './useDeleteTrainingCriteria';
import { useUpdateTrainingCriteria } from './useUpdateTrainingCriteria';
import { useAddHostedExamQuestion } from './useAddHostedExamQuestion';
import { useRemoveHostedExamQuestion } from './useRemoveHostedExamQuestion';
import { useUpdateHostedExamQuestion } from './useUpdateHostedExamQuestion';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(),
  useMutation: jest.fn()
}));

const mockUseMutation = useMutation as jest.Mock;
const mockUseQuery = useQuery as jest.Mock;

describe('hosted exam test', () => {
  beforeEach(() => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: false,
      data: {}
    });

    mockUseMutation.mockReturnValue([
      jest.fn(),
      { loading: false, error: false, data: {} }
    ]);
  });

  afterEach(() => {
    mockUseMutation.mockReset();
  });

  it('should use hosted exame hook without error', () => {
    const createHostedExam = useCreateHostedExam();
    createHostedExam.createHostedExam({
      name: 'name',
      missionPartnerId: 'mission-partner-id',
      description: 'description'
    });

    expect(mockUseMutation).toHaveBeenCalled();
    expect(createHostedExam).toEqual(
      expect.objectContaining({
        createHostedExamLoading: false,
        createHostedExamError: false,
        createHostedExamData: {}
      })
    );
    expect(createHostedExam.createHostedExam).toBeInstanceOf(Function);
  });

  it('should return findHostedExamById', () => {
    const findHostedExamById = useFindHostedExamById('foo');

    expect(mockUseQuery).toHaveBeenCalledWith(expect.anything(), {
      skip: false,
      variables: { hostedExamId: 'foo' },
      fetchPolicy: 'network-only'
    });
    expect(findHostedExamById).toEqual(
      expect.objectContaining({
        hostedExamByIdLoading: false,
        hostedExamByIdError: false,
        hostedExamById: undefined,
        fetchHostedExamById: expect.any(Function)
      })
    );
    expect(findHostedExamById.fetchHostedExamById).toBeInstanceOf(Function);
  });

  it('should return useUpdateHostedExam', () => {
    const updateHostedExam = useUpdateHostedExam();
    updateHostedExam.updateHostedExam({ id: 'foo', name: 'foo-exam' });

    expect(mockUseMutation).toHaveBeenCalledTimes(1);
    expect(updateHostedExam).toEqual(
      expect.objectContaining({
        updateHostedExamLoading: false,
        updateHostedExamError: false,
        updateHostedExamData: {}
      })
    );
    expect(updateHostedExam.updateHostedExam).toBeInstanceOf(Function);
  });

  it('should return usePublishHostedExam', () => {
    const publishHostedExam = usePublishHostedExam();
    publishHostedExam.publishHostedExam('foo');

    expect(mockUseMutation).toHaveBeenCalledTimes(1);
    expect(publishHostedExam).toEqual(
      expect.objectContaining({
        publishHostedExamLoading: false,
        publishHostedExamError: false,
        publishHostedExamData: undefined
      })
    );
    expect(publishHostedExam.publishHostedExam).toBeInstanceOf(Function);
  });

  it('should return useAddHostedExamQuestion', () => {
    const addHostedExamQuestion = useAddHostedExamQuestion();
    addHostedExamQuestion.addHostedExamQuestion('foo', {
      id: 'bar',
      title: 'title',
      type: 'Free Text'
    });

    expect(mockUseMutation).toHaveBeenCalledTimes(1);
    expect(addHostedExamQuestion).toEqual(
      expect.objectContaining({
        addHostedExamQuestionLoading: false,
        addHostedExamQuestionError: false,
        addHostedExamQuestionData: undefined
      })
    );
    expect(addHostedExamQuestion.addHostedExamQuestion).toBeInstanceOf(
      Function
    );
  });

  it('should return useUpdateHostedExamQuestion', () => {
    const updateHostedExamQuestion = useUpdateHostedExamQuestion();
    updateHostedExamQuestion.updateHostedExamQuestion('foo', {
      id: 'bar',
      title: 'title',
      type: 'Free Text'
    });

    expect(mockUseMutation).toHaveBeenCalledTimes(1);
    expect(updateHostedExamQuestion).toEqual(
      expect.objectContaining({
        updateHostedExamQuestionLoading: false,
        updateHostedExamQuestionError: false,
        updateHostedExamQuestionData: undefined
      })
    );
    expect(updateHostedExamQuestion.updateHostedExamQuestion).toBeInstanceOf(
      Function
    );
  });

  it('should return useRemoveHostedExamQuestion', () => {
    const removeHostedExamQuestion = useRemoveHostedExamQuestion();
    removeHostedExamQuestion.removeHostedExamQuestion('foo', 'bar');

    expect(mockUseMutation).toHaveBeenCalledTimes(1);
    expect(removeHostedExamQuestion).toEqual(
      expect.objectContaining({
        removeHostedExamQuestionLoading: false,
        removeHostedExamQuestionError: false,
        removeHostedExamQuestionData: undefined
      })
    );
    expect(removeHostedExamQuestion.removeHostedExamQuestion).toBeInstanceOf(
      Function
    );
  });

  describe('training criteria', () => {
    it('should return addTrainingCriteria', () => {
      const addTrainingCriteria = useAddTrainingCriteria();
      addTrainingCriteria.addTrainingCriteria('hosted-exam-id', {
        maxScore: 70,
        minScore: 20
      });

      expect(mockUseMutation).toHaveBeenCalled();
      expect(addTrainingCriteria).toEqual(
        expect.objectContaining({
          addTrainingCriteriaLoading: false,
          addTrainingCriteriaError: false,
          addTrainingCriteriaData: {}
        })
      );
      expect(addTrainingCriteria.addTrainingCriteria).toBeInstanceOf(Function);
    });

    it('should return addItemsToTrainingCriteria', () => {
      const addItemsToTrainingCriteria = useAddItemsToTrainingCriteria();
      addItemsToTrainingCriteria.addItemsToTrainingCriteria(
        'hosted-exam-id',
        'training-criteria-id',
        [
          {
            type: 'TRAINING_PLAN',
            planType: 'Force Multiplier',
            planSourceId: 'fm-1',
            planVersion: '1.0'
          },
          {
            type: 'COURSE',
            courseId: 'course-1'
          },
          {
            type: 'ASSESSMENT',
            assessmentId: 'assessment-1'
          }
        ]
      );

      expect(mockUseMutation).toHaveBeenCalled();
      expect(addItemsToTrainingCriteria).toEqual(
        expect.objectContaining({
          addItemsToTrainingCriteriaLoading: false,
          addItemsToTrainingCriteriaError: false,
          addItemsToTrainingCriteriaData: {}
        })
      );
      expect(
        addItemsToTrainingCriteria.addItemsToTrainingCriteria
      ).toBeInstanceOf(Function);
    });

    it('should return deleteTrainingCriteria', () => {
      const deleteTrainingCriteria = useDeleteTrainingCriteria();
      deleteTrainingCriteria.deleteTrainingCriteria(
        'hosted-exam-id',
        'criteria-id'
      );

      expect(mockUseMutation).toHaveBeenCalled();
      expect(deleteTrainingCriteria).toEqual(
        expect.objectContaining({
          deleteTrainingCriteriaLoading: false,
          deleteTrainingCriteriaError: false,
          deleteTrainingCriteriaData: {}
        })
      );
      expect(deleteTrainingCriteria.deleteTrainingCriteria).toBeInstanceOf(
        Function
      );
    });

    it('should return updateTrainingCriteria', () => {
      const updateTrainingCriteria = useUpdateTrainingCriteria();
      updateTrainingCriteria.updateTrainingCriteria('hosted-exam-id', {
        id: 'criteria-id',
        maxScore: 70,
        minScore: 20
      });

      expect(mockUseMutation).toHaveBeenCalled();
      expect(updateTrainingCriteria).toEqual(
        expect.objectContaining({
          updateTrainingCriteriaLoading: false,
          updateTrainingCriteriaError: false,
          updateTrainingCriteriaData: {}
        })
      );
      expect(updateTrainingCriteria.updateTrainingCriteria).toBeInstanceOf(
        Function
      );
    });
  });
});
