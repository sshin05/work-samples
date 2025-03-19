import React from 'react';
import { render, screen } from '@@/test-utils';
import useDragDropDebounce from '@/utils/use-drag-drop-debounce/useDragDropDebounce';

describe('useDragDropDebounce hook', () => {
  it('should update items after a set delay', () => {
    jest.useFakeTimers();
    const DebouncedComponent: React.FC<{
      value: string[];
      delay: number;
    }> = ({ value, delay }) => {
      useDragDropDebounce(value, delay);
      return <div>{value}</div>;
    };

    render(<DebouncedComponent value={['1', '2', '3']} delay={10} />);
    jest.advanceTimersByTime(10);
    expect(screen.getByText('123')).toBeInTheDocument();
  });
});
