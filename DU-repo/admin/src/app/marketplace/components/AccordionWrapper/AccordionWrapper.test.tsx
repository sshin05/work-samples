import React from 'react';
import { renderV3, screen, fireEvent } from '@@/test-utils';
import { AccordionWrapper } from './AccordionWrapper';

jest.mock('@cerberus/styled-system/patterns', () => ({
  flex: jest.fn(() => 'mock-flex-class'),
  vstack: jest.fn(() => 'mock-vstack-class'),
  animateIn: jest.fn(() => 'mock-animate-in')
}));

const TITLE = 'Accordion Title';
const CONTENT = 'This is the accordion content';

describe('AccordionWrapper', () => {
  const defaultProps = {
    title: TITLE,
    children: <p>{CONTENT}</p>
  };

  describe('Basic Render', () => {
    it('renders the title and children', () => {
      renderV3(<AccordionWrapper {...defaultProps} />);

      const titleElement = screen.getByText(TITLE);
      expect(titleElement).toBeInTheDocument();

      const contentElement = screen.getByText(CONTENT);
      expect(contentElement).toBeInTheDocument();

      const contentWrapper = contentElement.parentElement;
      expect(contentWrapper).toHaveAttribute('aria-hidden', 'true');
    });

    it('starts closed by default', () => {
      renderV3(<AccordionWrapper {...defaultProps} />);
      const contentWrapper = screen.getByText(CONTENT).parentElement;
      expect(contentWrapper).toHaveAttribute('data-state', 'closed');
    });

    it('starts opened by props', () => {
      renderV3(<AccordionWrapper {...defaultProps} isExpanded={true} />);
      const contentWrapper = screen.getByText(CONTENT).parentElement;
      expect(contentWrapper).toHaveAttribute('data-state', 'open');
      expect(contentWrapper).toHaveAttribute('aria-hidden', 'false');
    });
  });

  describe('Events', () => {
    it('toggles open/close state on click', () => {
      renderV3(<AccordionWrapper {...defaultProps} />);
      const contentWrapper = screen.getByText(CONTENT).parentElement;
      const titleElement = screen.getByText(TITLE);

      fireEvent.click(titleElement);
      expect(contentWrapper).toHaveAttribute('data-state', 'open');

      fireEvent.click(titleElement);
      expect(contentWrapper).toHaveAttribute('data-state', 'closed');
    });

    it('toggles state on Enter key press', () => {
      renderV3(<AccordionWrapper {...defaultProps} />);
      const contentWrapper = screen.getByText(CONTENT).parentElement;
      const titleElement = screen.getByText(TITLE);

      fireEvent.keyDown(titleElement, { key: 'Enter', code: 'Enter' });
      expect(contentWrapper).toHaveAttribute('data-state', 'open');

      fireEvent.keyDown(titleElement, { key: 'Enter', code: 'Enter' });
      expect(contentWrapper).toHaveAttribute('data-state', 'closed');
    });

    it('toggles state on Space key press (expanded by props)', () => {
      renderV3(<AccordionWrapper {...defaultProps} isExpanded={true} />);
      const contentWrapper = screen.getByText(CONTENT).parentElement;
      const titleElement = screen.getByText(TITLE);

      fireEvent.keyDown(titleElement, { key: ' ', code: 'Space' });
      expect(contentWrapper).toHaveAttribute('data-state', 'closed');

      fireEvent.keyDown(titleElement, { key: ' ', code: 'Space' });
      expect(contentWrapper).toHaveAttribute('data-state', 'open');
    });
  });

  describe('Icons', () => {
    it('renders the correct icon based on state', () => {
      renderV3(<AccordionWrapper {...defaultProps} />);
      const titleElement = screen.getByText(TITLE);

      let chevronIcon = screen.getByRole('icon', { hidden: true });
      expect(chevronIcon).toBeInTheDocument();

      expect(chevronIcon).toHaveAttribute('data-icon', 'caret-down');

      fireEvent.click(titleElement);

      chevronIcon = screen.getByRole('icon', { hidden: true });
      expect(chevronIcon).toBeInTheDocument();

      expect(chevronIcon).toHaveAttribute('data-icon', 'caret-up');
    });
  });
});
