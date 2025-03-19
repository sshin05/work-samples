import React from 'react';
import { renderV3, screen } from '@@/test-utils';
import { ProgressIndicator } from './ProgressIndicator';
import { useRouteParams } from '@/hooks/useRouteParams';

jest.mock('@cerberus/react', () => ({
  Tooltip: ({ children }) => <div>{children}</div>,
  NotificationCenter: ({ children }) => <div>{children}</div>
}));

jest.mock('@/hooks/useRouteParams', () => ({
  useRouteParams: jest.fn()
}));

describe('ProgressIndicator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouteParams as jest.Mock).mockReturnValue({
      missionPartnerId: '12345'
    });
  });

  it('should render', () => {
    renderV3(
      <ProgressIndicator
        assigned={1}
        inProgress={2}
        completed={3}
        stopped={4}
        containerWidth={240}
      />
    );
    expect(
      screen.getByLabelText(
        'Progress: Assigned 1, In Progress 2, Stopped 4, Completed 3'
      )
    ).toBeInTheDocument();
  });
  it('should render segments properly', () => {
    renderV3(
      <ProgressIndicator
        assigned={1}
        inProgress={0}
        completed={2}
        stopped={0}
        containerWidth={240}
      />
    );
    expect(
      screen.getByLabelText(
        'Progress: Assigned 1, In Progress 0, Stopped 0, Completed 2'
      )
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Assigned: 1/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Completed: 2/)).toBeInTheDocument();
    expect(screen.getByLabelText(/In Progress 0/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Stopped 0/)).toBeInTheDocument();
  });
  it('should calculate and apply correct segment widths', () => {
    renderV3(
      <ProgressIndicator
        assigned={1}
        inProgress={0}
        completed={2}
        stopped={0}
        containerWidth={240}
      />
    );

    expect(screen.getByLabelText('Assigned: 1')).toHaveStyle('width: 80px'); // (1 / 3) * 240
    expect(screen.getByLabelText('Completed: 2')).toHaveStyle('width: 160px'); // (2 / 3) * 240
  });
  it('should not render zero value segments', () => {
    renderV3(
      <ProgressIndicator
        assigned={0}
        inProgress={0}
        completed={0}
        stopped={0}
        containerWidth={240}
      />
    );

    expect(screen.queryByLabelText('Assigned: 0')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('In Progress: 0')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Stopped: 0')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Completed: 0')).not.toBeInTheDocument();
  });
});

describe('toPixelWidth', () => {
  let containerWidth: number;
  let sum: number;

  // define mock implementation
  const toPixelWidth = (value: number): string => {
    return containerWidth && sum > 0
      ? `${((value / sum) * containerWidth).toFixed(0)}px`
      : 'auto';
  };

  beforeEach(() => {
    containerWidth = 240;
    sum = 100; // default sum
  });

  it('should calculate pixel width correctly when valid inputs are provided', () => {
    const value = 50; // half of sum
    const result = toPixelWidth(value);
    expect(result).toBe('120px'); // half of containerWidth
  });

  it('should return "auto" if containerWidth is 0', () => {
    containerWidth = 0;
    const result = toPixelWidth(50);
    expect(result).toBe('auto');
  });

  it('should return "auto" if sum is 0', () => {
    sum = 0;
    const result = toPixelWidth(50);
    expect(result).toBe('auto');
  });

  it('should return 0px if value is 0', () => {
    const result = toPixelWidth(0);
    expect(result).toBe('0px');
  });
});
