import { fireEvent, renderV3, screen, waitFor } from '@@/test-utils';
import { act } from 'react';
import { useToggleMissionPartnerTrial } from '@/api/mission-partner';
import { MissionPartnerTrial } from './MissionPartnerTrial';

jest.mock('@/api/mission-partner');

const mockNotify = jest.fn();
const mockToggle = jest.fn();
jest.mock('@cerberus/react', () => ({
  useNotificationCenter: jest.fn(() => ({
    notify: mockNotify
  })),
  NotificationCenter: ({ children }) => <div>{children}</div>,
  useToggle: jest.fn(() => ({ checked: '', handleChange: mockToggle })),
  Toggle: ({ children, onChange, ...props }) => (
    <button
      {...props}
      onClick={() => onChange({ target: { checked: !props.checked } })}
    >
      {children}
    </button>
  ),
  Field: ({ children, ...props }) => <div {...props}>{children}</div>,
  Label: ({ children, ...props }) => <div {...props}>{children}</div>,
  Button: ({ children, onClick, ...props }) => (
    <button {...props} onClick={onClick}>
      {children}
    </button>
  ),
  FieldMessage: ({ children, ...props }) => <div {...props}>{children}</div>
}));

jest.mock('@/components_new/form', () => ({
  TextInput: ({ ...props }) => (
    <>
      <div>{props.label}</div>
      <input {...props} />
    </>
  )
}));

const mockDates = {
  validStartDate: '01/01/2050',
  validEndDate: '01/01/2051',
  invalidStartDate: '01/01/2000',
  invalidEndDate: '31/12/2022'
};

describe('MissionPartnerTrial', () => {
  const mockToggleMissionPartnerTrial = jest.fn();

  beforeEach(() => {
    (useToggleMissionPartnerTrial as jest.Mock).mockReturnValue({
      toggleMissionPartnerTrial: mockToggleMissionPartnerTrial
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    renderV3(
      <MissionPartnerTrial
        missionPartner={{ trialEnabled: false }}
        disabled={false}
      />
    );

    expect(screen.getByText('Trial Phase')).toBeInTheDocument();
    expect(
      screen.getByText('Allow Mission partners to try out DU')
    ).toBeInTheDocument();
    expect(screen.queryByText('Start Date')).not.toBeInTheDocument();
    expect(screen.queryByText('End Date')).not.toBeInTheDocument();
    expect(screen.queryByText('Save')).not.toBeInTheDocument();
  });

  it('should handle toggling the switch', async () => {
    renderV3(
      <MissionPartnerTrial
        missionPartner={{ trialEnabled: false }}
        disabled={false}
      />
    );

    const toggle = screen.getByRole('button');

    await waitFor(async () => {
      fireEvent.click(toggle);
    });

    expect(mockToggle).toHaveBeenCalled();
    expect(screen.getByText('Start Date')).toBeInTheDocument();
    expect(screen.getByText('End Date')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('should notify success on save with good dates', async () => {
    renderV3(
      <MissionPartnerTrial
        missionPartner={{ trialEnabled: false }}
        disabled={false}
      />
    );

    const toggle = screen.getByRole('button');

    await waitFor(async () => {
      fireEvent.click(toggle);
    });

    const [startDateInput, endDateInput] = screen.getAllByRole('textbox');

    await waitFor(async () => {
      fireEvent.change(startDateInput, {
        target: { value: mockDates.validStartDate }
      });
      fireEvent.change(endDateInput, {
        target: { value: mockDates.validEndDate }
      });
    });

    const saveButton = screen.getByText('Save');

    mockToggleMissionPartnerTrial.mockResolvedValue(Promise.resolve());

    await waitFor(async () => {
      fireEvent.click(saveButton);
    });

    await waitFor(() =>
      expect(mockNotify).toHaveBeenCalledWith(
        expect.objectContaining({
          heading: 'Success'
        })
      )
    );
  });

  it('should not allow invalid dates', async () => {
    renderV3(
      <MissionPartnerTrial
        missionPartner={{ trialEnabled: false }}
        disabled={false}
      />
    );

    const toggle = screen.getByRole('button');

    await waitFor(async () => {
      fireEvent.click(toggle);
    });

    const [startDateInput, endDateInput] = screen.getAllByRole('textbox');

    await waitFor(async () => {
      fireEvent.change(startDateInput, {
        target: { value: mockDates.invalidStartDate }
      });
      fireEvent.change(endDateInput, {
        target: { value: mockDates.invalidEndDate }
      });
    });

    const saveButton = screen.getByText('Save');

    await act(async () => {
      fireEvent.click(saveButton);
    });

    expect(mockToggleMissionPartnerTrial).not.toHaveBeenCalled();
  });

  it('should notify error for failure', async () => {
    renderV3(
      <MissionPartnerTrial
        missionPartner={{ trialEnabled: false }}
        disabled={false}
      />
    );

    const toggle = screen.getByRole('button');

    await waitFor(async () => {
      fireEvent.click(toggle);
    });

    const [startDateInput, endDateInput] = screen.getAllByRole('textbox');

    await waitFor(async () => {
      fireEvent.change(startDateInput, {
        target: { value: mockDates.validStartDate }
      });
      fireEvent.change(endDateInput, {
        target: { value: mockDates.validEndDate }
      });
    });

    const saveButton = screen.getByText('Save');

    mockToggleMissionPartnerTrial.mockImplementation(() => {
      throw new Error();
    });

    await waitFor(async () => {
      fireEvent.click(saveButton);
    });

    await waitFor(() =>
      expect(mockNotify).toHaveBeenCalledWith(
        expect.objectContaining({
          heading: 'Error'
        })
      )
    );
  });
});
