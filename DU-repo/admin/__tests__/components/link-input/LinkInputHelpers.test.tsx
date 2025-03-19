import { ContentState, EditorState } from 'draft-js';
import {
  Link,
  findLinkEntities,
  getLengthOfSelectedText,
  checkValidURL
} from '../../../src/components/link-input/linkInputHelpers';
import { render, screen } from '@@/test-utils';

const mockIsCollapsed = jest.fn(() => false);
const mockGetStartKey = jest.fn(() => 'yes');
const mockGetEndKey = jest.fn(() => 'yes');
const mockGetLength = jest.fn(() => 1);
const mockGetStartOffset = jest.fn(() => 1);
const mockGetEndOffset = jest.fn(() => 2);
const mockGetKeyAfter = jest.fn(() => 'F');

const mockFindEntityRanges = jest.fn((filterFunc, callback) => {
  filterFunc({
    getEntity: () => mockGetEntity(null)
  });
  callback(0, 1);
});
const mockGetEntity = jest.fn(entityKey => ({
  getType: mockGetType(entityKey)
}));
const mockGetType = jest.fn(entityKey => {
  if (entityKey === 'link') return 'LINK';
});

const mockContentState = {
  getEntity: jest.fn(entityKey => ({
    getData: () => ({ url: `${entityKey}-contentStateData` }),
    getType: () => mockGetType(entityKey)
  })),
  getBlockForKey: (_key: any) => mockContentBlock,
  getKeyAfter: mockGetKeyAfter
} as unknown as ContentState;

const mockContentBlock = {
  findEntityRanges: mockFindEntityRanges,
  getLength: mockGetLength
};

const mockEditorState = {
  getSelection: jest.fn(() => ({
    isCollapsed: mockIsCollapsed,
    getStartKey: mockGetStartKey,
    getEndKey: mockGetEndKey,
    getStartOffset: mockGetStartOffset,
    getEndOffset: mockGetEndOffset
  })),
  getCurrentContent: () => mockContentState
} as unknown as EditorState;

describe('LinkInputHelpers', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('Link', () => {
    it('should create the CompositeDecorator link component correctly', () => {
      const { container } = render(
        <Link entityKey="entityKeyTest" contentState={mockContentState}>
          linkChildren
        </Link>
      );

      const link = container.getElementsByTagName('a')[0];

      expect(screen.getByText('linkChildren')).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'entityKeyTest-contentStateData');
    });
  });

  describe('findLinkEntities', () => {
    it('should call getType  with undefined when getEntity.getType is undefined', () => {
      findLinkEntities(mockContentBlock, jest.fn(), mockContentState);

      expect(mockFindEntityRanges).toHaveBeenCalledWith(
        expect.any(Function),
        expect.any(Function)
      );
      expect(mockGetEntity).toHaveBeenCalled();
      expect(mockGetType).toHaveBeenCalled();
      expect(mockGetType.mock.results[0].value).toBe(undefined);
    });

    it('should call getType  with undefined when getEntity.getType is not recognized', () => {
      mockGetEntity.mockImplementation(() => ({
        getType: mockGetType('not_link')
      }));

      findLinkEntities(mockContentBlock, jest.fn(), mockContentState);

      expect(mockFindEntityRanges).toHaveBeenCalledWith(
        expect.any(Function),
        expect.any(Function)
      );
      expect(mockGetEntity).toHaveBeenCalled();
      expect(mockGetType).toHaveBeenCalled();
      expect(mockGetType.mock.results[0].value).toBe(undefined);
    });

    it('should call getType  with LINK when getEntity.getType is link', () => {
      mockGetEntity.mockImplementation(() => ({
        getType: mockGetType('link')
      }));

      findLinkEntities(mockContentBlock, jest.fn(), mockContentState);

      expect(mockFindEntityRanges).toHaveBeenCalledWith(
        expect.any(Function),
        expect.any(Function)
      );
      expect(mockGetEntity).toHaveBeenCalled();
      expect(mockGetType).toHaveBeenCalled();
      expect(mockGetType.mock.results[0].value).toBe('LINK');
    });
  });

  describe('getLengthOfSelectedText', () => {
    it('should return the correct length text when the selector is collapsed', () => {
      mockIsCollapsed.mockImplementation(() => true);

      expect(getLengthOfSelectedText(mockEditorState)).toBe(0);
    });

    it('should return the correct length text when the selector is not collapsed and startkey and endkey are the same', () => {
      mockIsCollapsed.mockImplementation(() => false);

      expect(getLengthOfSelectedText(mockEditorState)).toBe(1);
    });

    it('should return the correct length text when the selector is not collapsed and startkey and endkey are not the same', () => {
      mockGetStartKey.mockImplementation(() => 'startKey');
      mockIsCollapsed.mockImplementation(() => false);

      expect(getLengthOfSelectedText(mockEditorState)).toBe(3);
    });

    it('should return the correct length text when the selector is not collapsed, the startkey and endkey are not the same, and the currentKey eventually equals the keyAfter', () => {
      mockGetStartKey.mockImplementation(() => 'startKey');
      mockGetKeyAfter.mockImplementation(() => 'yes');
      mockIsCollapsed.mockImplementation(() => false);

      expect(getLengthOfSelectedText(mockEditorState)).toBe(3);
    });
  });

  describe('checkValidURL', () => {
    it('should use checkValidURL correctly', () => {
      expect(checkValidURL('gamer')).toBe(false);
      expect(checkValidURL('https://gamer')).toBe(true);
      expect(checkValidURL('http://gamer')).toBe(false);
    });
  });
});
