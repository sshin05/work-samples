import { useEffect } from 'react';
import {
  type CompositeDecorator,
  convertFromHTML,
  ContentState,
  EditorState,
  convertToRaw
} from 'draft-js';
import draftToHTML from 'draftjs-to-html';

export const useControlAndUpdateLinkInput = (
  setEditorState: (value: React.SetStateAction<Partial<EditorState>>) => void,
  setInputLength: (value: React.SetStateAction<number>) => void,
  setUpdated: React.Dispatch<React.SetStateAction<boolean>>,
  editorState: Pick<EditorState, 'getCurrentContent'>,
  updated: boolean,
  decorator: CompositeDecorator,
  onChange?: (event: string) => void,
  placeholder?: string,
  value?: string
) => {
  return useEffect(() => {
    let initialEditorState = undefined;
    if (!updated) {
      const startingValue =
        (placeholder ? `<p>${placeholder}</p>` : value) ?? '';

      // This strips all anchor tags unless it's specified https or http
      const blocksFromHtml = convertFromHTML(startingValue);

      const contentState = ContentState.createFromBlockArray(
        blocksFromHtml.contentBlocks,
        blocksFromHtml.entityMap
      );
      const newEditorState = EditorState.createWithContent(
        contentState,
        decorator
      );

      initialEditorState = newEditorState;
      setUpdated(true);
    }

    setEditorState(initialEditorState ? initialEditorState : editorState);

    const contentState = editorState.getCurrentContent();

    const contentValuePlain = contentState.getPlainText();
    const contentValuePlainLength = contentValuePlain.length;

    setInputLength(contentValuePlainLength);

    if (onChange) onChange(draftToHTML(convertToRaw(contentState)));
  }, [
    setEditorState,
    setInputLength,
    setUpdated,
    decorator,
    editorState,
    onChange,
    placeholder,
    value,
    updated
  ]);
};
