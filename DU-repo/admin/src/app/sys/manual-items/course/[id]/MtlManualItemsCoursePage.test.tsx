import { ApolloProvider } from '@apollo/client';
import { createMockClient } from 'mock-apollo-client';
import ManualCoursePage from './page';
import { useFindCourseById, useUpdateAdminManagedCourse } from '@/api/course';
import { useFindAllVendors } from '@/api/vendor';
import { renderV3, screen, userEvent, fireEvent, waitFor } from '@@/test-utils';

jest.mock('@cerberus/react', () => ({
  ...jest.requireActual('@cerberus/react'),
  useModal: jest.fn(() => ({
    modalRef: { current: null },
    show: jest.fn(),
    close: jest.fn(),
    isOpen: true
  })),
  Text: jest.fn(({ children }) => <div>{children}</div>)
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(() => ({ id: 'test-course' }))
}));

jest.mock('@/api/course');
jest.mock('@/api/vendor');

describe('view course page', () => {
  const mockClient = createMockClient();

  const useFindCourseByIdMock = jest.mocked(useFindCourseById);
  const useFindAllVendorsMock = jest.mocked(useFindAllVendors);
  const useUpdateAdminManagedCourseMock = jest.mocked(
    useUpdateAdminManagedCourse
  );

  it('should not render while vendors are loading or if no ID is present', () => {
    useFindCourseByIdMock.mockReturnValue({
      courseById: null,
      courseByIdLoading: true,
      courseByIdError: null,
      fetchCourse: jest.fn().mockResolvedValue({})
    });
    useFindAllVendorsMock.mockReturnValue({
      vendors: [],
      vendorsLoading: true,
      vendorsReady: false,
      vendorsError: null
    });
    useUpdateAdminManagedCourseMock.mockReturnValue({
      updateAdminManagedCourse: jest.fn().mockResolvedValue({}),
      updateAdminManagedCourseError: null,
      updateAdminManagedCourseLoading: false,
      updateAdminManagedCourseData: null
    });

    const { container } = renderV3(
      <ApolloProvider client={mockClient}>
        <ManualCoursePage />
      </ApolloProvider>
    );

    expect(container.firstChild).toBeNull();
  });

  it('should render course details ', () => {
    useFindCourseByIdMock.mockReturnValue({
      fetchCourse: jest.fn().mockResolvedValue({}),
      courseByIdLoading: false,
      courseById: {
        id: 'test-course',
        courseTitle: 'course title',
        vendorCourseId: 'vendor course id',
        vendorName: 'Test Vendor',
        courseDescription: null,
        courseDuration: null,
        courseImage: null,
        dateUpdated: null,
        courseUrl: null,
        vendorId: null,
        source: null
      },
      courseByIdError: null
    });
    useFindAllVendorsMock.mockReturnValue({
      vendors: [{ id: 'test-vendor', name: 'Test Vendor' }],
      vendorsLoading: false,
      vendorsReady: true,
      vendorsError: null
    });
    useUpdateAdminManagedCourseMock.mockReturnValue({
      updateAdminManagedCourse: jest.fn().mockResolvedValue({}),
      updateAdminManagedCourseLoading: false,
      updateAdminManagedCourseError: null,
      updateAdminManagedCourseData: null
    });

    renderV3(
      <div id="app-root">
        <ApolloProvider client={mockClient}>
          <ManualCoursePage />
        </ApolloProvider>
      </div>
    );

    expect(screen.getAllByDisplayValue('course title')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Test Vendor')[0]).toBeInTheDocument();
  });

  it('should modify and save course details ', async () => {
    const updateAdminManagedCourseMockFn = jest.fn().mockResolvedValue(true);

    useFindCourseByIdMock.mockReturnValue({
      fetchCourse: updateAdminManagedCourseMockFn,
      courseByIdLoading: false,
      courseById: {
        id: 'test-course',
        courseTitle: 'course title',
        vendorCourseId: 'vendor course id',
        vendorName: 'Test Vendor',
        courseDescription: 'description',
        courseDuration: 0,
        courseUrl: 'url',
        courseImage: null,
        dateUpdated: null,
        vendorId: null,
        source: null
      },
      courseByIdError: null
    });
    useFindAllVendorsMock.mockReturnValue({
      vendors: [{ id: 'test-vendor', name: 'Test Vendor' }],
      vendorsLoading: false,
      vendorsReady: true,
      vendorsError: null
    });
    useUpdateAdminManagedCourseMock.mockReturnValue({
      updateAdminManagedCourse: updateAdminManagedCourseMockFn,
      updateAdminManagedCourseLoading: false,
      updateAdminManagedCourseError: null,
      updateAdminManagedCourseData: null
    });

    renderV3(
      <div id="app-root">
        <ApolloProvider client={mockClient}>
          <ManualCoursePage />
        </ApolloProvider>
      </div>
    );

    // Let the form reset
    expect(screen.getByLabelText('Title*')).toHaveValue('course title');

    fireEvent.click(screen.getByText('Edit'));
    userEvent.paste(screen.getByLabelText('Title*'), ' New Title');
    userEvent.selectOptions(screen.getByLabelText('Vendor*'), ['test-vendor']);
    fireEvent.click(screen.getAllByText('Save')[0]);

    await waitFor(() => {
      expect(updateAdminManagedCourseMockFn).toHaveBeenCalledWith({
        vendorId: 'test-vendor',
        vendorCourseId: 'vendor course id',
        courseDescription: 'description',
        courseDuration: 0,
        courseTitle: 'course title New Title',
        courseUrl: 'url'
      });
    });
  });
});
