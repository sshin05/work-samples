import type { ReactNode } from 'react';
import {
  type ContentState,
  type ContentBlock,
  type EditorState,
  CompositeDecorator,
  convertFromRaw
} from 'draft-js';
import { StyledLinkInputLink } from './linkInputStyles';

export const Link = ({
  entityKey,
  contentState,
  children
}: {
  entityKey: string;
  contentState: Pick<ContentState, 'getEntity'>;
  children: ReactNode;
}) => {
  const { url } = contentState.getEntity(entityKey).getData();
  return (
    <StyledLinkInputLink href={url} target="_blank" rel="noreferrer">
      {children}
    </StyledLinkInputLink>
  );
};

export const findLinkEntities = (
  contentBlock: Pick<ContentBlock, 'findEntityRanges'>,
  callback: (start: number, end: number) => void,
  contentState: Pick<ContentState, 'getEntity'>
) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'LINK'
    );
  }, callback);
};

export const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link
  }
]);

// This fixes nextjs + draftjs selector related crash https://github.com/facebookarchive/draft-js/issues/2332#issuecomment-780190353
export const emptyContentState = convertFromRaw({
  entityMap: {},
  blocks: [
    // @ts-expect-error Can create from raw with this info https://github.com/facebookarchive/draft-js/issues/2332#issuecomment-780190353
    {
      text: '',
      key: 'foo',
      type: 'unstyled',
      entityRanges: []
    }
  ]
});

export const getLengthOfSelectedText = (
  editorState: Pick<EditorState, 'getSelection' | 'getCurrentContent'>
) => {
  const currentSelection = editorState.getSelection();

  if (currentSelection.isCollapsed()) return 0;

  const currentContent = editorState.getCurrentContent();
  const startKey = currentSelection.getStartKey();
  if (startKey === currentSelection.getEndKey())
    return currentSelection.getEndOffset() - currentSelection.getStartOffset();

  const startBlockTextLength = currentContent
    .getBlockForKey(startKey)
    .getLength();
  const startSelectedTextLength =
    startBlockTextLength - currentSelection.getStartOffset();

  let currentKey = startKey;
  let length = 0;

  while (
    currentKey &&
    currentKey !== currentContent.getKeyAfter(currentSelection.getEndKey())
  ) {
    if (currentKey === startKey) {
      length += startSelectedTextLength + 1;
    }

    length += currentContent.getBlockForKey(currentKey).getLength() + 1;

    currentKey = currentContent.getKeyAfter(currentKey);
  }

  return length;
};

export const checkValidURL = (url: string): boolean => {
  return url.slice(0, 8) === 'https://';
};
