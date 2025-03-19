import { render } from '@@/test-utils';
import { useTrainingPlanPage } from '../../../../src/components/manage-mission-partners/custom-training/useTrainingPlanPage';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';

const TestComponent = args => {
  useTrainingPlanPage({ ...args });

  return <div />;
};

describe('useTrainingPlanPage', () => {
  const mockReset = jest.fn();
  const mockPush = jest.fn();

  const mockFm = {
    title: 'title',
    unsequenced: false,
    missionPartnerId: 1,
    conditions: {
      all: []
    },
    content: {
      summary: 'summary',
      description: ['description'],
      about: {
        title: 'about-title',
        description: ['about-description']
      }
    }
  };

  const props = {
    forceMultiplierById: mockFm,
    forceMultiplierByIdLoading: false,
    fmMissionPartner: {
      name: 'mp-name'
    },
    isAcceptedType: true,
    missionPartnerMinDetails: {
      id: 1,
      name: 'mp-name'
    },
    missionPartnerLoading: false,
    missionPartnerId: 1,
    router: {
      push: mockPush
    },
    type: 'fm',
    reset: mockReset,
    setForceMultiplierItems: jest.fn(),
    setModules: jest.fn(),
    setLibraryItems: jest.fn(),
    setShowErrorModal: jest.fn()
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should call appropriate methods', () => {
    render(<TestComponent {...props} />);

    expect(mockReset).toHaveBeenCalledWith({
      title: 'title',
      summary: 'summary',
      visibility: 'Everyone',
      unsequenced: true,
      missionPartnerId: 1,
      description: 'description',
      aboutTitle: 'about-title',
      aboutDescription: 'about-description'
    });
  });

  it('should redirect if FM does not exist', () => {
    render(<TestComponent {...props} forceMultiplierById={null} />);

    expect(mockPush).toHaveBeenCalledWith(
      getRouteUrl(routeGenerators.CustomTraining({ missionPartnerId: '1' }))
    );
  });

  it('should redirect if type is not accepted', () => {
    render(<TestComponent {...props} isAcceptedType={false} />);

    expect(mockPush).toHaveBeenCalledWith(
      getRouteUrl(routeGenerators.CustomTraining({ missionPartnerId: '1' }))
    );
  });

  it('should redirect if mission partner does not exist', () => {
    render(<TestComponent {...props} missionPartnerMinDetails={null} />);

    expect(mockPush).toHaveBeenCalledWith(getRouteUrl('MissionPartners'));
  });
});
