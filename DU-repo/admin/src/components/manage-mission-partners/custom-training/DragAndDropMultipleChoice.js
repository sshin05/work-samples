import { useRef, useState } from 'react';
import {
  Button,
  Checkbox,
  DuiTextInput,
  Flex,
  spacing,
  colors
} from '@digital-u/digital-ui';
import { DragVertical, TrashCan } from '@carbon/icons-react';

// TODO: Remove undefined defaults on TSX conversion
const DragAndDropMultipleChoice = ({
  fields,
  register,
  swap,
  remove,
  onMarkCorrect = undefined,
  disabled = undefined,
  allowMultipleCorrect = false
}) => {
  const dragItem = useRef();
  const dragOverItem = useRef();

  const [draggable, setDraggable] = useState(null);
  const [controlsVisible, setControlsVisible] = useState(null);

  const showDraggable = i => controlsVisible === i && !disabled;

  const handleDragStart = (event, position) => {
    if (disabled) return;
    dragItem.current = position;
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnter = (_event, position) => {
    if (disabled) return;
    dragOverItem.current = position;
  };

  const handleDrop = () => {
    if (disabled) return;
    if (dragItem.current !== dragOverItem.current) {
      swap(dragItem.current, dragOverItem.current);
      setControlsVisible(dragOverItem.current);
    }

    dragItem.current = null;
    dragOverItem.current = null;
  };

  if (!fields) return null;

  return (
    <Flex direction="column" gap={spacing[1]}>
      {fields.map((field, index) => {
        const isHovered = controlsVisible === index;

        const isSurvey =
          onMarkCorrect === undefined && allowMultipleCorrect === false;
        const examOrQuizFieldName = allowMultipleCorrect
          ? `multipleChoiceAnswers[${index}].choice`
          : `singleChoiceAnswers[${index}].choice`;

        const fieldName = isSurvey
          ? `multipleChoiceAnswers[${index}].answer`
          : examOrQuizFieldName;

        const defaultAnswer = isSurvey ? field.answer : field.choice;

        return (
          <Flex
            key={field.id}
            style={{
              padding: `${spacing[2]} ${spacing[3]}`,
              background: 'white',
              transform: isHovered && !disabled ? `scale(0.99)` : ``,
              transition: 'all 0.1s linear',
              boxShadow:
                isHovered && !disabled ? `0px 2px 16px rgba(0, 0, 0, 0.1)` : ``
            }}
            direction="row"
            alignItems="center"
            gap={spacing[3]}
            draggable={draggable !== null}
            onDragStart={event => handleDragStart(event, index)}
            onDragEnter={event => handleDragEnter(event, index)}
            onDragEnd={handleDrop}
            onDragOver={event => event.preventDefault()}
            onMouseEnter={() => setControlsVisible(index)}
            onFocus={() => setControlsVisible(index)}
            onMouseLeave={() => setControlsVisible(null)}
            onBlur={() => setControlsVisible(null)}
          >
            {!disabled && isHovered && (
              <DragVertical
                onMouseEnter={() => {
                  if (!disabled) setDraggable(index);
                }}
                onMouseLeave={() => {
                  if (!disabled) setDraggable(null);
                }}
                style={{ cursor: showDraggable(index) ? 'pointer' : 'default' }}
              />
            )}
            <Flex alignItems="center" flex="1">
              <DuiTextInput
                id={`answer-${index}`}
                name={fieldName}
                defaultValue={defaultAnswer}
                register={register}
                placeholder="Answer goes here"
              />
              {!isSurvey &&
                (allowMultipleCorrect ? (
                  <Checkbox
                    label="Correct Answer"
                    id={`correct-${index}`}
                    name={`multipleChoiceAnswers[${index}].isCorrect`}
                    onChange={() => onMarkCorrect(index)}
                    defaultChecked={field.isCorrect}
                    disabled={disabled}
                  />
                ) : (
                  <Flex flex="1" gap={spacing[2]}>
                    <input
                      type="radio"
                      id={`correct-${index}`}
                      name="singleChoiceAnswers.isCorrect"
                      value={field.isCorrect}
                      disabled={disabled}
                      checked={field.isCorrect}
                      onChange={() => onMarkCorrect(index)}
                    />
                    <label htmlFor={`correct-${index}`}>Correct Answer</label>
                  </Flex>
                ))}
            </Flex>
            <Button
              kind="text"
              size="small"
              rightIcon={<TrashCan />}
              onClick={() => remove(index)}
              disabled={disabled}
              style={{
                justifySelf: 'flex-end',
                color: colors.red[800],
                visibility: isHovered ? 'visible' : 'hidden'
              }}
            >
              Remove
            </Button>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default DragAndDropMultipleChoice;
