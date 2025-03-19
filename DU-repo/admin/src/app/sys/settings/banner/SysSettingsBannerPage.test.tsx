import { ApolloProvider } from '@apollo/client';
import { createMockClient } from 'mock-apollo-client';
import { useSession } from 'next-auth/react';
import { useUpdateBanner, useDeleteBanner, useContent } from '@/api/content';
import BannerEditor from './page';
import { fireEvent, renderV3, screen, waitFor } from '@@/test-utils';

const mockSetToast = jest.fn();

jest.mock('next-auth/react');
jest.mock('@/api/content');
jest.mock('@/api/user');
jest.mock('@digital-u/digital-ui', () => ({
  ...jest.requireActual('@digital-u/digital-ui'),
  useToast: jest.fn(() => [jest.fn(), mockSetToast]),
  Text: ({ children }) => <span>{children}</span>,
  Flex: ({ children }) => <div>{children}</div>,
  Page: ({ children }) => <div>{children}</div>,
  Button: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  BreadCrumbs: () => <div>Breadcrumbs</div>
}));

jest.mock('@cerberus/react', () => ({
  useConfirmModal: jest.fn(() => ({
    show: jest.fn().mockReturnValue(true)
  })),
  ConfirmModal: ({ children }) => <div>{children}</div>,
  NotificationCenter: ({ children }) => <div>{children}</div>
}));

jest.mock('@/components_new/modals/ConfirmActionModal', () => ({
  ConfirmActionModal: ({ handleSubmit }) => (
    <button onClick={handleSubmit}>Publish</button>
  )
}));

jest.mock('@/components_new/loaders', () => {
  const BaseSkeleton = () => <div>skeleton</div>;
  BaseSkeleton.displayName = 'BaseSkeleton';
  return BaseSkeleton;
});

jest.mock(
  '../../../../components/settings-banner/banner-card/BannerCard',
  () => {
    const BannerCard = () => <div>Banner Card</div>;
    BannerCard.displayName = 'BannerCard';
    return BannerCard;
  }
);

jest.mock('../../../../components/settings-banner/BannerForm', () => {
  const BannerForm = () => <div>Form</div>;
  BannerForm.displayName = 'BannerForm';
  return BannerForm;
});

jest.mock('./components/BannerPreview', () => ({
  BannerPreview: ({ handleRemoveBanner, handleEdit }) => (
    <>
      <span>Preview</span>
      <button onClick={handleRemoveBanner}>Remove</button>
      <button onClick={handleEdit}>Edit</button>
    </>
  )
}));

