import { renderV3, screen } from '@@/test-utils';
import { RoleTab } from './RoleTab';

jest.mock('./components/EnterRoleModal', () => ({
  EnterRoleModal: () => <div>EnterRoleModal</div>
}));
jest.mock('../Filters/FiltersModal/FiltersModal', () => ({
  FiltersModal: () => <div>FiltersModal</div>
}));

const mockJobRoleData = {
  findJobRoles: {
    data: [
      {
        id: '00000000-0000-0000-0000-000000000000',
        roleId: 'A0',
        name: 'Test Description',
        description: 'Test Description'
      }
    ],
    total: 1
  }
};

jest.mock('@/api/dcwf/role/useFindJobRoles', () => ({
  useFindJobRoles: () => ({
    data: mockJobRoleData,
    isLoading: false,
    isError: false
  })
}));

describe('RoleTab', () => {
  it('should render', () => {
    renderV3(<RoleTab />);

    const [roleId, title, description, view] =
      screen.getAllByRole('columnheader');

    expect(description).toHaveTextContent('Description');
    expect(roleId).toHaveTextContent('Role ID');
    expect(title).toHaveTextContent('Role title');
    expect(view).toHaveTextContent('');
    expect(
      screen.getByRole('button', { name: 'add Enter Role' })
    ).toBeInTheDocument();
    expect(screen.getByText('EnterRoleModal')).toBeInTheDocument();
  });
});
