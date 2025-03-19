import AddCoursePage from './page';
import { useFindVendorById } from '@/api/vendor';
import { useCreateAdminManagedCourse } from '@/api/course';
import {
  MockedProvider,
  renderV3,
  screen,
  userEvent,
  fireEvent,
  waitFor
} from '@@/test-utils';

jest.mock('@/api/vendor');
jest.mock('@/api/course');

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  useSearchParams: () => ({
    get: jest.fn(key => {
      if (key === 'title') return 'test-course';
      if (key === 'vendor') return 'test-vendor';
      return null;
    })
  })
}));

describe('add manual course page', () => {
  it('should not render while vendor error', () => {
    (useFindVendorById as jest.Mock).mockReturnValue({
      vendorError: true,
      vendor: {
        id: 'test-vendor',
        name: 'Test Vendor'
      }
    });
    (useCreateAdminManagedCourse as jest.Mock).mockReturnValue({
      createAdminManagedCourse: jest.fn().mockResolvedValue({})
    });

    const { container } = renderV3(
      <MockedProvider>
        <AddCoursePage />
      </MockedProvider>
    );

    expect(container.firstChild).toBeNull();
  });

  it('should render course details ', () => {
    (useFindVendorById as jest.Mock).mockReturnValue({
      vendorError: false,
      vendor: {
        id: 'test-vendor',
        name: 'Test Vendor'
      }
    });
    (useCreateAdminManagedCourse as jest.Mock).mockReturnValue({
      createAdminManagedCourse: jest.fn().mockResolvedValue({})
    });

    renderV3(
      <div id="app-root">
        <MockedProvider>
          <AddCoursePage />
        </MockedProvider>
      </div>
    );
    expect(screen.getByText('test-course')).toBeInTheDocument();
  });

  it('should modify and save course details ', async () => {
    const createAdminManagedCourseMockFn = jest.fn().mockResolvedValue({
      data: {
        createAdminManagedCourse: {
          id: 'test-vendor#test-coursevendor-course-id'
        }
      }
    });

    (useFindVendorById as jest.Mock).mockReturnValue({
      vendorError: false,
      vendor: {
        id: 'test-vendor',
        name: 'Test Vendor'
      }
    });
    (useCreateAdminManagedCourse as jest.Mock).mockReturnValue({
      createAdminManagedCourse: createAdminManagedCourseMockFn
    });

    renderV3(
      <div id="app-root">
        <MockedProvider>
          <AddCoursePage />
        </MockedProvider>
      </div>
    );

    userEvent.type(
      screen.getByLabelText('Vendor Course ID*'),
      'vendor-course-id'
    );
    userEvent.type(screen.getByLabelText('Course URL*'), 'url');
    userEvent.type(screen.getByLabelText('Duration (minutes)*'), '90');
    userEvent.type(
      screen.getByLabelText('Description (500 character limit)*'),
      'description'
    );
    fireEvent.click(screen.getByText('Save'));

    await waitFor(() =>
      expect(createAdminManagedCourseMockFn).toHaveBeenCalledWith({
        vendorId: 'test-vendor',
        vendorCourseId: 'test-coursevendor-course-id',
        courseDescription: 'description',
        courseDuration: 90,
        courseTitle: 'test-course',
        courseUrl: 'url'
      })
    );
  });
});
