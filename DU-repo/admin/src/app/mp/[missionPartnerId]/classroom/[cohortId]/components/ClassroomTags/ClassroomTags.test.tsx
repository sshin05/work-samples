import { render, screen } from '@testing-library/react';
import { ClassroomTags } from './ClassroomTags';

describe('ClassroomTags', () => {
  describe('Basic Render', () => {
    it('renders', () => {
      const labels = ['private', 'live'];
      render(<ClassroomTags labels={labels} />);

      expect(screen.getByText('private')).toBeInTheDocument();
      expect(screen.getByText('live')).toBeInTheDocument();
    });
  });
});
