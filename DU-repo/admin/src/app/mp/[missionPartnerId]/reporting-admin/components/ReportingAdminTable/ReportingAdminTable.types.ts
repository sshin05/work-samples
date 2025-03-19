type Columns = 'report';
export type TableProps = {
  type: Columns;
  onDelete?: (id: string) => Promise<void>;
};
