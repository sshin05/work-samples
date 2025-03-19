import { BannerPreview } from './BannerPreview';
import { fireEvent, renderV3, screen } from '@@/test-utils';

jest.mock('@digital-u/digital-ui', () => ({
  ...jest.requireActual('@digital-u/digital-ui'),
  Text: ({ children }) => <span>{children}</span>,
  Flex: ({ children }) => <div>{children}</div>,
  Button: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  )
}));

jest.mock('@cerberus/react', () => ({
  ConfirmModal: ({ children }) => <div>{children}</div>,
  NotificationCenter: ({ children }) => <div>{children}</div>
}));

jest.mock('@/components_new/modals/ConfirmActionModal', () => ({
  ConfirmActionModal: ({ handleSubmit }) => (
    <button onClick={handleSubmit}>Remove</button>
  )
}));

jest.mock('@/components/settings-banner/banner-card/BannerCard', () => ({
  __esModule: true,
  default: () => <div>Banner Card</div>
}));

const mockHandleEdit = jest.fn();
const mockHandleRemoveBanner = jest.fn();

describe('banner-form', () => {
  beforeEach(() => jest.clearAllMocks());
  it('should render a banner card', () => {
    renderV3(
      <BannerPreview
        content={jest.fn()}
        contentLoading={jest.fn()}
        handleRemoveBanner={mockHandleRemoveBanner}
        deleteBannerLoading={jest.fn()}
        handleEdit={mockHandleEdit}
      />
    );
    expect(
      screen.getByText(
        'The following banner is live on the Command Center for all learners.'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('Banner Card')).toBeInTheDocument();
    expect(screen.getByText('Remove')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });
  it('should add an image to the form on the image upload modal', () => {
    renderV3(
      <BannerPreview
        content={jest.fn()}
        contentLoading={jest.fn()}
        handleRemoveBanner={mockHandleRemoveBanner}
        deleteBannerLoading={jest.fn()}
        handleEdit={mockHandleEdit}
      />
    );
    fireEvent.click(screen.getByText('Remove'));
    expect(mockHandleRemoveBanner).toHaveBeenCalled();
  });
  it('should show correct count when allfields is populated', () => {
    renderV3(
      <BannerPreview
        content={jest.fn()}
        contentLoading={jest.fn()}
        handleRemoveBanner={mockHandleRemoveBanner}
        deleteBannerLoading={jest.fn()}
        handleEdit={mockHandleEdit}
      />
    );

    fireEvent.click(screen.getByText('Edit'));
    expect(mockHandleEdit).toHaveBeenCalled();
  });
});
