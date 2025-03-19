import React from 'react';
import { renderV3, screen } from '@@/test-utils';
import { DashboardTile } from './DashboardTile';

jest.mock('@cerberus/react', () => ({
  ...jest.requireActual('@cerberus/react'),
  Text: ({ children }) => <span>{children}</span>
}));

describe('DashboardTile', () => {
  const defaultProps = {
    headingTitle: 'Test Title',
    headingValue: 12345,
    countTextWithPlaceholder: 'Footer text with {} placeholder',
    count: 67890,
    headingLoading: false,
    countLoading: false
  };

  it('renders heading title', () => {
    renderV3(<DashboardTile {...defaultProps} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders heading value when not loading', () => {
    renderV3(<DashboardTile {...defaultProps} />);
    expect(screen.getByText('12,345')).toBeInTheDocument();
  });

  it('renders loading skeleton when heading is loading', () => {
    renderV3(<DashboardTile {...defaultProps} headingLoading={true} />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('renders count text with placeholder and value', () => {
    renderV3(<DashboardTile {...defaultProps} />);
    expect(screen.getByText(/Footer text with/i)).toBeInTheDocument();
    expect(screen.getByText('67,890')).toBeInTheDocument();
    expect(screen.getByText(/placeholder/i)).toBeInTheDocument();
  });

  it('renders count loading placeholder when count is loading', () => {
    renderV3(<DashboardTile {...defaultProps} countLoading={true} />);
    expect(screen.getByText('---')).toBeInTheDocument();
  });

  it('does not render count if countTextWithPlaceholder is empty', () => {
    renderV3(<DashboardTile {...defaultProps} countTextWithPlaceholder="" />);
    expect(screen.queryByText('Footer text with')).not.toBeInTheDocument();
  });
});
