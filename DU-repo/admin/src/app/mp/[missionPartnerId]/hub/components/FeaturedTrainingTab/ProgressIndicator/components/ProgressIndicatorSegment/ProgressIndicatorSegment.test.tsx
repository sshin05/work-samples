import React from 'react';
import { renderV3, screen } from '@@/test-utils';
import { ProgressIndicatorSegment } from '.';
import { useRouteParams } from '@/hooks/useRouteParams';

jest.mock('@cerberus/react', () => ({
  Tooltip: ({ children }) => <div>{children}</div>,
  NotificationCenter: ({ children }) => <div>{children}</div>
}));

jest.mock('@/hooks/useRouteParams', () => ({
  useRouteParams: jest.fn()
}));

const defaultProps = {
  label: 'Assigned',
  value: 10,
  width: '50px',
  color: '#ff0000',
  isFirst: true,
  isLast: false
};

describe('ProgressIndicator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouteParams as jest.Mock).mockReturnValue({
      missionPartnerId: '12345'
    });
  });
  it('should render segments properly', () => {
    renderV3(
      <ProgressIndicatorSegment
        label="Assigned"
        value={1}
        width="80px"
        color="red"
        isFirst={true}
        isLast={false}
      />
    );

    expect(screen.getByLabelText('Assigned: 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Assigned: 1')).toHaveStyle('width: 80px');
    expect(screen.getByLabelText('Assigned: 1')).toHaveStyle(
      'background-color: red'
    );
  });
  it('should render the first segment correctly', () => {
    renderV3(<ProgressIndicatorSegment {...defaultProps} />);
    const segment = screen.getByLabelText('Assigned: 10');

    expect(segment).toBeInTheDocument();
    expect(defaultProps.isFirst).toBe(true);
  });
  it('should render the last segment correctly', () => {
    renderV3(
      <ProgressIndicatorSegment
        {...defaultProps}
        isFirst={false}
        isLast={true}
      />
    );

    const segment = screen.getByLabelText('Assigned: 10');
    expect(segment).toBeInTheDocument();
  });
});
