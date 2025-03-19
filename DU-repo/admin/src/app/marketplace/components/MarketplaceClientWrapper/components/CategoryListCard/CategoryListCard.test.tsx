import React from 'react';
import { renderV3, screen } from '@@/test-utils';
import { CategoryListCard } from './CategoryListCard';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

const defaultProps = {
  href: '/category/test',
  title: 'Test Category Title',
  description: 'This is a test description for a category.'
};

describe('CategoryListCard', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush
    });
  });

  describe('Basic Render', () => {
    it('renders with props', () => {
      renderV3(<CategoryListCard {...defaultProps} />);

      const linkElement = screen.getByRole('link');
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', defaultProps.href);

      const titleElement = screen.getByText(defaultProps.title);
      expect(titleElement).toBeInTheDocument();

      const descriptionElement = screen.getByText(defaultProps.description);
      expect(descriptionElement).toBeInTheDocument();
    });
  });

  describe('Icon Rendering', () => {
    it('renders the icon when iconUrl is provided', () => {
      const iconUrl = '/path/to/icon.png';
      const { container } = renderV3(
        <CategoryListCard {...defaultProps} iconUrl={iconUrl} />
      );

      const iconElement = container.querySelector('img');
      expect(iconElement).toBeInTheDocument();
      const srcAttribute = iconElement.getAttribute('src');
      const decodedSrc = decodeURIComponent(srcAttribute);
      expect(decodedSrc).toContain(iconUrl);
    });

    it('does not render an icon when iconUrl is not provided', () => {
      const { container } = renderV3(
        <CategoryListCard {...defaultProps} iconUrl={undefined} />
      );

      const iconElement = container.querySelector('img');
      expect(iconElement).not.toBeInTheDocument();
    });
  });
});
