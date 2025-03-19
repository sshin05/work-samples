import { renderV3, screen, fireEvent } from '@@/test-utils';
import { useRemoveGroupMemberships } from '@/api/user';
import { MembersTab } from './MembersTab';
import type { NoDataMessageProps } from '@/components_new/table/components/NoDataMessage/NoDataMessageProps';

jest.mock('@/api/user');

jest.mock('@/components_new/table/components/Footer', () => {
  const Footer = () => <div>Mock Footer</div>;
  return { Footer };
});

jest.mock('@/components_new/table/components/NoDataMessage', () => ({
  NoDataMessage: (props: NoDataMessageProps) => (
    <>
      {props.message}
      {props.buttonText && (
        <button onClick={props.cta} data-testid="call-to-action-button">
          {props.buttonText}
        </button>
      )}
    </>
  )
}));

jest.mock('../RemoveCohortMemberModal', () => ({
  RemoveCohortMemberModal: ({ onSubmit }) => (
    <button onClick={onSubmit}>RemoveCohortMemberModalButton</button>
  )
}));

describe('Group->MembersTab', () => {
  const mockHandleRemoveMembers = jest.fn();

  it('should render Members Tab', () => {
    renderV3(
      <MembersTab
        members={[]}
        isLoading={false}
        pageLoading={false}
        addMember={jest.fn()}
        groupId="12345"
        handleRemoveMembers={mockHandleRemoveMembers}
      />
    );
    expect(
      screen.getByText(
        'When you add members to a cohort, they will appear here.'
      )
    ).toBeInTheDocument();
    expect(screen.getByTestId('call-to-action-button')).toBeInTheDocument();
  });

  it('should render Members Tab with Members', () => {
    const members = [
      {
        email: 'email@email.com',
        firstName: 'firstName',
        lastName: 'lastName',
        id: '12345'
      }
    ];

    renderV3(
      <MembersTab
        members={members}
        isLoading={false}
        pageLoading={false}
        addMember={jest.fn()}
        groupId="12345"
        handleRemoveMembers={mockHandleRemoveMembers}
      />
    );

    expect(screen.getByText('firstName')).toBeInTheDocument();
    expect(screen.getByText('lastName')).toBeInTheDocument();
    expect(screen.getByText('email@email.com')).toBeInTheDocument();
  });

  it('should render search toolbar', () => {
    const members = [
      {
        email: 'email@email.com',
        firstName: 'firstName',
        lastName: 'lastName',
        id: '12345'
      }
    ];

    renderV3(
      <MembersTab
        members={members}
        isLoading={false}
        pageLoading={false}
        addMember={jest.fn()}
        groupId="12345"
        handleRemoveMembers={mockHandleRemoveMembers}
      />
    );

    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('Email Address')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'add Learner' })
    ).toBeInTheDocument();
  });

  it('should render edit toolbar', () => {
    const members = [
      {
        email: 'email@email.com',
        firstName: 'firstName',
        lastName: 'lastName',
        id: '12345'
      }
    ];
    renderV3(
      <MembersTab
        members={members}
        isLoading={false}
        pageLoading={false}
        addMember={jest.fn()}
        groupId="12345"
        handleRemoveMembers={mockHandleRemoveMembers}
      />
    );
    const button = screen.getByRole('button', { name: /toggle edit/i });
    fireEvent.click(button);
    fireEvent.click(screen.getAllByRole('checkbox')[0]);

    expect(screen.getByText('1 item selected')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.getByText('Learner')).toBeInTheDocument();
  });

  it('should not render edit toolbar after clicking cancel', () => {
    const members = [
      {
        email: 'email@email.com',
        firstName: 'firstName',
        lastName: 'lastName',
        id: '12345'
      }
    ];

    renderV3(
      <MembersTab
        members={members}
        isLoading={false}
        pageLoading={false}
        addMember={jest.fn()}
        groupId="12345"
        handleRemoveMembers={mockHandleRemoveMembers}
      />
    );
    const button = screen.getByRole('button', { name: /toggle edit/i });
    fireEvent.click(button);
    fireEvent.click(screen.getAllByRole('checkbox')[0]);
    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.queryAllByRole('checkbox').length).toBe(0);
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
  });

  it('should not render edit bar after clicking Remove', () => {
    (useRemoveGroupMemberships as jest.Mock).mockReturnValue({
      removeGroupMemberships: jest.fn().mockResolvedValue({}),
      removeGroupMembershipsLoading: false,
      removeGroupMembershipsError: false
    });

    const members = [
      {
        email: 'email@email.com',
        firstName: 'firstName',
        lastName: 'lastName',
        id: '12345'
      },
      {
        email: 'gamer@email.com',
        firstName: 'Gamer',
        lastName: 'GamerLast',
        id: '12346'
      },
      {
        email: 'xxx@email.com',
        firstName: 'xx',
        lastName: 'fffff',
        id: '999999'
      }
    ];

    renderV3(
      <MembersTab
        members={members}
        isLoading={false}
        pageLoading={false}
        addMember={jest.fn()}
        groupId="12345"
        handleRemoveMembers={mockHandleRemoveMembers}
      />
    );
    const button = screen.getByRole('button', { name: /toggle edit/i });
    fireEvent.click(button);

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[1]);
    fireEvent.click(checkboxes[2]);
    expect(screen.queryAllByRole('checkbox').length).toBe(3);
    fireEvent.click(screen.getByText('RemoveCohortMemberModalButton'));

    expect(screen.queryAllByRole('checkbox').length).toBe(0);
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
  });
});
