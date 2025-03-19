'use client';
import React from 'react';
import {
  useFindHostedCourseItem,
  useUpdateHostedCourseItem
} from '@/api/hosted-course';
import { EditQuestion } from './components/EditQuestion';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { useRouteParams } from '@/hooks/useRouteParams';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';

const QuizQuestionId = () => {
  const {
    id: courseId,
    missionPartnerId,
    quizId,
    'quiz-question-id': quizQuestionId
  } = useRouteParams();

  // Questions are attached to the quiz
  // A Quiz is item attached to the course
  const {
    fetchHostedCourseItem,
    hostedCourseItemData,
    hostedCourseItemLoading
  } = useFindHostedCourseItem(courseId, quizId);
  const { updateHostedCourseItem } = useUpdateHostedCourseItem();

  let quizQuestionIndex;

  // TODO: Memoize or otherwise simplify this
  if (hostedCourseItemData?.item?.questions) {
    for (const [
      questionIndex,
      question
    ] of hostedCourseItemData.item.questions.entries()) {
      if (question.id === quizQuestionId) {
        quizQuestionIndex = questionIndex;
      }
    }
  }

  // todo: unnecessary?  @tidwell, maybe this is a mis-type and something was meant to be accomplished here?
  if (quizQuestionIndex === 'new') {
    quizQuestionIndex = 'new';
  }

  const handleOnSave = updatedQuestions => {
    updateHostedCourseItem({
      id: courseId,
      missionPartnerId,
      item: { ...hostedCourseItemData.item, questions: updatedQuestions }
    }).then(() => fetchHostedCourseItem(courseId, quizId));
  };

  const quiz = hostedCourseItemData?.item ? hostedCourseItemData.item : null;

  return (
    <MainContentVStack>
      {!hostedCourseItemLoading && (
        <EditQuestion
          questionId={quizQuestionId}
          questionIndex={quizQuestionIndex}
          goBackRoute={getRouteUrl(
            routeGenerators.EditCourseQuizContent({
              missionPartnerId,
              courseId,
              quizId
            })
          )}
          goBackText="BACK"
          questions={quiz?.questions}
          onSave={handleOnSave}
          disabled={quizQuestionId !== 'new'}
        />
      )}
    </MainContentVStack>
  );
};

export default QuizQuestionId;
