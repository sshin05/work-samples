import React from 'react';
import { renderV3, screen } from '@@/test-utils';
import { LicensesIndicator } from './LicensesIndicator';
import { useChartColors } from '@/lib/chartjs';

const mockNotify = jest.fn();

jest.mock('@/lib/chartjs', () => ({
  useChartColors: jest.fn()
}));

jest.mock('lodash', () => ({
  sum: jest.fn(values => values.reduce((acc, val) => acc + val, 0)), // Simple sum
  filter: jest.fn((values, predicate) => values.filter(predicate)) // Simple filter
}));

jest.mock('@cerberus/react', () => ({
  useNotificationCenter: jest.fn(() => ({
    notify: mockNotify
  })),
  NotificationCenter: ({ children }) => <div>{children}</div>,
  IconButton: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  ModalHeader: ({ children }) => <div>{children}</div>,
  ModalHeading: ({ children }) => <div>{children}</div>,
  Tooltip: ({ children, content }) => (
    <div data-testid="tooltip">
      {children}
      <span data-testid="tooltip-content">{content}</span>
    </div>
  )
}));

describe('LicenseIndicator Component', () => {
  const mockChartColors = {
    sequential300: '#ff0000',
    sequential200: '#00ff00',
    sequential100: '#0000ff'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useChartColors as jest.Mock).mockReturnValue(mockChartColors);
  });

  const renderComponent = (props: {
    containerWidth: number;
    active: number;
    inactive: number;
    available: number;
  }) => {
    return renderV3(<LicensesIndicator {...props} />);
  };

  it('renders correctly with valid data', () => {
    renderComponent({
      active: 5,
      inactive: 3,
      available: 2,
      containerWidth: 300
    });

    expect(
      screen.getByLabelText(/Progress: Active 5, Inactive 3, Available 2/i)
    ).toBeInTheDocument();
    expect(screen.getAllByTestId('tooltip')).toHaveLength(3);
    expect(screen.getByText('5 (50%)')).toBeInTheDocument();
    expect(screen.getByText('3 (30%)')).toBeInTheDocument();
    expect(screen.getByText('2 (20%)')).toBeInTheDocument();
  });

  it('renders only non-zero segments and excludes zero-value segments', () => {
    renderComponent({
      active: 4,
      inactive: 0,
      available: 6,
      containerWidth: 300
    });

    expect(screen.getAllByTestId('tooltip')).toHaveLength(2);
    expect(screen.getByText('4 (40%)')).toBeInTheDocument();
    expect(screen.getByText('6 (60%)')).toBeInTheDocument();
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('handles zero values ever gracefully', () => {
    renderComponent({
      active: 0,
      inactive: 0,
      available: 0,
      containerWidth: 300
    });

    expect(
      screen.getByLabelText(/Progress: Active 0, Inactive 0, Available 0/i)
    ).toBeInTheDocument();
    expect(screen.queryAllByTestId('tooltip')).toHaveLength(0);
  });

  it('applies correct background colors', () => {
    renderComponent({
      active: 2,
      inactive: 2,
      available: 2,
      containerWidth: 300
    });

    const activeSegment = screen.getByRole('segment-active');
    const inactiveSegment = screen.getByRole('segment-inactive');
    const availableSegment = screen.getByRole('segment-available');
    expect(activeSegment).toHaveStyle('background-color: #ff0000');
    expect(inactiveSegment).toHaveStyle('background-color: #00ff00');
    expect(availableSegment).toHaveStyle('background-color: #0000ff');
  });

  it('displays "<1%" when the percentage is under 1%', () => {
    renderComponent({
      active: 1,
      inactive: 199,
      available: 0,
      containerWidth: 300
    });

    expect(screen.getByText(/1 \(<1%\)/i)).toBeInTheDocument();
  });
  it('displays "100%" when the segment is the entire sum', () => {
    renderComponent({
      active: 10,
      inactive: 0,
      available: 0, // sum = 10
      containerWidth: 300
    });
    expect(screen.getAllByText(/10 \(100%\)/i)[0]).toBeInTheDocument();
    expect(screen.getAllByTestId('tooltip')).toHaveLength(1);
  });
  it('displays "<99%" for large percentages under 100%', () => {
    renderComponent({
      active: 100,
      inactive: 1,
      available: 0,
      containerWidth: 300
    });
    expect(screen.getAllByText(/100 \(>99%\)/i)[0]).toBeInTheDocument();
  });
});
