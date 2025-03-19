import {
  Flex,
  Button,
  Text,
  TextArea,
  colors,
  BevelCard,
  spacing
} from '@digital-u/digital-ui';
import { Button as CerberusButton } from '@cerberus/react';
import React, { useEffect, useState } from 'react';
import QUESTION_TYPES from '@/enums/question-types';
import { QuestionAnswerGroup } from './components/QuestionAnswerGroup';
import type { EditQuestionProps } from './EditQuestion.types';
import { useRouter, useParams } from 'next/navigation';
import { useRouteParams } from '@/hooks/useRouteParams';
import { useFindHostedCourseItem } from '@/api/hosted-course/useFindHostedCourseItem';
import { CaretSortDown } from '@carbon/icons-react';
import { AdminUiSelect } from '@/components_new/deprecated/AdminUiSelect';
import { css } from '@cerberus/styled-system/css';
import { hstack } from '@cerberus/styled-system/patterns';

const isExistingIndex = (indexToCheck, questionLength) =>
  !Number.isNaN(indexToCheck) && indexToCheck < questionLength;

export const EditQuestion = ({
  questionId,
  questionIndex,
  goBackRoute,
  onSave,
  disabled = false,
  questions = [],
  goBackText = '< Go Back'
}: EditQuestionProps) => {
  // IF THIS PAGE IS GOING TO BE USED IN THE FUTURE, PLEASE FIX THE router.push()
  const router = useRouter();
  const { missionPartnerId, contentId } = useParams();
  const { id: courseId, quizId } = useRouteParams();
  const { hostedCourseItemData } = useFindHostedCourseItem(courseId, quizId);
  const [error, setError] = useState('');
  const [selectedType, setSelectedType] = useState(QUESTION_TYPES[0]);
  const [title, setTitle] = useState('New Question Here...');
  const [choices, setChoices] = useState([
    { choice: 'This is the first answer', isCorrect: true },
    { choice: 'This is the second answer', isCorrect: false }
  ]);
  const published = hostedCourseItemData?.status === 'Published';

  useEffect(() => {
    if (isExistingIndex(questionIndex, questions?.length)) {
      const question = questions[questionIndex];
      const questionType = QUESTION_TYPES.find(
        type => type.type === question.type
      );

      // @ts-expect-error backend currently has type `any` on question
      setTitle(question.title);
      setSelectedType(questionType);
      if (questionType !== QUESTION_TYPES[0]) {
        // @ts-expect-error backend currently has type `any` on question
        setChoices(question.choices);
      }
    }
  }, [questions, questionIndex]);

  const handleOnSave = () => {
    if (title.length === 0 || title === 'New Question Here...') {
      setError('* The question is required.');
      return;
    }

    setError('');
    const updatedQuestion = {
      id: questionId,
      title,
      type: selectedType.type,
      choices
    };

    if (selectedType !== QUESTION_TYPES[0]) {
      updatedQuestion.choices = choices;
    }

    let newQuestions;

    if (isExistingIndex(questionIndex, questions?.length)) {
      newQuestions = questions.map((question, index) =>
        index === questionIndex ? updatedQuestion : question
      );
    } else {
      newQuestions = [...questions, updatedQuestion];
    }

    onSave(newQuestions);
    goBackToParent();
  };

  const handleOnTitleChange = event => {
    setTitle(event.target.value);
  };

  const goBackToParent = () => {
    router.push(
      `${goBackRoute}?contentId=${contentId}&missionPartnerId=${missionPartnerId}&courseId=${courseId}`
    );
  };

  return (
    <Flex
      style={{
        flexDirection: 'column',
        gap: '2rem',
        padding: '2rem 3rem',
        width: '100%'
      }}
    >
      <Button
        type="button"
        kind="text"
        buttonSize="small"
        onClick={goBackToParent}
      >
        <Text variant="dark" style={{ color: `${colors.galaxy[800]}` }}>
          &lt; {goBackText}
        </Text>
      </Button>
      <Text size="h2">Edit Question</Text>
      <BevelCard style={{ background: 'white' }}>
        <Flex
          direction="column"
          gap="2rem"
          style={{ width: '50%', minWidth: '600px' }}
        >
          <Flex direction="column" gap="8px">
            <Text size="p">Question Type</Text>

            {disabled ? (
              <Text
                style={{
                  background: colors.galaxy[0],
                  maxWidth: '220px',
                  alignItems: 'center',
                  display: 'flex',
                  color: '#918EA7',
                  justifyContent: 'space-between'
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    padding: '10px',
                    fontSize: '16px',
                    lineHeight: '28px'
                  }}
                >
                  {selectedType.type}
                </span>
                <CaretSortDown />
              </Text>
            ) : (
              <AdminUiSelect
                className={css({ width: '400px' })}
                id="question-type"
                disabled={published || disabled}
                options={QUESTION_TYPES.map(option => ({
                  label: option.type,
                  value: option.type
                }))}
                onChange={e => {
                  const questionType = QUESTION_TYPES.find(
                    type => type.type === e.target.value
                  );
                  setSelectedType(questionType);
                }}
              />
            )}
          </Flex>
          <Flex
            direction="column"
            gap={spacing[4]}
            style={{ maxWidth: '500px' }}
          >
            <Text size="p">Question</Text>
            <TextArea
              value={title}
              onChange={handleOnTitleChange}
              id={title}
              label=""
              rows={3}
            />
            {error && <Text style={{ color: colors.red[800] }}>{error}</Text>}
          </Flex>
          {selectedType !== QUESTION_TYPES[0] && (
            <QuestionAnswerGroup
              defaultChoices={choices}
              onChange={setChoices}
              multipleCorrect={selectedType === QUESTION_TYPES[2]}
              showAdd
              disabled={published}
            />
          )}
          <div
            className={hstack({
              alignItems: 'flex-start',
              w: 'full'
            })}
          >
            <CerberusButton
              palette="action"
              shape="rounded"
              onClick={handleOnSave}
              disabled={published}
            >
              Save
            </CerberusButton>
          </div>
        </Flex>
      </BevelCard>
    </Flex>
  );
};
