import { AccessCodeField } from './AccessCodeField';
import { renderV3, fireEvent, screen } from '@@/test-utils';

jest.mock('@/components_new/form', () => ({
  TextInput: ({ value, onClick }) => <div onClick={onClick}>{value}</div>
}));

jest.mock('@cerberus/icons', () => ({
  Copy: () => <div>Copy</div>
}));

describe('PasswordField', () => {
  const mockNotify = jest.fn();

  describe('renders', () => {
    it('should render', async () => {
      renderV3(
        <AccessCodeField
          accessCode={null}
          helpText={null}
          notify={mockNotify}
        />
      );

      expect(screen.getByText('xxxx-xxxx-xxxx')).toBeInTheDocument();
    });
  });

  describe('copy function', () => {
    it('shows success notification when copy button is clicked with access code', () => {
      renderV3(
        <AccessCodeField
          accessCode="abcd-efgh-ijkl"
          helpText={null}
          notify={mockNotify}
        />
      );

      fireEvent.click(screen.getByText('Copy'));

      expect(mockNotify).toHaveBeenCalledWith(
        expect.objectContaining({ heading: 'Success' })
      );
    });

    it('shows error notification when copy button is clicked without access code', () => {
      renderV3(
        <AccessCodeField
          accessCode={null}
          helpText={null}
          notify={mockNotify}
        />
      );

      fireEvent.click(screen.getByText('Copy'));

      expect(mockNotify).toHaveBeenCalledWith(
        expect.objectContaining({ heading: 'Error' })
      );
    });
  });
});
