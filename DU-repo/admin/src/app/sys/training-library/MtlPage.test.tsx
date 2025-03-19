import ManageTrainingLibrary from './page';
import { useFindAllMissionPartnersAdminPortal } from '@/api/mission-partner';
import { useCountUniqueItemsAndVendorsBySource } from '@/api/vendor';
import { MockedProvider, renderV3, screen } from '@@/test-utils';

jest.mock('@/api/mission-partner');
jest.mock('@/api/vendor');

describe('manage training library page', () => {
  beforeEach(() =>
    (useFindAllMissionPartnersAdminPortal as jest.Mock).mockReturnValue({
      missionPartners: [
        {
          id: '1',
          name: 'Mission Partner 1',
          scorms: [{ id: '1', name: 'Scorm 1' }],
          courses: [{ id: '1', name: 'Course 1' }],
          exams: [{ id: '1', name: 'Exam 1' }]
        }
      ]
    })
  );

  afterEach(() => jest.clearAllMocks());

  it('should should render', () => {
    (useCountUniqueItemsAndVendorsBySource as jest.Mock)
      .mockReturnValueOnce({
        totalItems: 101,
        totalVendors: 102
      })
      .mockReturnValueOnce({
        totalItems: 201,
        totalVendors: 202
      });

    renderV3(
      <MockedProvider>
        <ManageTrainingLibrary />
      </MockedProvider>
    );

    expect(screen.getByText('Manage Training Library')).toBeInTheDocument();

    expect(screen.getByText('MANUALLY ADDED ITEMS')).toBeInTheDocument();
    expect(screen.getByText('101')).toBeInTheDocument();
    expect(screen.getByText('102')).toBeInTheDocument();
  });
});
