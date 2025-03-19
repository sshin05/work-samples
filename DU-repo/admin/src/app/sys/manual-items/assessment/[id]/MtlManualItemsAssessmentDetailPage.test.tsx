import ManualAssessmentPage from './page';
import { useGetAssessmentById, useUpdateAssessment } from '@/api/assessment';
import { useFindAllVendors } from '@/api/vendor';
import {
  fireEvent,
  MockedProvider,
  renderV3,
  screen,
  waitFor
} from '@@/test-utils';

jest.mock('@/api/assessment');
jest.mock('@/api/vendor');

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(() => ({ id: 'test-assessment' }))
}));

jest.mock('@cerberus/react', () => ({
  ...jest.requireActual('@cerberus/react'),
  useModal: jest.fn(() => ({
    modalRef: { current: null },
    show: jest.fn(),
    close: jest.fn(),
    isOpen: true
  }))
}));

describe('manual assessment page', () => {
  it('should not render while vendors are loading or if no ID is present', () => {
    (useGetAssessmentById as jest.Mock).mockReturnValue({
      assessmentById: {},
      assessmentByIdLoading: true,
      fetchAssessment: jest.fn().mockResolvedValue({})
    });
    (useFindAllVendors as jest.Mock).mockReturnValue({
      vendors: [],
      vendorsLoading: true
    });
    (useUpdateAssessment as jest.Mock).mockReturnValue({
      updateAssessment: jest.fn().mockResolvedValue({})
    });

    const { container } = renderV3(
      <MockedProvider>
        <ManualAssessmentPage />
      </MockedProvider>
    );

    expect(container.firstChild).toBeNull();
  });

  it('should render assessment details ', async () => {
    (useGetAssessmentById as jest.Mock).mockReturnValue({
      assessmentById: {
        assessmentTitle: 'Assessment Title',
        id: 'test-assessment',
        vendorId: 'test-vendor',
        vendorAssessmentId: 'test-vendor-assessment',
        assessmentUrl: 'https://foobar/',
        assessmentDescription: 'test description'
      },
      assessmentByIdLoading: false,
      fetchAssessment: jest.fn().mockResolvedValue({})
    });
    (useFindAllVendors as jest.Mock).mockReturnValue({
      vendors: [{ id: 'test-vendor', name: 'Test Vendor' }],
      vendorsLoading: false
    });
    (useUpdateAssessment as jest.Mock).mockReturnValue({
      updateAssessment: jest.fn().mockResolvedValue({})
    });

    renderV3(
      <div id="app-root">
        <MockedProvider>
          <ManualAssessmentPage />
        </MockedProvider>
      </div>
    );

    expect(screen.getAllByText('Assessment Title')[1]).toBeInTheDocument();
    expect(screen.getAllByText('Test Vendor')[0]).toBeInTheDocument();
  });

  it('should modify and save assessment details ', async () => {
    const updateAssessmentMockFn = jest.fn().mockResolvedValue(true);

    (useGetAssessmentById as jest.Mock).mockReturnValue({
      assessmentById: {
        assessmentTitle: 'Assessment Title',
        id: 'test-assessment',
        vendorId: 'test-vendor',
        vendorAssessmentId: 'test-vendor-assessment',
        assessmentUrl: 'https://foobar/',
        assessmentDescription: 'test description',
        durationInMinutes: 10
      },
      assessmentByIdLoading: false,
      fetchAssessment: jest.fn().mockResolvedValue({})
    });
    (useFindAllVendors as jest.Mock).mockReturnValue({
      vendors: [{ id: 'test-vendor', name: 'Test Vendor' }],
      vendorsLoading: false
    });
    (useUpdateAssessment as jest.Mock).mockReturnValue({
      updateAssessment: updateAssessmentMockFn
    });

    renderV3(
      <div id="app-root">
        <MockedProvider>
          <ManualAssessmentPage />
        </MockedProvider>
      </div>
    );

    // Let the form reset
    fireEvent.click(screen.getByText('Manage'));
    fireEvent.change(screen.getByLabelText('Title*'), {
      target: { value: 'Assessment Title New Title' }
    });
    fireEvent.change(screen.getByLabelText('Vendor*'), {
      target: { value: 'test-vendor' }
    });
    fireEvent.click(screen.getAllByText('Save')[0]);

    await waitFor(() =>
      expect(updateAssessmentMockFn).toHaveBeenCalledWith({
        id: 'test-assessment',
        vendorId: 'test-vendor',
        vendorAssessmentId: 'test-vendor-assessment',
        vendorName: 'Test Vendor',
        assessmentDescription: 'test description',
        assessmentUrl: 'https://foobar/',
        assessmentTitle: 'Assessment Title New Title',
        source: 'admin-managed',
        durationInMinutes: 10
      })
    );
  });
});
