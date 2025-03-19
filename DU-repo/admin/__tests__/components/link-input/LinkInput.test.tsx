import React from 'react';
import LinkInput from '../../../src/components/link-input/LinkInput';
import { render, screen, fireEvent, userEvent } from '@@/test-utils';

jest.mock('@digital-u/digital-ui', () => ({
  ...jest.requireActual('@digital-u/digital-ui'),
  Text: ({ children }) => <span>{children}</span>,
  Flex: ({ children }) => <div>{children}</div>
}));

const mockCheckValidURL = jest.fn(_url => true);
const mockGetLengthOfSelectedText = jest.fn(_editorState => 1);

jest.mock('../../../src/components/link-input/linkInputHelpers', () => ({
  decorator: jest.fn(),
  emptyContentState: {},
  getLengthOfSelectedText: editorState =>
    mockGetLengthOfSelectedText(editorState),
  checkValidURL: url => mockCheckValidURL(url)
}));

jest.mock('../../../src/components/link-input/linkInputStyles', () => ({
  StyledEditorWrapper: ({ children, onFocus, onBlur }) => (
    <>
      <div>{children}</div>
      <button onClick={onFocus}>WrapperFocus</button>
      <button onClick={onBlur}>WrapperBlur</button>
    </>
  ),
  StyledHelperText: () => <span>HelperText</span>,
  StyledErrorText: () => <span>ErrorText</span>,
  StyledInputContainer: ({ children, id }) => <div id={id}>{children}</div>
}));

jest.mock(
  '../../../src/components/link-input/LinkInputPopover',
  () =>
    ({ onShowLinkEditor, handleURLUpdate, linkUrl }) => (
      <>
        <button onClick={onShowLinkEditor}>ShowPopover</button>
        <input onChange={handleURLUpdate} value={linkUrl} />
      </>
    )
);

jest.mock('@/hooks/useControlAndUpdateLinkInput', () => ({
  useControlAndUpdateLinkInput: jest.fn()
}));

const mockCreateWithContent = jest.fn(
  (_emptyContentState, _decorator) => mockEditorState
);

const mockGetCurrentContent = jest.fn(() => ({
  getPlainText: mockGetPlainText,
  createEntity: (type, mutability, data) =>
    mockCreateEntity(type, mutability, data),
  getBlockForKey: key => mockGetBlockForKey(key),
  getEntity: linkKey => mockGetEntity(linkKey)
}));
const mockGetEntity = jest.fn(_linkKey => mockInstance);
const mockGetData = jest.fn(() => ({
  url: 'url'
}));
const mockInstance = {
  getData: mockGetData
};
const mockGetBlockForKey = jest.fn(_key => mockCurrentContentBlock);
const mockGetEntityAt = jest.fn(_startOffset => null);
const mockGetText = jest.fn(() => 'plaintext');
const mockCurrentContentBlock = {
  getText: mockGetText,
  getEntityAt: mockGetEntityAt
};
const mockGetEndOffset = jest.fn(() => 2);
const mockGetStartOffset = jest.fn(() => 1);
const mockGetAnchorKey = jest.fn(() => 'anchorKey');
const mockGetStartKey = jest.fn(() => 'startKey');
const mockGetPlainText = jest.fn(() => 'plainText');
const mockIsCollapsed = jest.fn(() => false);
const mockGetSelection = jest.fn(() => ({
  isCollapsed: mockIsCollapsed,
  getStartKey: mockGetStartKey,
  getAnchorKey: mockGetAnchorKey,
  getStartOffset: mockGetStartOffset,
  getEndOffset: mockGetEndOffset
}));
const mockCreateEntity = jest.fn(
  (_type, _mutability, _data) => mockContentStateWithEntity
);
const mockGetLastCreatedEntityKey = jest.fn(() => 'lastCreatedEntityKey');
const mockContentStateWithEntity = {
  getLastCreatedEntityKey: mockGetLastCreatedEntityKey
};

