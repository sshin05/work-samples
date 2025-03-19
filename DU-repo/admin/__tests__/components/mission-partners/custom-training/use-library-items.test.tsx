import { useLibraryItems } from '../../../../src/components/manage-mission-partners/custom-training/useLibraryItems';
import { render } from '@@/test-utils';

const TestComponent = ({ args }) => {
  useLibraryItems({
    ...args
  });

  return <div />;
};

describe('useLibraryItems', () => {
  const mockFm = {
    title: 'title',
    unsequenced: false,
    missionPartnerId: 1,
    conditions: {
      all: []
    },
    content: {
      summary: 'summary',
      description: ['description'],
      about: {
        title: 'about-title',
        description: ['about-description']
      }
    }
  };

  const mockSetLibraryItems = jest.fn();
  const props = {
    forceMultiplierById: mockFm,
    forceMultiplierByIdLoading: false,
    uploadLibraryItemData: {
      libraryItems: {
        data: {
          id: 1,
          name: 'name',
          type: 'type',
          url: 'url'
        }
      }
    },
    uploadLibraryItemLoading: false,
    deleteLibraryItemData: {
      libraryItems: {
        data: {
          id: 1,
          name: 'name',
          type: 'type',
          url: 'url'
        }
      }
    },
    deleteLibraryItemLoading: false,
    setLibraryItems: mockSetLibraryItems
  };

  it('should call appropriate methods', () => {
    render(<TestComponent args={props} />);

    expect(mockSetLibraryItems).toHaveBeenCalled();
  });
});
