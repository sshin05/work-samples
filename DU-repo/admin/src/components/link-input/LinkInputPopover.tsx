import { useState, useReducer, useMemo, useRef } from 'react';
import {
  Flex,
  Popover,
  Text,
  spacing,
  colors,
  TextInput
} from '@digital-u/digital-ui';
import {
  StyledPopoverContainer,
  StyledPopoverContentContainer,
  StyledPopoverIconContainer
} from './linkInputStyles';
import { Link as LinkIcon } from '@carbon/icons-react';
import { getVisibleSelectionRect } from 'draft-js';

const POPOVER_CENTER_OFFSET = 215;
const POPOVER_END_OFFSET = 165;
const ACTIVATE_POPOVER_END_THRESHHOLD = 25;

const calculatePopoverOffset = (
  _state: number,
  action: {
    editorWidth: number;
    selectorLeftPosition: number;
    editorLeftPosition: number;
  }
) => {
  const { editorWidth, selectorLeftPosition, editorLeftPosition } = action;

  return (
    editorWidth -
    selectorLeftPosition +
    editorLeftPosition -
    POPOVER_CENTER_OFFSET
  );
};

const LinkInputPopover = ({
  EditorRef,
  linkText,
  id,
  linkUrl,
  handleURLUpdate,
  onShowLinkEditor,
  selectorState
}) => {
  const [showLinkEditor, setShowLinkEditor] = useState(false);
  const [popoverOffset, setPopoverOffset] = useReducer(
    calculatePopoverOffset,
    0
  );
  const previousLeftSelectorValue = useRef(0);

  const leftPosition = useMemo(() => {
    if (typeof window === 'undefined') return undefined;
    return getVisibleSelectionRect(window)?.left;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- there was maybe a reason for this; and it is memoized, but this component should go away after full dashboard refactor.
  }, [selectorState]);

  const getLeftSelectorPosition = useMemo(() => {
    if (leftPosition === undefined) return previousLeftSelectorValue.current;

    previousLeftSelectorValue.current = leftPosition;
    return leftPosition;
  }, [leftPosition]);

  const popoverOffsetEnd = popoverOffset * -1 - POPOVER_END_OFFSET;

  const popoverOffsetCloseToEnd =
    popoverOffset < ACTIVATE_POPOVER_END_THRESHHOLD;

  const inputWidth = document.querySelector(`#${id}`)?.scrollWidth;

  return (
    <Flex direction="row-reverse">
      <StyledPopoverContainer>
        <Popover
          popoverContent={
            <StyledPopoverContentContainer direction="column" gap={spacing[6]}>
              <TextInput
                value={linkText}
                id={`${id}-link-text`}
                label={<Text size="label">Link Text</Text>}
                disabled
              />
              <TextInput
                value={linkUrl}
                onChange={handleURLUpdate}
                id={`${id}-link-href`}
                label={<Text size="label">URL*</Text>}
              />
            </StyledPopoverContentContainer>
          }
          hideOnInteractOutside
          onClose={() => {
            setShowLinkEditor(false);
          }}
          padding="small"
          shift={popoverOffsetCloseToEnd ? popoverOffsetEnd : -9999}
          gutter={20}
        >
          <StyledPopoverIconContainer
            direction="row-reverse"
            popoverOffset={popoverOffset}
            popoverOffsetCloseToEnd={popoverOffsetCloseToEnd}
          >
            <LinkIcon
              width={20}
              height={20}
              color={showLinkEditor ? colors.purple[800] : colors.black}
              onClick={() => {
                if (!showLinkEditor) {
                  setPopoverOffset({
                    editorWidth: inputWidth,
                    selectorLeftPosition: getLeftSelectorPosition,
                    editorLeftPosition: EditorRef.current?.editor.offsetLeft
                  });
                  onShowLinkEditor();
                  setShowLinkEditor(true);
                }
              }}
              style={{ pointerEvents: 'all' }}
            />
          </StyledPopoverIconContainer>
        </Popover>
      </StyledPopoverContainer>
    </Flex>
  );
};

export default LinkInputPopover;
