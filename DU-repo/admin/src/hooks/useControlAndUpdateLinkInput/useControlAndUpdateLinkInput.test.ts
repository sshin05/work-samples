import { useControlAndUpdateLinkInput } from '@/hooks/useControlAndUpdateLinkInput';
import { safelyGetHookContents } from '@@/test-utils';
import type { CompositeDecorator, EditorState } from 'draft-js';

const mockCreateFromBlockArray = jest.fn((_func1, _func2) => ({}));
const mockCreateWithContent = jest.fn((_func1, _func2) => 'initialContent');
const mockConvertFromHTML = jest.fn(_test => ({
  contentBlocks: jest.fn(),
  entityMap: jest.fn()
}));
const mockGetCurrentContent = jest.fn(() => ({
  getPlainText: mockGetPlainText
}));
const mockGetPlainText = jest.fn(() => 'plainText');
const mockConvertToRaw = jest.fn(_test => 'RawContent');
const mockDraftToHTML = jest.fn(_test => 'HTML');

jest.mock('draft-js', () => ({
  convertFromHTML: test => mockConvertFromHTML(test),
  convertToRaw: test => mockConvertToRaw(test),
  ContentState: {
    createFromBlockArray: (func1, func2) =>
      mockCreateFromBlockArray(func1, func2)
  },
  EditorState: {
    createWithContent: (func1, func2) => mockCreateWithContent(func1, func2)
  },
  CompositeDecorator: {}
}));

jest.mock('draftjs-to-html', () => params => mockDraftToHTML(params));

const mockSetEditorState = jest.fn();
const mockSetInputLength = jest.fn();
const mockEditorState = {
  getCurrentContent: mockGetCurrentContent
} as unknown as Pick<EditorState, 'getCurrentContent'>;
const mockDecorator = jest.fn() as unknown as CompositeDecorator;
const mockOnChange = jest.fn();
const mockSetUpdate = jest.fn();
const mockUpdate = jest.fn(() => false);

describe('useControlAndUpdateLinkInput', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call onChange and setEditor with correct values on initial load and onChange defined', () => {
    safelyGetHookContents(() =>
      useControlAndUpdateLinkInput(
        mockSetEditorState,
        mockSetInputLength,
        mockSetUpdate,
        mockEditorState,
        mockUpdate(),
        mockDecorator,
        mockOnChange,
        'placeholder',
        null
      )
    );

    expect(mockConvertFromHTML).toHaveBeenCalledWith('<p>placeholder</p>');
    expect(mockCreateFromBlockArray).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function)
    );
    expect(mockCreateWithContent).toHaveBeenCalledWith(
      expect.any(Object),
      expect.any(Function)
    );
    expect(mockSetEditorState).toHaveBeenCalledWith('initialContent');
    expect(mockSetUpdate).toHaveBeenCalledWith(true);
    expect(mockGetCurrentContent).toHaveBeenCalled();
    expect(mockGetPlainText).toHaveBeenCalled();
    expect(mockConvertToRaw).toHaveBeenCalledWith(expect.any(Object));
    expect(mockDraftToHTML).toHaveBeenCalledWith('RawContent');
    expect(mockOnChange).toHaveBeenCalledWith('HTML');
  });

  it('should replace placeholder with value when value defined and placeholder not', () => {
    safelyGetHookContents(() =>
      useControlAndUpdateLinkInput(
        mockSetEditorState,
        mockSetInputLength,
        mockSetUpdate,
        mockEditorState,
        mockUpdate(),
        mockDecorator,
        mockOnChange,
        undefined,
        'value'
      )
    );

    expect(mockConvertFromHTML).toHaveBeenCalledWith('value');
  });

  it('should default to empty string when value and placeholder not defined', () => {
    safelyGetHookContents(() =>
      useControlAndUpdateLinkInput(
        mockSetEditorState,
        mockSetInputLength,
        mockSetUpdate,
        mockEditorState,
        mockUpdate(),
        mockDecorator,
        mockOnChange
        // undefined,
        // undefined
      )
    );

    expect(mockConvertFromHTML).toHaveBeenCalledWith('');
  });

  it('should call setEditor with correct values after initial load and onChange defined', () => {
    mockUpdate.mockImplementationOnce(() => true);
    safelyGetHookContents(() =>
      useControlAndUpdateLinkInput(
        mockSetEditorState,
        mockSetInputLength,
        mockSetUpdate,
        mockEditorState,
        mockUpdate(),
        mockDecorator,
        mockOnChange,
        'placeholder',
        null
      )
    );

    expect(mockConvertFromHTML).not.toHaveBeenCalled();
    expect(mockCreateFromBlockArray).not.toHaveBeenCalled();
    expect(mockCreateWithContent).not.toHaveBeenCalled();
    expect(mockSetUpdate).not.toHaveBeenCalled();
    expect(mockSetEditorState).toHaveBeenCalledWith(mockEditorState);
    expect(mockGetCurrentContent).toHaveBeenCalled();
    expect(mockGetPlainText).toHaveBeenCalled();
    expect(mockConvertToRaw).toHaveBeenCalledWith(expect.any(Object));
    expect(mockDraftToHTML).toHaveBeenCalledWith('RawContent');
    expect(mockOnChange).toHaveBeenCalledWith('HTML');
  });

  it('should not call onChange when onChange is not defined', () => {
    mockUpdate.mockImplementationOnce(() => true);

    safelyGetHookContents(() =>
      useControlAndUpdateLinkInput(
        mockSetEditorState,
        mockSetInputLength,
        mockSetUpdate,
        mockEditorState,
        mockUpdate(),
        mockDecorator,
        undefined,
        'placeholder',
        null
      )
    );

    expect(mockConvertFromHTML).not.toHaveBeenCalled();
    expect(mockCreateFromBlockArray).not.toHaveBeenCalled();
    expect(mockCreateWithContent).not.toHaveBeenCalled();
    expect(mockSetUpdate).not.toHaveBeenCalled();
    expect(mockSetEditorState).toHaveBeenCalledWith(mockEditorState);
    expect(mockGetCurrentContent).toHaveBeenCalled();
    expect(mockGetPlainText).toHaveBeenCalled();
    expect(mockConvertToRaw).not.toHaveBeenCalled();
    expect(mockDraftToHTML).not.toHaveBeenCalled();
    expect(mockOnChange).not.toHaveBeenCalled();
  });
});
