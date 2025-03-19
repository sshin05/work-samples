import { fireEvent, render, screen } from '@@/test-utils';
import LinkInputPopover from '../../../src/components/link-input/LinkInputPopover';

const editorRef = () => ({
  current: { editor: { offsetLeft: 0 } }
});
const mockHandleURLUpdate = jest.fn();
const mockOnShowLinkEditor = jest.fn();
const mockSelector = jest.fn();
const mockShowPopover = jest.fn(state => state);
const mockPopoverButtonClose = jest.fn();
const mockPopoverInputOnChange = jest.fn();
const mockPopoverButtonOnClick = jest.fn();
const mockGetVisibleSelectionRect = jest.fn(() => ({
  left: undefined
}));

jest.mock('draft-js', () => ({
  getVisibleSelectionRect: () => mockGetVisibleSelectionRect()
}));

jest.mock('@digital-u/digital-ui', () => ({
  ...jest.requireActual('@digital-u/digital-ui'),
  Popover: ({ popoverContent, onClose, children }) => (
    <>
      {children}
      <button
        onClick={() => {
          mockShowPopover(true);
        }}
      >
        Popover
      </button>
      <button
        onClick={() => {
          mockPopoverButtonClose();
          onClose();
          mockShowPopover(false);
        }}
        style={{ pointerEvents: 'initial' }}
      >
        PopClose
      </button>
      {popoverContent}
    </>
  ),

  Text: ({ children }) => <span>{children}</span>,
  Flex: ({ children }) => <div>{children}</div>
}));

jest.mock('@carbon/icons-react', () => ({
  Link: ({ onClick, color }) => (
    <button
      onClick={event => {
        mockPopoverButtonOnClick(event);
        onClick(event);
      }}
      color={color}
      style={{ pointerEvents: 'initial' }}
    >
      PopoverButton
    </button>
  ),
  WarningFilled: () => <div>WarningFilled</div>
}));

const mockPopoverOffsetCloseToEnd = jest.fn();
const mockPopoverOffset = jest.fn();

jest.mock('../../../src/components/link-input/linkInputStyles', () => ({
  StyledPopoverContainer: ({ children }) => <div>{children}</div>,
  StyledPopoverContentContainer: ({ children }) => <div>{children}</div>,
  StyledPopoverIconContainer: ({
    popoverOffsetCloseToEnd,
    popoverOffset,
    children
  }) => {
    mockPopoverOffsetCloseToEnd(popoverOffsetCloseToEnd);
    mockPopoverOffset(popoverOffset);
    return <div>{children}</div>;
  }
}));

const POPOVER_ID = 'gamer';

const mockQuerySelector = jest.fn(id => {
  if (id === `#${POPOVER_ID}`) return { scrollWidth: 0 };
  return document.getElementById(id);
});

document.querySelector = mockQuerySelector;

describe('LinkInputPopover', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should render LinkInputPopover', () => {
    render(
      <>
        <LinkInputPopover
          EditorRef={editorRef}
          linkText={'test linkinput text'}
          id={POPOVER_ID}
          linkUrl={''}
          handleURLUpdate={mockHandleURLUpdate}
          onShowLinkEditor={mockOnShowLinkEditor}
          selectorState={mockSelector}
        />
      </>
    );

    expect(mockQuerySelector).toHaveBeenCalledWith('#gamer');
    expect(screen.getByText('PopoverButton')).toBeInTheDocument();
    expect(screen.getByText('Popover')).toBeInTheDocument();
    expect(screen.getByText('PopClose')).toBeInTheDocument();
    expect(screen.getByText('Link Text')).toBeInTheDocument();
    expect(screen.getByText('URL*')).toBeInTheDocument();
  });

  it('should show popover on click', () => {
    render(
      <LinkInputPopover
        EditorRef={editorRef}
        linkText={'test linkinput text'}
        id={POPOVER_ID}
        linkUrl={''}
        handleURLUpdate={mockHandleURLUpdate}
        onShowLinkEditor={mockOnShowLinkEditor}
        selectorState={mockSelector}
      />
    );
    fireEvent.click(screen.getByText('PopoverButton'));
    expect(mockOnShowLinkEditor).toHaveBeenCalled();
  });

  it('should show popover on click with proper selector position value', () => {
    mockQuerySelector.mockReturnValueOnce({ scrollWidth: 900 });
    mockGetVisibleSelectionRect.mockReturnValueOnce({
      left: 120
    });

    const editorRef = {
      current: { editor: { offsetLeft: 80 } }
    };

    render(
      <LinkInputPopover
        EditorRef={editorRef}
        linkText={'test linkinput text'}
        id={POPOVER_ID}
        linkUrl={''}
        handleURLUpdate={mockHandleURLUpdate}
        onShowLinkEditor={mockOnShowLinkEditor}
        selectorState={mockSelector}
      />
    );

    fireEvent.click(screen.getByText('PopoverButton'));
    expect(mockOnShowLinkEditor).toHaveBeenCalled();
    expect(mockPopoverOffsetCloseToEnd).toHaveBeenLastCalledWith(false);
    expect(mockPopoverOffset).toHaveBeenLastCalledWith(645);
  });

  it('should show popover on click with different positoning b/c its below popover button', () => {
    mockQuerySelector.mockReturnValueOnce({ scrollWidth: 900 });
    mockGetVisibleSelectionRect.mockReturnValueOnce({
      left: 860
    });

    const editorRef = {
      current: { editor: { offsetLeft: 80 } }
    };

    render(
      <LinkInputPopover
        EditorRef={editorRef}
        linkText={'test linkinput text'}
        id={POPOVER_ID}
        linkUrl={''}
        handleURLUpdate={mockHandleURLUpdate}
        onShowLinkEditor={mockOnShowLinkEditor}
        selectorState={mockSelector}
      />
    );

    fireEvent.click(screen.getByText('PopoverButton'));
    expect(mockOnShowLinkEditor).toHaveBeenCalled();
    expect(mockPopoverOffsetCloseToEnd).toHaveBeenLastCalledWith(true);
    expect(mockPopoverOffset).toHaveBeenLastCalledWith(-95);
  });

  it('should not show popover when exiting popover', () => {
    render(
      <LinkInputPopover
        EditorRef={editorRef}
        linkText={'test linkinput text'}
        id={POPOVER_ID}
        linkUrl={''}
        handleURLUpdate={mockHandleURLUpdate}
        onShowLinkEditor={mockOnShowLinkEditor}
        selectorState={mockSelector}
      />
    );
    fireEvent.click(screen.getByText('PopClose'));
    expect(mockPopoverButtonClose).toHaveBeenCalled();
  });
});
