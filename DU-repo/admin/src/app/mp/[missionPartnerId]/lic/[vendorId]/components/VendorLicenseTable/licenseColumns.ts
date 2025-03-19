import { abbreviatedDayDate } from '@/utils/date/abbreviatedDayDate';

export const columns: {
  header: string;
  accessorKey: string;
  cell?: any;
  enableSorting?: boolean;
}[] = [
  {
    header: 'Name',
    accessorKey: 'name',
    cell: ({ row: { original } }) => {
      return `${original.userFirstName} ${original.userLastName}`;
    }
  },
  {
    header: 'User Email',
    accessorKey: 'userEmail'
  },
  {
    header: 'Assigned At',
    accessorKey: 'assignedAt',
    enableSorting: false,
    cell: info => {
      const value = info.getValue();
      return value ? abbreviatedDayDate(value) : '';
    }
  },
  {
    header: 'Last Used',
    accessorKey: 'lastUsedAt',
    cell: info => {
      const value = info.getValue();
      return value ? abbreviatedDayDate(value) : '';
    }
  }
];
