import { useMemo } from 'react';
import { useFindLearnerAssessments } from '@/api/assessment';
import { useFindTranscriptCoursesByUserId } from '@/api/course';
import { useFindGroupById } from '@/api/groups';
import { useGetTrainingPlansByUserId } from '@/api/training-plan';
import type { UseFilteredCurriculumDataProps } from './UseFilteredCurriculumDataProps';

export const useFilteredCurriculumData = ({
  targetType,
  targetId,
  missionPartnerId,
  forceMultiplierById,
  findLabById
}: UseFilteredCurriculumDataProps) => {
  const { groupById } = useFindGroupById(
    targetType === 'cohort' ? targetId : undefined
  );
  const { trainingPlanById: plansByUserId } = useGetTrainingPlansByUserId(
    targetType === 'user' ? targetId : undefined
  );
  const { transcriptCourses: coursesByUserId } =
    useFindTranscriptCoursesByUserId(
      targetType === 'user' ? targetId : undefined
    );
  const { learnerAssessments: assessmentsByUserId } = useFindLearnerAssessments(
    targetType === 'user' ? targetId : undefined,
    missionPartnerId
  );

  const filteredCurriculumData = useMemo(() => {
    const existing = {
      plans: [],
      courses: [],
      assessments: [],
      surveys: [],
      labs: []
    };

    if (targetType === 'user') {
      existing.plans = plansByUserId;
      existing.courses = coursesByUserId;
      existing.assessments = assessmentsByUserId;
    }

    if (targetType === 'force-multiplier') {
      existing.courses = forceMultiplierById?.items.filter(
        ({ item }) => item.__typename === 'Course'
      );

      existing.assessments = forceMultiplierById?.items.filter(
        ({ item }) => item.__typename === 'Assessment'
      );

      existing.surveys = forceMultiplierById?.items.filter(
        ({ item }) => item.__typename === 'Survey'
      );

      existing.labs = forceMultiplierById?.items.filter(
        ({ item }) => item.__typename === 'Lab'
      );
    }

    if (targetType === 'cohort') {
      existing.plans = groupById?.trainingPlans;
      existing.courses = groupById?.courses;
    }

    if (targetType === 'lab') {
      existing.courses = findLabById?.coreConceptItems?.map(item => ({
        courseId: item.itemId
      }));
      existing.plans = findLabById?.relevantLearningPaths?.map(item => ({
        planSourceId: item.itemId,
        planVersion: item?.itemVersion
      }));
    }

    return existing;
  }, [
    groupById,
    coursesByUserId,
    forceMultiplierById,
    plansByUserId,
    assessmentsByUserId,
    findLabById,
    targetType
  ]);
  // TODO -- check above dependencies -- one of the queries above might not be memoizing, causing unnecessary re-renders
  // try to not use "STATIC_" props, and just memoize the whole response object from the gql customUseHook if possible

  return {
    filteredCurriculumData
  };
};
