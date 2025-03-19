import ManageManualItems from '../../page';
import {
  useCountUniqueItemsAndVendorsBySource,
  useFindAllVendors
} from '@/api/vendor';
import { useFindCoursesBySource } from '@/api/course';
import { useFindAssessmentsBySource } from '@/api/assessment';
import { MockedProvider, renderV3, fireEvent } from '@@/test-utils';

jest.mock('@/api/vendor');
jest.mock('@/api/course');
jest.mock('@/api/assessment');

jest.mock('@cerberus/react', () => ({
  ...jest.requireActual('@cerberus/react'),
  useModal: jest.fn(() => ({
    modalRef: { current: null },
    show: jest.fn(),
    close: jest.fn(),
    isOpen: true
  }))
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() })
}));

jest.mock('@digital-u/digital-ui', () => ({
  ...jest.requireActual('@digital-u/digital-ui'),
  RadioButton: () => <div>Assessment</div>
}));

describe('manual added courses page', () => {
  it('should not render while loading', () => {
    (useFindCoursesBySource as jest.Mock).mockReturnValue({
      coursesBySourceLoading: true,
      total: 1,
      coursesBySource: []
    });
    (useFindAssessmentsBySource as jest.Mock).mockReturnValue({
      assessmentsBySourceLoading: true,
      assessmentsBySource: []
    });
    (useFindAllVendors as jest.Mock).mockReturnValue({
      vendors: [],
      vendorsLoading: true
    });
    (useCountUniqueItemsAndVendorsBySource as jest.Mock).mockReturnValueOnce({
      totalItems: 1,
      totalVendors: 2,
      countUniqueItemsAndVendorsBySourceLoading: true
    });

    const { container } = renderV3(
      <MockedProvider>
        <ManageManualItems />
      </MockedProvider>
    );

    expect(container.firstChild).toBeNull();
  });

  it('should render a table with manual courses', () => {
    (useFindCoursesBySource as jest.Mock).mockReturnValue({
      coursesBySourceLoading: false,
      total: 1,
      coursesBySource: [
        {
          id: 'test-course',
          courseTitle: 'course title',
          vendorCourseId: 'vendor course id',
          vendorName: 'Test Vendor'
        }
      ]
    });
    (useFindAssessmentsBySource as jest.Mock).mockReturnValue({
      assessmentsBySourceLoading: false,
      assessmentsBySource: [
        {
          id: 'test-assessment',
          assessmentTitle: 'assessment title',
          vendorAssessmentId: 'vendor assessment id',
          vendorName: 'Test Vendor'
        }
      ]
    });
    (useFindAllVendors as jest.Mock).mockReturnValue({
      vendors: [{ id: 'test-vendor', name: 'Test Vendor' }],
      vendorsLoading: false
    });
    (useCountUniqueItemsAndVendorsBySource as jest.Mock).mockReturnValueOnce({
      totalItems: 101,
      totalVendors: 102
    });

    const { getByText, getAllByText } = renderV3(
      <div id="app-root">
        <MockedProvider>
          <ManageManualItems />
        </MockedProvider>
      </div>
    );

    expect(getByText('Title')).toBeInTheDocument();
    expect(getByText('Type')).toBeInTheDocument();
    expect(getByText('Vendor ID')).toBeInTheDocument();
    expect(getAllByText('Test Vendor')[0]).toBeInTheDocument();
    expect(getByText('assessment title')).toBeInTheDocument();
    expect(getByText('vendor assessment id')).toBeInTheDocument();
    expect(getAllByText('Test Vendor')[1]).toBeInTheDocument();
  });

  it('should display a modal', async () => {
    (useFindCoursesBySource as jest.Mock).mockReturnValue({
      coursesBySourceLoading: false,
      total: 1,
      coursesBySource: [
        {
          id: 'test-course',
          courseTitle: 'course title',
          vendorCourseId: 'vendor course id',
          vendorName: 'Test Vendor'
        }
      ]
    });
    (useFindAssessmentsBySource as jest.Mock).mockReturnValue({
      assessmentsBySourceLoading: false,
      assessmentsBySource: [
        {
          id: 'test-assessment',
          assessmentTitle: 'assessment title',
          vendorAssessmentId: 'vendor assessment id',
          vendorName: 'Test Vendor'
        }
      ]
    });
    (useFindAllVendors as jest.Mock).mockReturnValue({
      vendors: [{ id: 'test-vendor', name: 'Test Vendor' }],
      vendorsLoading: false
    });
    (useCountUniqueItemsAndVendorsBySource as jest.Mock).mockReturnValueOnce({
      totalItems: 101,
      totalVendors: 102
    });

    const { getByText } = renderV3(
      <div id="app-root">
        <MockedProvider>
          <ManageManualItems />
        </MockedProvider>
      </div>
    );

    fireEvent.click(getByText('New Item'));

    expect(getByText('Add Item')).toBeInTheDocument();
  });
});
