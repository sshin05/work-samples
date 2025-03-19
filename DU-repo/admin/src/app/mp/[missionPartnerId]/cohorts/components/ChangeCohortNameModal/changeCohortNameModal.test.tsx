import { ApolloProvider } from '@apollo/client';
import { createMockClient } from 'mock-apollo-client';
import { renderV3, userEvent, fireEvent, screen } from '@@/test-utils';
import { ChangeCohortNameModal } from './ChangeCohortNameModal';
import { useUpdateGroup } from '@/api/groups';

jest.mock('@/api/groups');

const mockModal = {
  modalRef: { current: null },
  show: jest.fn(),
  close: jest.fn(),
  isOpen: true
};

describe('Change Group Name Modal', () => {
  const mockUpdateGroup = jest.fn();
  const mockOnClose = jest.fn();

  (useUpdateGroup as jest.Mock).mockReturnValue({
    updateGroup: mockUpdateGroup
  });

  let client;
  beforeAll(() => {
    client = createMockClient();
  });

  it('should render the change group name modal', () => {
    renderV3(<div id="app-root">App Root</div>);
    renderV3(
      <ApolloProvider client={client}>
        <ChangeCohortNameModal
          changeCohortNameModal={mockModal}
          title="Title"
          group={{ name: 'test' }}
          onClose={mockOnClose}
        />
      </ApolloProvider>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('enables the save button when input changes', () => {
    const group = {
      id: '1',
      name: 'OldGroupName',
      missionPartnerId: '123'
    };
    renderV3(<div id="app-root">App Root</div>);
    renderV3(
      <ApolloProvider client={client}>
        <ChangeCohortNameModal
          changeCohortNameModal={mockModal}
          title="Change Group Name"
          onClose={mockOnClose}
          group={group}
        />
      </ApolloProvider>
    );

    const input = screen.getByPlaceholderText('Enter a new group name');

    fireEvent.change(input, { target: { value: 'NewGroupName' } });

    const saveButton = screen.getByText('Save');
    expect(saveButton).not.toBeDisabled();
    fireEvent.click(saveButton);
    expect(mockUpdateGroup).toHaveBeenCalledWith('1', 'NewGroupName', '123');
  });

  it('saves with enter key', () => {
    const group = {
      id: '1',
      name: 'OldGroupName',
      missionPartnerId: '123'
    };
    renderV3(<div id="app-root">App Root</div>);
    renderV3(
      <ApolloProvider client={client}>
        <ChangeCohortNameModal
          changeCohortNameModal={mockModal}
          title="Change Group Name"
          onClose={mockOnClose}
          group={group}
        />
      </ApolloProvider>
    );

    const input = screen.getByPlaceholderText('Enter a new group name');

    fireEvent.change(input, { target: { value: 'NewGroupName' } });
    userEvent.type(input, '{enter}');
    expect(mockUpdateGroup).toHaveBeenCalledWith('1', 'NewGroupName', '123');
  });

  it('enables the save button then disables it', () => {
    const group = {
      id: '1',
      name: 'OldGroupName',
      missionPartnerId: '123'
    };
    renderV3(<div id="app-root">App Root</div>);
    renderV3(
      <ApolloProvider client={client}>
        <ChangeCohortNameModal
          changeCohortNameModal={mockModal}
          title="Change Group Name"
          onClose={mockOnClose}
          group={group}
        />
      </ApolloProvider>
    );

    const input = screen.getByPlaceholderText('Enter a new group name');

    fireEvent.change(input, { target: { value: 'NewGroupName' } });

    const saveButton = screen.getByText('Save');
    expect(saveButton).not.toBeDisabled();
    fireEvent.change(input, { target: { value: '' } });
    expect(saveButton).toBeDisabled();
  });

  it('cancels modal on Cancel button click', () => {
    const group = { id: '1', name: 'Group1', missionPartnerId: '123' };
    renderV3(<div id="app-root">App Root</div>);
    renderV3(
      <ApolloProvider client={client}>
        <ChangeCohortNameModal
          changeCohortNameModal={mockModal}
          title="Change Group Name"
          onClose={mockOnClose}
          group={group}
        />
      </ApolloProvider>
    );

    const cancelButton = screen.getByText(/Cancel/i);

    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
