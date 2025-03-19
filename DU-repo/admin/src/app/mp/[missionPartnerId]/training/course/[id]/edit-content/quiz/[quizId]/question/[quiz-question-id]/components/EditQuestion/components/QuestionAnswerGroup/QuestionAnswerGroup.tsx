import { Button, colors, Flex, Text, TextInput } from '@digital-u/digital-ui';
import React, { useEffect, useState } from 'react';
import { Add } from '@cerberus/icons';

const getMultipleCorrectBox = isCorrect => {
  return isCorrect ? (
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM17.99 9l-1.41-1.42-6.59 6.59-2.58-2.57-1.42 1.41 4 3.99z" />
  ) : (
    <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
  );
};

const getSingleCorrectCircle = isCorrect => (
  <>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
    {isCorrect && <circle cx="12" cy="12" r="5" />}
  </>
);

interface QuestionAnswerGroupTypes {
  disabled: boolean;
  onChange: (choices: { choice: string; isCorrect: boolean }[]) => void;
  defaultChoices?: { choice: string; isCorrect: boolean }[];
  multipleCorrect?: boolean;
  showAdd?: boolean;
}

export const QuestionAnswerGroup = ({
  disabled,
  onChange,
  defaultChoices = [],
  multipleCorrect,
  showAdd
}: QuestionAnswerGroupTypes) => {
  const [choices, setChoices] = useState([...defaultChoices]);

  const updateCurrentChoice = choice =>
    multipleCorrect
      ? { ...choice, isCorrect: !choice.isCorrect }
      : { ...choice, isCorrect: true };

  const updateOtherChoice = choice =>
    multipleCorrect ? choice : { ...choice, isCorrect: false };

  const changeChoice = (index, choiceToUpdate) => {
    setChoices(previous =>
      previous.map((choice, choiceIndex) =>
        choiceIndex === index ? { ...choice, choice: choiceToUpdate } : choice
      )
    );
  };

  const updateChoices = index => {
    if (disabled) return;

    const mapChoice = (choice, choiceIndex) => {
      const isCurrentChoice = choiceIndex === index;
      return isCurrentChoice
        ? updateCurrentChoice(choice)
        : updateOtherChoice(choice);
    };

    setChoices(previous => previous.map(mapChoice));
  };

  const handleOnChoiceChange = index => event => {
    const choiceToUpdate = event.target.value;
    changeChoice(index, choiceToUpdate);
  };

  const handleOnCorrectChange = index => () => {
    updateChoices(index);
  };

  const handleAddChoice = () => {
    setChoices([
      ...choices,
      { choice: 'Additional answer here', isCorrect: false }
    ]);
  };

  useEffect(() => {
    onChange(choices);
  }, [choices, onChange]);

  return (
    <div>
      <Text size="h6">Answer Choices</Text>
      <Flex
        style={{
          flexDirection: 'column',
          gap: '1rem',
          marginTop: '.25rem'
        }}
      >
        {choices.map(({ choice, isCorrect }, index) => (
          <Flex key={index} style={{ gap: '1.5rem' }}>
            <div style={{ flex: '65%' }}>
              <TextInput
                value={choice}
                onChange={handleOnChoiceChange(index)}
                id="ChoiceInput"
                label=""
                hideLabel
              />
            </div>
            <div
              role="button"
              aria-label={`${index} star`}
              style={{
                flex: '35%',
                display: 'flex',
                alignItems: 'center',
                gap: '.75rem',
                cursor: disabled ? 'default' : 'pointer'
              }}
              onClick={handleOnCorrectChange(index)}
            >
              <svg
                height="30px"
                width="30px"
                viewBox="0 0 24 24"
                fill={(disabled ? colors.gray : colors.black) as string}
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                {multipleCorrect
                  ? getMultipleCorrectBox(isCorrect)
                  : getSingleCorrectCircle(isCorrect)}
              </svg>
              <Text size="h6">Correct Answer</Text>
            </div>
          </Flex>
        ))}
        {showAdd && (
          <Button
            kind="text"
            leftIcon={<Add />}
            onClick={handleAddChoice}
            disabled={disabled}
          >
            Add Choice
          </Button>
        )}
      </Flex>
    </div>
  );
};
