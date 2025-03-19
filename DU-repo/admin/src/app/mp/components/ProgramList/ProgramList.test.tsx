import React from 'react';
import { renderV3, screen } from '@@/test-utils';
import { ProgramList } from './ProgramList';

jest.mock('@cerberus/styled-system/patterns', () => ({
  grid: jest.fn(() => 'mock-grid-class'),
  vstack: jest.fn(() => 'mock-vstack-class'),
  animateIn: jest.fn(() => 'mock-animate-in')
}));

const CONTENT_TEXT = 'Program Item';

describe('ProgramList', () => {
  const ChildComponent = () => (
    <div>
      <p>{CONTENT_TEXT}</p>
    </div>
  );

  describe('Basic Render', () => {
    it('renders children', () => {
      renderV3(
        <ProgramList>
          <ChildComponent />
        </ProgramList>
      );

      const child = screen.getByText(CONTENT_TEXT);
      expect(child).toBeInTheDocument();
    });
  });
});
