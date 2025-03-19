import React from 'react';
import { render, screen } from '@@/test-utils';
import Table from '../../src/components/table/table';
import { Text } from '@/components_new/deprecated/Text';

describe('Table', () => {
  it('should render an empty table', () => {
    render(
      <Table
        rowTemplate={[
          ({ cellData }) => <Text>{cellData}</Text>,
          ({ cellData }) => <Text>{cellData}</Text>
        ]}
      />
    );
  });

  it('should render an empty table with headings', () => {
    render(
      <Table
        columnTitles={['Heading']}
        rowTemplate={[
          ({ cellData }) => <Text>{cellData}</Text>,
          ({ cellData }) => <Text>{cellData}</Text>
        ]}
      />
    );

    expect(screen.getByText('Heading')).toBeInTheDocument();
  });

  it('should render an table with data when data is not empty', () => {
    render(
      <Table
        columnTitles={['Heading']}
        rowTemplate={[({ cellData }) => <Text>{cellData}</Text>]}
        data={[['Heading row data 1'], ['Heading row data 2']]}
      />
    );

    expect(screen.getByText('Heading row data 1')).toBeInTheDocument();
    expect(screen.getByText('Heading row data 2')).toBeInTheDocument();
  });

  it('should render an empty table no data row when data is empty', () => {
    render(
      <Table
        columnTitles={['Heading']}
        rowTemplate={[({ cellData }) => <Text>{cellData}</Text>]}
        data={[]}
      />
    );

    expect(screen.getByText('No Data')).toBeInTheDocument();
  });
});
