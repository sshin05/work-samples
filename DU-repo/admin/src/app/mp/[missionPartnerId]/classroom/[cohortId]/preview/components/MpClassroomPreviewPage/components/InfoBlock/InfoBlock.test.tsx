import React from 'react';
import { renderV3, screen } from '@@/test-utils';
import { InfoBlock } from './InfoBlock';
import { Location, Information } from '@carbon/icons-react';

jest.mock('@carbon/icons-react', () => ({
  Location: () => <svg data-testid="icon-location"></svg>,
  Information: () => <svg data-testid="icon-information"></svg>
}));

describe('InfoBlock', () => {
  const defaultProps = {
    heading: 'Test Heading',
    content: 'Line 1\nLine 2\nLine 3',
    Icon: Location
  };

  describe('Basic Render', () => {
    it('renders with heading, content, and icon', () => {
      renderV3(<InfoBlock {...defaultProps} />);

      const heading = screen.getByRole('heading', {
        name: defaultProps.heading
      });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent(defaultProps.heading);

      const icon = screen.getByTestId('icon-location');
      expect(icon).toBeInTheDocument();

      const lines = screen.getAllByText(/Line \d/);
      expect(lines).toHaveLength(3);
      lines.forEach((line, index) => {
        expect(line).toHaveTextContent(`Line ${index + 1}`);
      });
    });

    it('renders a ReactNode as content', () => {
      const customContent = (
        <div>
          <span>Custom Content Line 1</span>
          <br />
          <span>Custom Content Line 2</span>
        </div>
      );

      renderV3(<InfoBlock {...defaultProps} content={customContent} />);

      expect(screen.getByText('Custom Content Line 1')).toBeInTheDocument();
      expect(screen.getByText('Custom Content Line 2')).toBeInTheDocument();
    });
  });

  describe('Icons', () => {
    it('renders the correct icon', () => {
      renderV3(<InfoBlock {...defaultProps} Icon={Information} />);

      const icon = screen.getByTestId('icon-information');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Content', () => {
    it('splits string content into multiple lines', () => {
      renderV3(<InfoBlock {...defaultProps} />);

      const lines = screen.getAllByText(/Line \d/);
      expect(lines).toHaveLength(3);
      lines.forEach((line, index) => {
        expect(line).toHaveTextContent(`Line ${index + 1}`);
      });
    });

    it('handles empty content', () => {
      renderV3(<InfoBlock {...defaultProps} content="" />);

      const contentContainer = screen.getByRole('heading', {
        name: defaultProps.heading
      }).nextElementSibling;
      expect(contentContainer?.textContent).toBe('');
    });
  });
});