const mockEditorState = {
  getCurrentContent: mockGetCurrentContent,
  getSelection: mockGetSelection
};

const mockToggleLink = jest.fn(
  (_editorState, _currentSlection, _key) => mockEditorState
);

const mockSet = jest.fn((_editorState, _put) => mockEditorState);

jest.mock('draft-js', () => ({
  EditorState: {
    createWithContent: (emptyContentState, decorator) =>
      mockCreateWithContent(emptyContentState, decorator),
    set: (editorState, put) => mockSet(editorState, put)
  },
  Editor: ({ handleBeforeInput, handlePastedText, handleReturn }) => {
    return (
      <>
        <span>Editor</span>
        <button onClick={handleBeforeInput}>HandleBeforeInput</button>
        <button onClick={() => handlePastedText('pastedText')}>
          HandlePastedText
        </button>
        <button onClick={handleReturn}>HandleReturn</button>
      </>
    );
  },
  RichUtils: {
    toggleLink: (editorState, currentSelection, key) =>
      mockToggleLink(editorState, currentSelection, key)
  }
}));

describe('LinkInput', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display LinkInput without crashing', () => {
    render(<LinkInput id="link-input-test" />);

    expect(screen.getByText('Editor')).toBeInTheDocument();
  });

  it('should call handleBeforeInput properly', () => {
    render(<LinkInput id="link-input-test" />);

    fireEvent.click(screen.getByText('HandleBeforeInput'));

    expect(screen.getByText('Editor')).toBeInTheDocument();
    expect(mockGetCurrentContent).toHaveBeenCalled();
    expect(mockGetPlainText).toHaveBeenCalledWith('');
    expect(mockGetLengthOfSelectedText).toHaveBeenCalledWith(
      expect.any(Object)
    );
  });

  it('should call handleBeforeInput properly and return handled', () => {
    mockGetLengthOfSelectedText.mockImplementationOnce(_args => 0);
    mockGetPlainText.mockImplementationOnce(() => 'yesyesyesyes');

    render(<LinkInput id="link-input-test" maxLength={10} />);

    fireEvent.click(screen.getByText('HandleBeforeInput'));

    expect(screen.getByText('Editor')).toBeInTheDocument();
    expect(mockGetCurrentContent).toHaveBeenCalled();
    expect(mockGetPlainText).toHaveBeenCalledWith('');
    expect(mockGetLengthOfSelectedText).toHaveBeenCalledWith(
      expect.any(Object)
    );
  });

  it('should call handlePastedText properly', () => {
    render(<LinkInput id="link-input-test" />);

    fireEvent.click(screen.getByText('HandlePastedText'));

    expect(screen.getByText('Editor')).toBeInTheDocument();
    expect(mockGetCurrentContent).toHaveBeenCalled();
    expect(mockGetPlainText).toHaveBeenCalledWith('');
    expect(mockGetLengthOfSelectedText).toHaveBeenCalledWith(
      expect.any(Object)
    );
  });

  it('should call handlePastedText properly and return handled', () => {
    mockGetLengthOfSelectedText.mockImplementationOnce(_args => 0);
    mockGetPlainText.mockImplementationOnce(() => 'yesyesyesyesyesyes');

    render(<LinkInput id="link-input-test" maxLength={10} />);

    fireEvent.click(screen.getByText('HandlePastedText'));

    expect(screen.getByText('Editor')).toBeInTheDocument();
    expect(mockGetCurrentContent).toHaveBeenCalled();
    expect(mockGetPlainText).toHaveBeenCalledWith('');
    expect(mockGetLengthOfSelectedText).toHaveBeenCalledWith(
      expect.any(Object)
    );
  });

  it('should call return handler properly', () => {
    render(<LinkInput id="link-input-test" />);

    fireEvent.click(screen.getByText('HandleReturn'));

    expect(screen.getByText('Editor')).toBeInTheDocument();
  });

  it('should call handleURLUpdate with correct url', () => {
    const { container } = render(<LinkInput id="link-input-test" />);

    userEvent.type(container.getElementsByTagName('input')[0], 'https://gamer');

    expect(mockGetSelection).toHaveBeenCalled();
    expect(mockGetCurrentContent).toHaveBeenCalled();
    expect(mockCreateEntity).toHaveBeenLastCalledWith('LINK', 'MUTABLE', {
      url: 'https://gamer'
    });
    expect(mockGetLastCreatedEntityKey).toHaveBeenCalled();
    expect(mockSet).toHaveBeenLastCalledWith(expect.any(Object), {
      currentContent: expect.any(Object)
    });
    expect(mockToggleLink).toHaveBeenLastCalledWith(
      expect.any(Object),
      expect.any(Object),
      'lastCreatedEntityKey'
    );
  });

  it('should call handleURLUpdate with incorrect url', () => {
    mockCheckValidURL.mockImplementation(_url => false);
    const { container } = render(<LinkInput id="link-input-test" />);

    userEvent.type(container.getElementsByTagName('input')[0], 'a');

    expect(mockGetSelection).toHaveBeenCalled();
    expect(mockGetCurrentContent).toHaveBeenCalled();
    expect(mockCreateEntity).toHaveBeenLastCalledWith('LINK', 'MUTABLE', {
      url: 'https://a'
    });
    expect(mockGetLastCreatedEntityKey).toHaveBeenCalled();
    expect(mockSet).toHaveBeenLastCalledWith(expect.any(Object), {
      currentContent: expect.any(Object)
    });
    expect(mockToggleLink).toHaveBeenLastCalledWith(
      expect.any(Object),
      expect.any(Object),
      'lastCreatedEntityKey'
    );
  });

  it('should call handleURLUpdate with when url is empty and delete url if any', () => {
    mockCheckValidURL.mockImplementation(_url => false);
    const { container } = render(<LinkInput id="link-input-test" />);

    userEvent.type(container.getElementsByTagName('input')[0], 'a{Backspace}');

    expect(mockGetSelection).toHaveBeenCalled();
    expect(mockToggleLink).toHaveBeenLastCalledWith(
      expect.any(Object),
      expect.any(Object),
      null
    );
  });

  it('should call onShowLink with something selected', () => {
    render(<LinkInput id="link-input-test" />);

    fireEvent.click(screen.getByText('ShowPopover'));

    expect(mockIsCollapsed).toHaveBeenCalled();
    expect(mockGetCurrentContent).toHaveBeenCalled();
    expect(mockGetStartKey).toHaveBeenCalled();
    expect(mockGetAnchorKey).toHaveBeenCalled();
    expect(mockGetStartOffset).toHaveBeenCalled();
    expect(mockGetEndOffset).toHaveBeenCalled();
    expect(mockGetBlockForKey).toHaveBeenCalledWith('anchorKey');
    expect(mockGetText).toHaveBeenCalled();
    expect(mockGetBlockForKey).toHaveBeenCalledWith('startKey');
    expect(mockGetEntityAt).toHaveBeenCalledWith(1);
    expect(mockGetEntity).not.toHaveBeenCalled();
    expect(mockGetData).not.toHaveBeenCalled();
  });

  it('should call onShowLink with something selected and set with the new linkInstance', () => {
    mockGetEntityAt.mockImplementationOnce(() => 'linkKey');

    render(<LinkInput id="link-input-test" />);

    fireEvent.click(screen.getByText('ShowPopover'));

    expect(mockIsCollapsed).toHaveBeenCalled();
    expect(mockGetCurrentContent).toHaveBeenCalled();
    expect(mockGetStartKey).toHaveBeenCalled();
    expect(mockGetAnchorKey).toHaveBeenCalled();
    expect(mockGetStartOffset).toHaveBeenCalled();
    expect(mockGetEndOffset).toHaveBeenCalled();
    expect(mockGetBlockForKey).toHaveBeenCalledWith('anchorKey');
    expect(mockGetText).toHaveBeenCalled();
    expect(mockGetBlockForKey).toHaveBeenCalledWith('startKey');
    expect(mockGetEntityAt).toHaveBeenCalledWith(1);
    expect(mockGetEntity).toHaveBeenCalledWith('linkKey');
    expect(mockGetData).toHaveBeenCalled();
  });

  it('should call onShowLink with nothing selected', () => {
    mockIsCollapsed.mockImplementationOnce(() => true);
    render(<LinkInput id="link-input-test" />);

    fireEvent.click(screen.getByText('ShowPopover'));

    expect(mockIsCollapsed).toHaveBeenCalled();
    expect(mockGetCurrentContent).not.toHaveBeenCalled();
    expect(mockGetStartKey).not.toHaveBeenCalled();
    expect(mockGetAnchorKey).not.toHaveBeenCalled();
    expect(mockGetStartOffset).not.toHaveBeenCalled();
    expect(mockGetEndOffset).not.toHaveBeenCalled();
    expect(mockGetBlockForKey).not.toHaveBeenCalled();
    expect(mockGetText).not.toHaveBeenCalled();
    expect(mockGetBlockForKey).not.toHaveBeenCalled();
    expect(mockGetEntityAt).not.toHaveBeenCalled();
    expect(mockGetEntity).not.toHaveBeenCalled();
    expect(mockGetData).not.toHaveBeenCalled();
  });

  it('should focus and then call onBlur if onBlur is set', () => {
    const mockOnBlur = jest.fn();
    render(<LinkInput id="link-input-test" onBlur={mockOnBlur} />);

    fireEvent.click(screen.getByText('WrapperFocus'));
    fireEvent.click(screen.getByText('WrapperBlur'));

    expect(mockOnBlur).toHaveBeenCalled();
  });

  it('should add bottomMargin and show errorText if errorText is truthy', () => {
    const { container } = render(
      <LinkInput id="link-input-test" errorText="error" />
    );

    expect(screen.getByText('ErrorText')).toBeInTheDocument();
    expect(screen.queryByText('HelperText')).not.toBeInTheDocument();
  });

  it('should add bottomMargin and show helperText if helperText is truthy', () => {
    const { container } = render(
      <LinkInput id="link-input-test" helperText="helper" />
    );

    expect(screen.getByText('HelperText')).toBeInTheDocument();
    expect(screen.queryByText('ErrorText')).not.toBeInTheDocument();
  });

  it('should not add bottomMargin or show any helperText or errorText when both are falsy', () => {
    const { container } = render(<LinkInput id="link-input-test" />);

    expect(screen.queryByText('HelperText')).not.toBeInTheDocument();
    expect(screen.queryByText('ErrorText')).not.toBeInTheDocument();
  });

  it('should only show errorText if both helperText and errorText are truthy', () => {
    render(
      <LinkInput id="link-input-test" helperText="helper" errorText="error" />
    );

    expect(screen.getByText('ErrorText')).toBeInTheDocument();
    expect(screen.queryByText('HelperText')).not.toBeInTheDocument();
  });

  it('should show characterCounter with correct maxLength when hasCharacterCouter is true and labelText is defined', () => {
    render(
      <LinkInput
        id="link-input-test"
        labelText="label"
        hasCharacterCounter
        maxLength={100}
      />
    );

    expect(screen.getByText('label')).toBeInTheDocument();
    expect(screen.getByText('0/100')).toBeInTheDocument();
  });

  it('should not show characterCounter when hasCharacterCouter is true and labelText is not defined', () => {
    render(
      <LinkInput id="link-input-test" hasCharacterCounter maxLength={100} />
    );

    expect(screen.queryByText('label')).not.toBeInTheDocument();
    expect(screen.queryByText('0/100')).not.toBeInTheDocument();
  });

  it('should only show labelText when hasCharacterCouter is false and labelText is defined', () => {
    render(<LinkInput id="link-input-test" labelText="label" />);

    expect(screen.getByText('label')).toBeInTheDocument();
    expect(screen.queryByText('0/100')).not.toBeInTheDocument();
  });
});
