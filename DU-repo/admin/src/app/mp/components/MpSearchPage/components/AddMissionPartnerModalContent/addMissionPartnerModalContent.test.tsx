import { renderV3, screen, fireEvent, waitFor } from '@@/test-utils';
import { AddMissionPartnerModalContent } from '.';

const mockCreateMissionPartner = jest.fn();
jest.mock('@/api/mission-partner', () => ({
  useCreateMissionPartner: jest.fn(() => ({
    createMissionPartner: mockCreateMissionPartner
  }))
}));

jest.mock('@cerberus/react', () => ({
  NotificationCenter: ({ children }) => <div>{children}</div>,
  Field: ({ children }) => <fieldset>{children}</fieldset>,
  Label: ({ children, htmlFor }) => <label htmlFor={htmlFor}>{children}</label>,
  Button: ({ children, onClick, type, disabled }) => (
    <button type={type} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  ),
  IconButton: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  Option: ({ children, value, selected }) => (
    <option value={value} selected={selected}>
      {children}
    </option>
  )
}));

jest.mock('@/components_new/form', () => ({
  UserSearch: jest.fn(({ setUser, helperText }) => (
    <>
      <button
        onClick={() =>
          setUser({
            newResults: [],
            input: 'foo bar',
            showWarn: true
          })
        }
      >
        User Search with no results
      </button>
      <button
        onClick={() =>
          setUser({
            newResults: [
              {
                id: '1',
                name: 'John Doe',
                email: 'foo@bar.com'
              },
              {
                id: '2',
                name: 'Jane Doe',
                email: 'foo-joe@bar.com'
              }
            ],
            input: 'foo bar',
            showWarn: false
          })
        }
      >
        User Search with multiple results
      </button>
      <button
        onClick={() =>
          setUser({
            newResults: [
              {
                id: '1',
                name: 'John Doe',
                email: 'foo@bar.com'
              }
            ],
            input: 'foo@bar.com',
            showWarn: false
          })
        }
      >
        User Search with one result
      </button>
      <span>{helperText}</span>
    </>
  )),
  TextInput: jest.fn(({ onChange, value }) => (
    <input onChange={onChange} value={value} />
  )),
  FieldSelect: ({ onChange, name }) => (
    <button
      type="button"
      onClick={() =>
        name === 'sectionType'
          ? onChange({ target: { value: 'random-section' } })
          : onChange({ target: { value: 'space-force' } })
      }
    >
      {name === 'sectionType' ? 'Section Select' : 'Space Force Select'}
    </button>
  )
}));

const mockOnClose = jest.fn();
const mockSetNotify = jest.fn();

