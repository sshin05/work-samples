import React from 'react';
import { renderV3, screen } from '@@/test-utils';
import { LibraryList } from './LibraryList';
import type { CohortLibraryItem } from '../../../../../cohort.types';

jest.mock('@cerberus/icons', () => ({
  Document: () => <svg data-testid="icon-document" />,
  Video: () => <svg data-testid="icon-video" />
}));

describe('LibraryList', () => {
  const documentItem: CohortLibraryItem = {
    id: '1',
    name: 'Project Documentation',
    type: 'File',
    url: '/docs/project.pdf',
    date: ''
  };
  const videoItem: CohortLibraryItem = {
    id: '2',
    name: 'Project Video',
    type: 'Video',
    url: '/docs/project.avi',
    date: ''
  };
  const mockLibraryItems = [documentItem, videoItem];

  describe('Basic Render', () => {
    it('renders the LibraryList title', () => {
      renderV3(<LibraryList libraryItems={mockLibraryItems} />);

      const title = screen.getByText('Library');
      expect(title).toBeInTheDocument();
    });

    it('renders library items', () => {
      renderV3(<LibraryList libraryItems={mockLibraryItems} />);

      mockLibraryItems.forEach(item => {
        expect(screen.getByText(item.name)).toBeInTheDocument();
      });
    });

    it('renders icons based on item types', () => {
      renderV3(<LibraryList libraryItems={mockLibraryItems} />);

      expect(screen.getByTestId('icon-document')).toBeInTheDocument();
      expect(screen.getByTestId('icon-video')).toBeInTheDocument();
    });

    it('renders "no items" message', () => {
      renderV3(<LibraryList libraryItems={[]} />);

      const emptyMessage = screen.getByText('There are no library items.');
      expect(emptyMessage).toBeInTheDocument();
    });
  });
});
