'use client';
import {
  BevelCard,
  Button,
  colors,
  Flex,
  Text,
  TextInput
} from '@digital-u/digital-ui';
import { Button as CerberusButton } from '@cerberus/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  useFindHostedCourseItem,
  useUpdateHostedCourseItem
} from '@/api/hosted-course';
import DragAndDropList from '../../../../../components/DragAndDropList/DragAndDropList';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { useRouteParams } from '@/hooks/useRouteParams';
import { compareItemList } from '@/app/mp/[missionPartnerId]/training/components/utils';
import { hstack } from 'styled-system/patterns';

const HostedQuizPage = () => {
  const router = useRouter();
  const { missionPartnerId, id: courseId, quizId } = useRouteParams();
  const searchParams = useSearchParams();
  const callbackPath = searchParams.get('callbackPath');

  const [error, setError] = useState('');
  const [quizTitle, setQuizTitle] = useState('');
  const [isValidQuiz, setIsValidQuiz] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const courseBase = `/mp/${missionPartnerId}/training/course/${courseId}`;

  const {
    fetchHostedCourseItem,
    hostedCourseItemData,
    hostedCourseItemLoading
  } = useFindHostedCourseItem(courseId, quizId);
  const { updateHostedCourseItem } = useUpdateHostedCourseItem();

  const onUpdateHostedCourseItem = async item => {
    await updateHostedCourseItem({
      id: courseId,
      missionPartnerId,
      item
    });

    await fetchHostedCourseItem(courseId, quizId);
  };
  const published = hostedCourseItemData?.status === 'Published';

  const handleOnTitleChange = event => {
    setQuizTitle(event.target.value);
  };

  const goToQuestion = question => {
    const queryParams = new URLSearchParams({
      callbackPath,
      quizId,
      missionPartnerId,
      courseId
    }).toString();

    router.push(
      `${courseBase}/edit-content/quiz/${quizId}/question/${question.id}?${queryParams}`
    );
  };

  const handleOnQuestionDelete = async questionId => {
    const newQuestionsArray = hostedCourseItemData?.item?.questions.filter(
      item => item.id !== questionId
    );

    setQuizQuestions(newQuestionsArray);
    await onUpdateHostedCourseItem({
      ...hostedCourseItemData?.item,
      questions: newQuestionsArray
    });
  };

  const onSaveQuiz = async () => {
    if (!isValidQuiz || quizTitle === hostedCourseItemData?.item?.title) {
      setError('* New title is required.');
      return;
    }

    setError('');

    const item = { ...hostedCourseItemData?.item, title: quizTitle };
    await onUpdateHostedCourseItem(item);
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

  useEffect(() => {
    if (hostedCourseItemData && !hostedCourseItemLoading) {
      setIsValidQuiz(true);
      setQuizTitle(hostedCourseItemData?.item?.title);
      setQuizQuestions(hostedCourseItemData?.item?.questions ?? []);
    }
  }, [hostedCourseItemData, hostedCourseItemLoading]);

  return (
    <MainContentVStack>
      <Flex
        direction="column"
        gap="2rem"
        style={{ padding: '2rem 3rem', width: '100%' }}
      >
        <Button kind="text" size="sm" onClick={() => router.push(courseBase)}>
          <Text variant="dark" style={{ color: `${colors.galaxy[800]}` }}>
            &lt; BACK
          </Text>
        </Button>
        <Text size="h2" fontWeight="bold">
          Edit Quiz
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
                value={quizTitle}
                label=""
                hideLabel
                style={{ width: '50%', background: colors.galaxy[0] }}
                placeholder="Course Quiz Title"
              />
              {error && <Text style={{ color: colors.red[800] }}>{error}</Text>}
            </div>
            <br />
            <div
              className={hstack({
                alignItems: 'flex-start',
                w: 'full'
              })}
            >
              <CerberusButton
                palette="action"
                shape="rounded"
                style={{ marginRight: 'auto' }}
                onClick={onSaveQuiz}
              >
                Save
              </CerberusButton>
            </div>
          </BevelCard>
        </Flex>
        <Flex gap="1rem" direction="column">
          <Text size="h4" fontWeight="bold">
            Questions
          </Text>
          <BevelCard>
            <div>
              <Text>
                Questions ({hostedCourseItemData?.item?.questions?.length}{' '}
                total)
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
                  items={quizQuestions}
                  deleteModalTitle="Delete Question"
                  disabled={published}
                />
              </Flex>
              <Button
                kind="text"
                onClick={() => goToQuestion({ id: 'new' })}
                disabled={published}
              >
                Add Question +
              </Button>
            </div>
          </BevelCard>
        </Flex>
      </Flex>
    </MainContentVStack>
  );
};

export default HostedQuizPage;
