import { renderV3, screen } from '@@/test-utils';
import { RoleTab } from './RoleTab';

const mockJobRole = {
  findJobRole: {
    data: [
      {
        id: '00000000-0000-0000-0000-000000000000',
        description: 'Test Description',
        domain: {
          id: '1234',
          name: 'Test JobRole'
        }
      }
    ],
    total: 1
  }
};

jest.mock('@/api/dcwf/role/useFindJobRoles', () => ({
  useFindJobRoles: () => ({
    data: mockJobRole,
    isLoading: false,
    isError: false
  })
}));

jest.mock(
  '@/app/sys/dcwf/components/DcwfPage/components/DcwfTabs/components/RoleTab/components/EnterRoleModal',
  () => ({
    EnterRoleModal: () => <div>EnterRoleModal</div>
  })
);

describe('RoleTab', () => {
  it('should render', () => {
    renderV3(<RoleTab ksatId="1234" />);

    const [description, view] = screen.getAllByRole('columnheader');

    expect(description).toHaveTextContent('Role');
    expect(view).toHaveTextContent('Role title');
  });
});