// TODO: need test coverage for lines 261-294
describe('AddMissionPartnerModalContent', () => {
  beforeEach(() => {
    mockCreateMissionPartner.mockReset();
    mockOnClose.mockReset();
    mockSetNotify.mockReset();
  });

  describe('rendering', () => {
    it('should render', () => {
      renderV3(
        <AddMissionPartnerModalContent
          affiliates={[]}
          sections={[]}
          onClose={mockOnClose}
          setNotify={mockSetNotify}
        />
      );
      expect(screen.getByText('Add a new Mission Partner')).toBeInTheDocument();
    });

    it('should render section select upon choosing space force', async () => {
      renderV3(
        <AddMissionPartnerModalContent
          affiliates={[]}
          sections={[]}
          onClose={mockOnClose}
          setNotify={mockSetNotify}
        />
      );

      expect(screen.getByText('Add a new Mission Partner')).toBeInTheDocument();
      const nameTextInput = screen.getAllByRole('textbox')[0];
      fireEvent.change(nameTextInput, { target: { value: 'Space Force' } });
      fireEvent.click(screen.getByText('Space Force Select'));
      await waitFor(() => {
        expect(screen.getByText('Section Select')).toBeInTheDocument();
      });
    });
  });

  describe('functionality w/ space force option', () => {
    it('should create a new mission partner for space force', async () => {
      mockCreateMissionPartner.mockResolvedValue({
        id: '1',
        name: 'Space Force',
        slug: 'space-force'
      });

      renderV3(
        <AddMissionPartnerModalContent
          affiliates={[]}
          sections={[]}
          onClose={mockOnClose}
          setNotify={mockSetNotify}
        />
      );

      const nameTextInput = screen.getAllByRole('textbox')[0];
      fireEvent.change(nameTextInput, { target: { value: 'Space Force' } });
      fireEvent.click(screen.getByText('Space Force Select'));
      await waitFor(() => {
        expect(screen.getByText('Section Select')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('Section Select'));
      fireEvent.click(screen.getByText('User Search with one result'));
      fireEvent.click(screen.getByText('Add'));

      await waitFor(() => {
        expect(mockCreateMissionPartner).toHaveBeenCalledWith({
          name: 'Space Force',
          sectionType: 'random-section',
          affiliateId: 'space-force',
          portalManagerUserId: '1'
        });
      });
    });
  });

  describe('error states', () => {
    it('should throw an error if the mission partner exists', async () => {
      mockCreateMissionPartner.mockRejectedValue(
        new Error('Mission Partner with name Space Force already exists.')
      );
      renderV3(
        <AddMissionPartnerModalContent
          affiliates={[]}
          sections={[]}
          onClose={mockOnClose}
          setNotify={mockSetNotify}
        />
      );

      const nameTextInput = screen.getAllByRole('textbox')[0];
      fireEvent.change(nameTextInput, { target: { value: 'Space Force' } });
      fireEvent.click(screen.getByText('Space Force Select'));
      await waitFor(() => {
        expect(screen.getByText('Section Select')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('Section Select'));
      fireEvent.click(screen.getByText('User Search with one result'));
      fireEvent.click(screen.getByText('Add'));

      await waitFor(() => {
        expect(mockCreateMissionPartner).toHaveBeenCalledWith({
          name: 'Space Force',
          sectionType: 'random-section',
          affiliateId: 'space-force',
          portalManagerUserId: '1'
        });
      });

      expect(mockSetNotify).toHaveBeenCalledWith({
        palette: 'danger',
        heading: 'Mission Partner Already Exists',
        description: 'Mission Partner with name Space Force already exists.'
      });
    });

    it('should throw an error if the mission partner name has special characters', async () => {
      mockCreateMissionPartner.mockRejectedValue(
        new Error(
          'Mission Partner name can only contain letters, numbers, spaces, parentheses and dashes.'
        )
      );
      renderV3(
        <AddMissionPartnerModalContent
          affiliates={[]}
          sections={[]}
          onClose={mockOnClose}
          setNotify={mockSetNotify}
        />
      );

      const nameTextInput = screen.getAllByRole('textbox')[0];
      fireEvent.change(nameTextInput, { target: { value: 'Space Force !' } });
      fireEvent.click(screen.getByText('Space Force Select'));
      await waitFor(() => {
        expect(screen.getByText('Section Select')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('Section Select'));
      fireEvent.click(screen.getByText('User Search with one result'));
      fireEvent.click(screen.getByText('Add'));

      await waitFor(() => {
        expect(mockCreateMissionPartner).toHaveBeenCalledWith({
          name: 'Space Force !',
          sectionType: 'random-section',
          affiliateId: 'space-force',
          portalManagerUserId: '1'
        });
      });

      expect(mockSetNotify).toHaveBeenCalledWith({
        palette: 'danger',
        heading: 'Invalid Mission Partner Name',
        description:
          'Mission Partner name can only contain letters, numbers, spaces, parentheses and dashes.'
      });
    });

    it('should throw an error if the mission partner name has only parentheses', async () => {
      mockCreateMissionPartner.mockRejectedValue(
        new Error(
          'Mission Partner name must contain at least one letter or number.'
        )
      );
      renderV3(
        <AddMissionPartnerModalContent
          affiliates={[]}
          sections={[]}
          onClose={mockOnClose}
          setNotify={mockSetNotify}
        />
      );

      const nameTextInput = screen.getAllByRole('textbox')[0];
      fireEvent.change(nameTextInput, { target: { value: '()' } });
      fireEvent.click(screen.getByText('Space Force Select'));
      await waitFor(() => {
        expect(screen.getByText('Section Select')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('Section Select'));
      fireEvent.click(screen.getByText('User Search with one result'));
      fireEvent.click(screen.getByText('Add'));

      await waitFor(() => {
        expect(mockCreateMissionPartner).toHaveBeenCalledWith({
          name: '()',
          sectionType: 'random-section',
          affiliateId: 'space-force',
          portalManagerUserId: '1'
        });
      });

      expect(mockSetNotify).toHaveBeenCalledWith({
        palette: 'danger',
        heading: 'Invalid Mission Partner Name',
        description:
          'Mission Partner name must contain at least one letter or number.'
      });
    });
  });
});
