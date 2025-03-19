import AddAssessmentPage from './page';
import { useFindVendorById } from '@/api/vendor';
import { useCreateManualAssessment } from '@/api/assessment';
import {
  MockedProvider,
  renderV3,
  screen,
  userEvent,
  fireEvent,
  waitFor
} from '@@/test-utils';

jest.mock('@/api/vendor');
jest.mock('@/api/assessment');

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  useSearchParams: () => ({
    get: jest.fn(key => {
      if (key === 'title') return 'test assessment';
      if (key === 'vendor') return 'test vendor';
      return null;
    })
  })
}));

describe('add manual assessment page', () => {
  it('should not render while vendor error', () => {
    (useFindVendorById as jest.Mock).mockReturnValue({
      vendorError: true
    });
    (useCreateManualAssessment as jest.Mock).mockReturnValue({
      createManualAssessment: jest.fn().mockResolvedValue({})
    });
    const { container } = renderV3(
      <MockedProvider>
        <AddAssessmentPage />
      </MockedProvider>
    );

    expect(container.firstChild).toBeNull();
  });

  it('should render assessment details ', () => {
    (useFindVendorById as jest.Mock).mockReturnValue({
      vendorError: false,
      vendor: {
        id: 'test-vendor',
        name: 'Test Vendor'
      }
    });
    (useCreateManualAssessment as jest.Mock).mockReturnValue({
      createManualAssessment: jest.fn().mockResolvedValue({})
    });

    renderV3(
      <div id="app-root">
        <MockedProvider>
          <AddAssessmentPage />
        </MockedProvider>
      </div>
    );
    expect(screen.getByText('test assessment')).toBeInTheDocument();
  });

  it('should modify and save assessment details ', async () => {
    const createManualAssessmentMockFn = jest.fn().mockResolvedValue({
      data: {
        createManualAssessment: {
          id: 'test-vendor#test-assessmentvendor-assessemnt-id'
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
    (useCreateManualAssessment as jest.Mock).mockReturnValue({
      createManualAssessment: createManualAssessmentMockFn
    });

    renderV3(
      <div id="app-root">
        <MockedProvider>
          <AddAssessmentPage />
        </MockedProvider>
      </div>
    );

    userEvent.type(
      screen.getByLabelText('Vendor Assessment ID*'),
      'vendor-assessment-id'
    );
    userEvent.type(screen.getByLabelText('Assessment URL*'), 'url');
    userEvent.type(screen.getByLabelText('Duration (minutes)*'), '0');
    userEvent.type(
      screen.getByLabelText('Description (500 character limit)*'),
      'description'
    );
    fireEvent.click(screen.getByText('Save'));
    await waitFor(() =>
      expect(createManualAssessmentMockFn).toHaveBeenCalledWith({
        id: 'test-vendor#test-assessmentvendor-assessment-id',
        vendorId: 'test-vendor',
        vendorAssessmentId: 'test-assessmentvendor-assessment-id',
        vendorName: 'Test Vendor',
        assessmentDescription: 'description',
        assessmentTitle: 'test assessment',
        assessmentUrl: 'url',
        durationInMinutes: 0,
        source: 'admin-managed'
      })
    );
  });
});
