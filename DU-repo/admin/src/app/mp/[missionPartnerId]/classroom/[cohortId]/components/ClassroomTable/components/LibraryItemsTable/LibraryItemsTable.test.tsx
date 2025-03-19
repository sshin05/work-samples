import { render, screen } from '@testing-library/react';
import { LibraryItemsTable } from './LibraryItemsTable';
import { useSQLQuery } from '@/app/api';

jest.mock('@/app/api', () => ({
  useSQLQuery: jest.fn()
}));

jest.mock('../../../UploadFileModal', () => ({
  UploadFileModal: () => <div data-testid="upload-file-modal">Mock Modal</div>
}));

jest.mock('@/app/mp/components/LibraryItemIcon/LibraryItemIcon', () => ({
  LibraryItemIcon: () => <div data-testid="library-item-icon">Icon</div>
}));

describe('LibraryItemsTable', () => {
  const mockCohortData = {
    id: 'mock-cohort-id',
    libraryItems: [
      {
        id: '1',
        name: 'Introduction to Programming',
        type: 'File',
        url: 'example.com/fake1',
        date: '2024-12-16T12:34:56Z'
      },
      {
        id: '2',
        name: 'JavaScript Basics',
        type: 'Video',
        url: 'example.com/fake2',
        date: '2024-12-16T12:34:56Z'
      }
    ]
  };

  beforeEach(() => {
    (useSQLQuery as jest.Mock).mockReturnValue({
      data: mockCohortData,
      loading: false
    });
  });

  it('renders the component with cohort library items', () => {
    render(<LibraryItemsTable cohortId="mock-cohort-id" />);

    expect(screen.getByText('2 Items')).toBeInTheDocument();

    const rows = screen.getAllByTestId('library-item-icon');
    expect(rows).toHaveLength(mockCohortData.libraryItems.length);

    mockCohortData.libraryItems.forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });

    expect(screen.getByText('Add Library Item')).toBeInTheDocument();
  });
});
