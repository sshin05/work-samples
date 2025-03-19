import { screen, renderV3 } from '../../../../../../../test-utils';
import { PortalManagersTab } from './PortalManagersTab';
import { useFindRolesByMissionPartnerId } from '@/api/role';

jest.mock('@/api/role');
jest.mock('@cerberus/react', () => ({
  useModal: jest.fn(() => ({
    modalRef: { current: null },
    show: jest.fn(),
    close: jest.fn()
  })),
  trapFocus: jest.fn(),
  NotificationCenter: ({ children }) => <div>{children}</div>,
  Modal: ({ children, ...props }) => <div {...props}>{children}</div>
}));
jest.mock('./components/MissionPartnerUsersTable', () => ({
  MissionPartnerUsersTable: ({ setShowNewPortalManagerModal }) => (
    <>
      <div>Portal Manager Users Table</div>
      <button onClick={() => setShowNewPortalManagerModal(true)}>
        Add Portal Manager
      </button>
    </>
  )
}));
jest.mock('./components/NewPortalManagerModalContent', () => ({
  NewPortalManagerModalContent: () => <div>New Portal Manager Modal</div>
}));

const missionPartner = {
  id: '1234'
};
const myUser = { id: 1 };

describe('<PortalManagersTab />', () => {
  beforeEach(() => {
    (useFindRolesByMissionPartnerId as jest.Mock).mockReturnValue({
      roleUserInfoData: [],
      refetchRoleUserInfo: jest.fn()
    });
  });

  it('should render', () => {
    renderV3(
      <PortalManagersTab
        missionPartner={missionPartner}
        myUser={myUser}
        loading={false}
      />
    );

    expect(screen.getByText('Portal Manager Users Table')).toBeInTheDocument();
  });
});
