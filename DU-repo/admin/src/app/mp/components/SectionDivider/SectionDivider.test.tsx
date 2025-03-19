import React from 'react';
import { renderV3, screen } from '@@/test-utils';
import { SectionDivider } from './SectionDivider';

describe('SectionDivider', () => {
  describe('Basic Render', () => {
    it('is in the document', () => {
      renderV3(<SectionDivider />);

      const divider = screen.getByRole('separator');
      expect(divider).toBeInTheDocument();
    });
  });
});