describe('Banner Settings Page', () => {
  const mockSession = {
    expires: '1',
    user: { email: 'foo@bar.com', name: 'foo bar', roles: ['admin'] }
  };
  const mockClient = createMockClient();
  window.URL.createObjectURL = jest.fn();
  const mockUpdateBanner = jest.fn();
  const mockDeleteBanner = jest.fn();
  const mockRefetchContent = jest.fn();

  (useSession as jest.Mock).mockReturnValue({ data: mockSession });

  (useUpdateBanner as jest.Mock).mockReturnValue({
    updateBanner: mockUpdateBanner,
    content: {},
    updateBannerLoading: false,
    updateBannerError: false
  });

  (useDeleteBanner as jest.Mock).mockReturnValue({
    deleteBanner: mockDeleteBanner,
    deleteBannerLoading: false,
    deleteBannerError: false,
    deleteBannerData: {}
  });

  (useContent as jest.Mock).mockReturnValue({
    contentLoading: false,
    contentError: false,
    content: {
      title: 'Banner Title',
      body: 'Body Text',
      buttonText: 'Button Text',
      buttonLink: 'https://digitalu.af.mil',
      logo: '/assets/filename'
    },
    refetchContent: mockRefetchContent
  });

  afterEach(() => jest.clearAllMocks());

  it('should render the banner preview page', async () => {
    renderV3(
      <ApolloProvider client={mockClient}>
        <BannerEditor />
      </ApolloProvider>
    );
    expect(screen.getAllByText('Banner')[1]).toBeInTheDocument();
    expect(screen.getByText('Remove')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('should render the banner edit page', async () => {
    (useContent as jest.Mock).mockReturnValueOnce({
      contentLoading: false,
      contentError: false,
      content: {},
      refetchContent: mockRefetchContent
    });
    renderV3(
      <ApolloProvider client={mockClient}>
        <BannerEditor />
      </ApolloProvider>
    );
    expect(screen.getByText('Form')).toBeInTheDocument();
    expect(screen.getByText('Publish')).toBeInTheDocument();
  });

  it('should publish the form', async () => {
    renderV3(
      <ApolloProvider client={mockClient}>
        <BannerEditor />
      </ApolloProvider>
    );
    fireEvent.click(screen.getByText('Edit'));
    fireEvent.click(screen.getByText('Publish'));
    await waitFor(() => {
      expect(mockUpdateBanner).toHaveBeenCalledWith(
        'Banner Title',
        'Body Text',
        'Button Text',
        'https://digitalu.af.mil',
        '/assets/filename'
      );
    });
  });

  it('should replace insecure link with https', async () => {
    (useContent as jest.Mock).mockReturnValueOnce({
      contentLoading: false,
      contentError: false,
      content: {
        title: 'Banner Title',
        body: 'Body Text',
        buttonText: 'Button Text',
        buttonLink: 'digitalu.af.mil',
        logo: '/assets/filename'
      },
      refetchContent: mockRefetchContent
    });
    renderV3(
      <ApolloProvider client={mockClient}>
        <BannerEditor />
      </ApolloProvider>
    );
    fireEvent.click(screen.getByText('Edit'));
    fireEvent.click(screen.getByText('Publish'));
    await waitFor(() => {
      expect(mockUpdateBanner).toHaveBeenCalledWith(
        'Banner Title',
        'Body Text',
        'Button Text',
        'https://digitalu.af.mil',
        '/assets/filename'
      );
    });
  });

  it('should fill out the form and fail to refetch', async () => {
    mockRefetchContent.mockImplementationOnce(() => {
      throw new Error('error');
    });
    renderV3(
      <ApolloProvider client={mockClient}>
        <BannerEditor />
      </ApolloProvider>
    );
    fireEvent.click(screen.getByText('Edit'));
    fireEvent.click(screen.getByText('Publish'));
    await waitFor(() => {
      expect(mockSetToast).toHaveBeenCalledWith({
        kind: 'error',
        title: 'Failed to refetch Banner content',
        subtitle: 'false'
      });
    });
  });
  it('should fill out the form and fail to publish', async () => {
    mockUpdateBanner.mockImplementationOnce(() => {
      throw new Error('error');
    });
    renderV3(
      <ApolloProvider client={mockClient}>
        <BannerEditor />
      </ApolloProvider>
    );
    fireEvent.click(screen.getByText('Edit'));
    fireEvent.click(screen.getByText('Publish'));
    await waitFor(() => {
      expect(mockSetToast).toHaveBeenCalledWith({
        kind: 'error',
        title: 'Failed to update Banner',
        subtitle: 'Please ensure all fields are filled out properly'
      });
    });
  });

  it('should delete content', async () => {
    (useContent as jest.Mock).mockReturnValue({
      contentLoading: false,
      contentError: false,
      content: {
        title: 'Banner Title',
        body: 'Body Text',
        buttonText: 'Button Text',
        buttonLink: 'https://digitalu.af.mil',
        logo: '/assets/filename'
      },
      refetchContent: mockRefetchContent
    });
    renderV3(
      <ApolloProvider client={mockClient}>
        <BannerEditor />
      </ApolloProvider>
    );
    fireEvent.click(screen.getByText('Remove'));
    await waitFor(() => {
      expect(mockDeleteBanner).toHaveBeenCalled();
    });
  });
  it('should trigger refetch', async () => {
    renderV3(
      <ApolloProvider client={mockClient}>
        <BannerEditor />
      </ApolloProvider>
    );
    fireEvent.click(screen.getByText('Edit'));
    fireEvent.click(screen.getByText('Cancel'));
    await waitFor(() => {
      expect(mockRefetchContent).toHaveBeenCalled();
    });
  });
  it('should fail to refetch content display toast', async () => {
    mockRefetchContent.mockImplementationOnce(() => {
      throw new Error('error');
    });
    renderV3(
      <ApolloProvider client={mockClient}>
        <BannerEditor />
      </ApolloProvider>
    );
    fireEvent.click(screen.getByText('Edit'));
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockSetToast).toHaveBeenCalledWith({
      kind: 'error',
      title: 'Failed to fetch Banner content',
      subtitle: 'false'
    });
  });
  it('should fail to delete content display toast', async () => {
    mockDeleteBanner.mockImplementationOnce(() => {
      throw new Error('error');
    });
    renderV3(
      <ApolloProvider client={mockClient}>
        <BannerEditor />
      </ApolloProvider>
    );
    fireEvent.click(screen.getByText('Remove'));
    expect(mockSetToast).toHaveBeenCalledWith({
      kind: 'error',
      subtitle:
        'Ensure that a banner is currently published or contact support for assistance',
      title: 'Failed to remove Banner'
    });
  });
});
