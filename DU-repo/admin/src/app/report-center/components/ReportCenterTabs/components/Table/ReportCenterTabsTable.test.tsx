import React from 'react';
import { renderV3, screen } from '@@/test-utils';
import { type ReportCenterTabsTableProps } from './ReportCenterTabsTable.types';
import Table from './Table';

describe('Table', () => {
  const getDefaultProps = (): ReportCenterTabsTableProps => ({
    rows: [],
    loading: false,
    onDelete: jest.fn(),
    type: 'download'
  });

  it('renders', () => {
    renderV3(<Table {...getDefaultProps()} />);

    expect(screen.getByText('No Results Found')).toBeInTheDocument();
  });
});
