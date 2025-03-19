import React from 'react';
import { renderV3, screen, setupResizeObserver } from '@@/test-utils';
import { LearnersStatusCell } from './LearnersStatusCell';
import type { OriginalRow } from './LearnersStatusCell.types';

setupResizeObserver();
jest.mock('../ProgressIndicator', () => ({
  ProgressIndicator: ({ assigned, inProgress, stopped, completed }) => (
    <div>
      <span data-testid="assigned">{assigned}</span>
      <span data-testid="inProgress">{inProgress}</span>
      <span data-testid="stopped">{stopped}</span>
      <span data-testid="completed">{completed}</span>
    </div>
  )
}));

describe('LearnersStatusCell component', () => {
  const mockData: OriginalRow = {
    completed: 1,
    inProgress: 2,
    assigned: 3,
    stopped: 4
  };

  it('should pass the correct props to ProgressIndicator', () => {
    renderV3(<LearnersStatusCell original={mockData} />);

    expect(screen.getByTestId('assigned')).toHaveTextContent('3');
    expect(screen.getByTestId('inProgress')).toHaveTextContent('2');
    expect(screen.getByTestId('stopped')).toHaveTextContent('4');
    expect(screen.getByTestId('completed')).toHaveTextContent('1');
  });

  it('should handle zero values correctly', () => {
    const zeroData: OriginalRow = {
      completed: 0,
      inProgress: 0,
      assigned: 0,
      stopped: 0
    };

    renderV3(<LearnersStatusCell original={zeroData} />);

    expect(screen.getByTestId('assigned')).toHaveTextContent('0');
    expect(screen.getByTestId('inProgress')).toHaveTextContent('0');
    expect(screen.getByTestId('stopped')).toHaveTextContent('0');
    expect(screen.getByTestId('completed')).toHaveTextContent('0');
  });

  it('should handle missing or undefined values', () => {
    const partialData = {
      completed: undefined,
      inProgress: undefined,
      assigned: undefined,
      stopped: undefined
    } as OriginalRow;

    renderV3(<LearnersStatusCell original={partialData} />);

    expect(screen.getByTestId('assigned')).toHaveTextContent('');
    expect(screen.getByTestId('inProgress')).toHaveTextContent('');
    expect(screen.getByTestId('stopped')).toHaveTextContent('');
    expect(screen.getByTestId('completed')).toHaveTextContent('');
  });

  it('should handle large numbers correctly', () => {
    const largeData: OriginalRow = {
      completed: 1000000,
      inProgress: 500000,
      assigned: 1500000,
      stopped: 2000000
    };

    renderV3(<LearnersStatusCell original={largeData} />);

    expect(screen.getByTestId('assigned')).toHaveTextContent('1500000');
    expect(screen.getByTestId('inProgress')).toHaveTextContent('500000');
    expect(screen.getByTestId('stopped')).toHaveTextContent('2000000');
    expect(screen.getByTestId('completed')).toHaveTextContent('1000000');
  });
});
