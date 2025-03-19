'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  BevelCard,
  Button,
  colors,
  Flex,
  Text,
  TextInput
} from '@digital-u/digital-ui';
import {
  useFindHostedCourseItem,
  useUpdateHostedCourseItem
} from '@/api/hosted-course';
import DragAndDropList from '../../../../../components/DragAndDropList/DragAndDropList';
import MainContentVStack from '@/components_new/layout/MainContentVStack/MainContentVStack';
import { useRouteParams } from '@/hooks/useRouteParams';
import { compareItemList } from '@/app/mp/[missionPartnerId]/training/components/utils';

const HostedCourseSurveyPage = () => {
  const router = useRouter();
  const {
    id: courseId,
    missionPartnerId,
    'course-survey-id': courseSurveyId
  } = useRouteParams();
  const searchParams = useSearchParams();
  const callbackPath = searchParams.get('callbackPath');

  const [error, setError] = useState('');
  const [survey, setSurvey] = useState({} as Record<string, string>);
  const [courseSurveyTitle, setCourseSurveyTitle] = useState('');
  const [courseSurveyQuestions, setCourseSurveyQuestions] = useState([]);
  const courseBase = `/mp/${missionPartnerId}/training/course/${courseId}`;

  const { hostedCourseItemData, fetchHostedCourseItem } =
    useFindHostedCourseItem(courseId, courseSurveyId);

  const { updateHostedCourseItem } = useUpdateHostedCourseItem();

  const published = hostedCourseItemData?.status === 'Published';

  const onUpdateHostedCourseItem = async item => {
    await updateHostedCourseItem({
      id: courseId,
      missionPartnerId,
      item
    });

    await fetchHostedCourseItem(courseId, courseSurveyId);
  };

  const handleOnTitleChange = event => {
    setCourseSurveyTitle(event.target.value);
  };

  const goBackToHostedCourse = () => {
    router.back();
  };

  const goToQuestion = question => {
    const query = new URLSearchParams({
      callbackPath,
      'survey-question-id': question.id,
      id: courseId,
      missionPartnerId
    }).toString();

    router.push(
      `${courseBase}/edit-content/course-survey/${courseSurveyId}/question/${question.id}?${query}`
    );
  };

  const handleOnReorder = async questions => {
    if (hostedCourseItemData?.item?.questions) {
      const newHostedCourseItem = JSON.parse(
        JSON.stringify(hostedCourseItemData?.item)
      );
      newHostedCourseItem.questions = questions;

      await onUpdateHostedCourseItem(newHostedCourseItem);
    }
  };

  const handleOnQuestionDelete = questionId => {
    const newQuestionsArray = hostedCourseItemData.item.questions.filter(
      item => item.id !== questionId
    );
    const updatedCourseItem = {
      ...hostedCourseItemData.item,
      questions: newQuestionsArray
    };

    onUpdateHostedCourseItem(updatedCourseItem);
  };

  const onSaveCourseSurvey = async () => {
    if (!courseSurveyTitle || courseSurveyTitle === survey.title) {
      setError('* New title is required.');
      return;
    }

    setError('');
    const item = { ...hostedCourseItemData.item, title: courseSurveyTitle };

    return onUpdateHostedCourseItem(item).then(() => goBackToHostedCourse());
  };

  useEffect(() => {
    if (hostedCourseItemData?.item) {
      setSurvey(hostedCourseItemData.item);
      setCourseSurveyTitle(hostedCourseItemData.item.title);
      setCourseSurveyQuestions(hostedCourseItemData.item.questions);
    }
  }, [hostedCourseItemData]);

  return (
    <MainContentVStack>
      <Flex direction="column" gap="2rem" style={{ width: '100%' }}>
        <Button kind="text" size="sm" onClick={() => router.push(callbackPath)}>
          <Text variant="dark" style={{ color: `${colors.galaxy[800]}` }}>
            &lt; BACK
          </Text>
        </Button>
        <Text size="h2" fontWeight="bold">
          Edit Course Survey
        </Text>
        <Flex gap="1rem" direction="column">
          <Text size="h4" fontWeight="bold">
            Details
          </Text>
          <BevelCard>
            <div style={{ textAlign: 'left' }}>
              <Text>Title</Text>
              <TextInput
                id="title"
                onChange={handleOnTitleChange}
                value={courseSurveyTitle}
                label=""
                hideLabel
                style={{ width: '50%' }}
                placeholder="Course Survey Title"
              />
              {error && <Text style={{ color: colors.red[800] }}>{error}</Text>}
            </div>
            <br />
            <Button
              kind="pill-primary"
              style={{ marginRight: 'auto' }}
              onClick={onSaveCourseSurvey}
            >
              save
            </Button>
          </BevelCard>
        </Flex>
        <Flex gap="1rem" direction="column">
          <Text size="h4" fontWeight="bold">
            Questions
          </Text>
          <BevelCard>
            <div>
              <Text>
                Questions (
                {survey.questions?.length ? survey.questions.length : 0} total)
              </Text>
              <Flex
                direction="column"
                gap=".5rem"
                style={{ margin: '.5rem 0 1rem' }}
              >
                <DragAndDropList
                  onReorder={items => {
                    if (
                      !compareItemList(
                        items,
                        hostedCourseItemData?.item?.questions
                      )
                    ) {
                      handleOnReorder(items);
                    }
                  }}
                  onRemoveItem={handleOnQuestionDelete}
                  onClickItem={goToQuestion}
                  items={courseSurveyQuestions}
                  deleteModalTitle="Delete Question"
                  disabled={published}
                />
              </Flex>
              <Button
                disabled={published}
                kind="text"
                onClick={() =>
                  goToQuestion({
                    id: 'new'
                  })
                }
              >
                add question +
              </Button>
            </div>
          </BevelCard>
        </Flex>
      </Flex>
    </MainContentVStack>
  );
};

export default HostedCourseSurveyPage;
