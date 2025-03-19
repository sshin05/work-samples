import React, { useState, useRef, useCallback } from 'react';
import { Flex, Text, spacing } from '@digital-u/digital-ui';
import { Editor, EditorState, RichUtils } from 'draft-js';
import {
  decorator,
  emptyContentState,
  getLengthOfSelectedText,
  checkValidURL
} from './linkInputHelpers';
import {
  StyledEditorWrapper,
  StyledHelperText,
  StyledErrorText,
  StyledInputContainer
} from './linkInputStyles';
import LinkInputPopover from './LinkInputPopover';
import { useControlAndUpdateLinkInput } from '../../hooks/useControlAndUpdateLinkInput';

type CharacterCounter =
  | {
      hasCharacterCounter?: false;
      maxLength?: number;
    }
  | {
      hasCharacterCounter: boolean;
      maxLength: number;
    };

type LinkInputProps = {
  id: string;
  placeholder?: string;
  labelText?: string;
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  width?: string;
  onChange?: (event: string) => void;
  onBlur?: () => void;
  value?: string;
} & CharacterCounter;

const LinkInput = ({
  id,
  labelText,
  helperText,
  errorText,
  placeholder,
  maxLength,
  disabled = false,
  width = '100%',
  hasCharacterCounter = false,
  onChange,
  onBlur,
  value
}: LinkInputProps) => {
  const EditorRef = useRef(null);
  const [updated, setUpdated] = useState(false);
  const [inputLength, setInputLength] = useState(0);
  const [focus, setFocus] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    // This fixes nextjs + draftjs selector related crash https://github.com/facebookarchive/draft-js/issues/2332#issuecomment-780190353
    // normally use EditorState.createEmpty(decorator)
    EditorState.createWithContent(emptyContentState, decorator)
  );
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  useControlAndUpdateLinkInput(
    setEditorState,
    setInputLength,
    setUpdated,
    editorState,
    updated,
    decorator,
    onChange,
    placeholder,
    value
  );

  const handleBeforeInput = useCallback(() => {
    const currentContent = editorState.getCurrentContent();
    const currentContentLength = currentContent.getPlainText('').length;
    const selectedTextLength = getLengthOfSelectedText(editorState);

    if (currentContentLength - selectedTextLength > maxLength - 1)
      return 'handled';
  }, [editorState, maxLength]);

  const handlePastedText = useCallback(
    pastedText => {
      const currentContent = editorState.getCurrentContent();
      const currentContentLength = currentContent.getPlainText('').length;
      const selectedTextLength = getLengthOfSelectedText(editorState);

      if (
        currentContentLength + pastedText?.length - selectedTextLength >
        maxLength
      )
        return 'handled';
    },
    [editorState, maxLength]
  );

  const onShowLinkEditor = () => {
    const currentSelection = editorState.getSelection();
    if (currentSelection.isCollapsed()) {
      setLinkText('');
      setLinkUrl('');
      return;
    }
    const contentState = editorState.getCurrentContent();
    const startKey = currentSelection.getStartKey();
    const anchorKey = currentSelection.getAnchorKey();
    const startOffset = currentSelection.getStartOffset();
    const endOffset = currentSelection.getEndOffset();
    const currentContentBlock = contentState.getBlockForKey(anchorKey);
    const selectedText = currentContentBlock
      .getText()
      .slice(startOffset, endOffset);
    const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
    const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

    setLinkText(selectedText);
    if (linkKey) {
      const linkInstance = contentState.getEntity(linkKey);
      setLinkUrl(linkInstance.getData().url);
      return;
    }

    setLinkUrl('');
  };

  const onLinkEditorLinkUpdate = linkUrlValue => {
    const currentSelection = editorState.getSelection();
    if (linkUrlValue === false) {
      setEditorState(RichUtils.toggleLink(editorState, currentSelection, null));
      return;
    }

    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      { url: linkUrlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    });
    setEditorState(
      RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      )
    );
  };

  const handleURLUpdate = event => {
    const url = event.target.value;
    setLinkUrl(url);
    if (url === '') {
      onLinkEditorLinkUpdate(false);
      return;
    }
    if (!checkValidURL(url)) {
      onLinkEditorLinkUpdate('https://' + url);
      return;
    }
    onLinkEditorLinkUpdate(url);
  };

  return (
    <StyledInputContainer
      id={id}
      errorText={errorText}
      helperText={helperText}
      width={width}
    >
      {labelText && (
        <Flex
          justifyContent="space-between"
          style={{
            marginBottom: spacing[2]
          }}
        >
          <Text size="label" htmlFor={id} disabled={disabled}>
            {labelText}
          </Text>
          <Flex
            direction="column"
            alignItems="flex-end"
            style={{ minWidth: '70px' }}
          >
            {hasCharacterCounter && (
              <Text size="label" disabled={disabled}>
                {`${inputLength}/${maxLength}`}
              </Text>
            )}
          </Flex>
        </Flex>
      )}

      <StyledEditorWrapper
        id={`${id}-editor-wrapper`}
        errorText={errorText}
        disabled={disabled}
        focus={focus}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
          if (onBlur) onBlur();
        }}
      >
        <Editor
          handleBeforeInput={handleBeforeInput}
          handlePastedText={handlePastedText}
          handleReturn={() => 'handled'}
          editorState={editorState}
          onChange={setEditorState}
          stripPastedStyles
          ref={EditorRef}
        />
      </StyledEditorWrapper>
      <LinkInputPopover
        EditorRef={EditorRef}
        handleURLUpdate={handleURLUpdate}
        id={id}
        linkText={linkText}
        linkUrl={linkUrl}
        onShowLinkEditor={onShowLinkEditor}
        selectorState={editorState.getSelection()}
      />

      {errorText && <StyledErrorText>{errorText}</StyledErrorText>}
      {helperText && !errorText && (
        <StyledHelperText disabled={disabled}>{helperText}</StyledHelperText>
      )}
    </StyledInputContainer>
  );
};

export default LinkInput;
