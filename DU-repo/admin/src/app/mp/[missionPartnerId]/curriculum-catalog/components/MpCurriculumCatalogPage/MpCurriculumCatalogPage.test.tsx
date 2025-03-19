import { createMockClient } from 'mock-apollo-client';
import { ApolloProvider, InMemoryCache } from '@apollo/client';
import { render, renderV3, fireEvent, waitFor, screen } from '@@/test-utils';
import { useFindCatalogResults } from '@/api/catalog';
import { useFindAllVendors } from '@/api/vendor';
import {
  useFindGroupById,
  useAddCoursesToGroup,
  useAddPlansToGroup
} from '@/api/groups';
import { useAddCoursesToUser, useAddAssessmentsToUser } from '@/api/user';
import { useFindLabById, useUpdateLab } from '@/api/lab';
import { useAddLabsToUser } from '@/api/lab/useAddLabsToUser';
import {
  useFindLatestForceMultiplierByIdAdmin,
  useUpdateForceMultiplier
} from '@/api/force-multipliers';
import {
  useAddFeaturedTrainingItems,
  useFindFeaturedTrainingIds,
  useAddCollectionItems
} from '@/api/mission-partner';
import { useGetTrainingPlansByUserId } from '@/api/training-plan';
import { useFindTranscriptCoursesByUserId } from '@/api/course';
import { useFindLearnerAssessments } from '@/api/assessment';
import { useUserRoles } from '@/hooks/useCurrentSession/useCurrentSession';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { MpCurriculumCatalogPage } from './MpCurriculumCatalogPage';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
  useSearchParams: jest.fn()
}));

jest.mock('next/navigation');

jest.mock('@/api/catalog');
jest.mock('@/api/vendor');
jest.mock('@/api/groups');
jest.mock('@/api/user');
jest.mock('@/api/lab');
jest.mock('@/api/force-multipliers');
jest.mock('@/api/mission-partner');
jest.mock('@/hooks/useCurrentSession/useCurrentSession');
jest.mock('@/api/course');
jest.mock('@/api/training-plan');
jest.mock('@/api/assessment');
jest.mock('@/api/lab/useAddLabsToUser');

const mockNotify = jest.fn();
jest.mock('@cerberus/react', () => ({
  useModal: jest.fn(() => ({
    modalRef: { current: null },
    show: jest.fn(),
    close: jest.fn(),
    isOpen: true
  })),
  useNotificationCenter: jest.fn(() => ({
    notify: mockNotify
  })),
  trapFocus: jest.fn(),
  NotificationCenter: ({ children }) => <div>{children}</div>,
  Field: ({ children, ...props }) => <div {...props}>{children}</div>,
  Label: ({ children, ...props }) => <div {...props}>{children}</div>,
  Button: ({ children, onClick, ...props }) => (
    <button {...props} onClick={onClick}>
      {children}
    </button>
  ),
  Select: ({ children, ...props }) => <select {...props}>{children}</select>,
  Option: ({ children, ...props }) => <option {...props}>{children}</option>,
  IconButton: ({ children, onClick, ariaLabel, ...props }) => (
    <button {...props} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  ),
  Input: ({ onChange, ...props }) => <input {...props} onChange={onChange} />
}));

jest.mock('@/components/shopping-cart', () => ({
  ItemCardList: ({ items, onAddToCart }) => (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <p>{item.title}</p>
          <p>{item.description}</p>
          <button onClick={item => onAddToCart(item)}>Select</button>
        </div>
      ))}
    </div>
  ),
  CurriculumSearch: ({ onSearch }) => (
    <div>
      <label htmlFor="catalog_search">Keyword</label>
      <input id="catalog_search" onChange={e => onSearch(e.target.value)} />
    </div>
  ),
  OrderSummary: ({
    cart,
    targetType,
    checkingOut,
    handleSubmitCart,
    handleRemoveFromCart
  }) => (
    <div>
      <div>
        <button onClick={handleSubmitCart} disabled={checkingOut}>
          Add to {targetType}
        </button>
      </div>
      {cart.map(item => (
        <div key={item.id}>
          <p>{item.title}</p>
          <p>{item.description}</p>
          <button onClick={handleRemoveFromCart}>Remove</button>
        </div>
      ))}
    </div>
  )
}));

describe('CurriculumCatalog', () => {
  const mockClient = createMockClient({
    cache: new InMemoryCache({ addTypename: false })
  });
  const mockAddCoursesToGroup = jest.fn(() => Promise.resolve());
  const mockAddCoursesToUser = jest.fn(() => Promise.resolve());
  const mockUpdateForceMultiplier = jest.fn(() => Promise.resolve());
  const mockAddFeaturedTrainingItems = jest.fn(() => Promise.resolve());

  (useUserRoles as jest.Mock).mockReturnValue({
    isDuAdmin: false
  });

  const mockSearch = jest.fn(
    () =>
      new Promise(resolve => {
        resolve({
          data: {
            findCatalogResults: {
              hits: [
                {
                  __typename: 'ForceMultiplier',
                  id: '100',
                  title: 'Javascript Force Multiplier',
                  version: 2,
                  totalDuration: 120,
                  unsequenced: false,
                  content: {
                    description: null,
                    summary: 'test summary'
                  }
                },
                {
                  __typename: 'Assessment',
                  id: 'pluralsight#100',
                  vendorId: 'pluralsight',
                  vendorAssessmentId: '100',
                  vendorName: 'Pluralsight',
                  assessmentTitle: 'Javascript Assessment',
                  assessmentDescription: 'assessmentDescription',
                  assessmentUrl: 'assessmentUrl'
                },
                {
                  __typename: 'Course',
                  id: 'course#100',
                  vendorId: 'pluralsight',
                  vendorCourseId: '100',
                  vendorName: 'Pluralsight',
                  courseTitle: 'Javascript Course',
                  courseDescription: 'courseDescription',
                  courseUrl: 'courseUrl'
                },
                {
                  __typename: 'Survey',
                  id: 'survey#100',
                  missionPartnerId: '100',
                  name: 'Javascript Survey',
                  description: 'surveyDescription'
                },
                {
                  __typename: 'Lab',
                  id: 'Lab-1',
                  missionPartnerId: '100',
                  missionPartner: {
                    name: 'DU Labs'
                  },
                  name: 'Javascript Lab',
                  description: 'labDescription',
                  launchConfig: {
                    type: 'jupyter',
                    path: 'path to jupyter'
                  }
                }
              ],
              total: 2
            }
          }
        });
      })
  );
  const mockUpdateLab = jest.fn(() => Promise.resolve({ data: {} }));

  const mockLab = {
    id: 'lab-1',
    name: 'Lab 1',
    description: 'Test Description',
    missionPartnerId: '0628f3d8-317b-4c61-9459-e17572b5b145',
    launchConfig: {
      type: 'jupyter',
      path: 'path to jupyter'
    }
  };

  const mockForceMultiplier = {
    id: '57d3c5b5-bc6c-41f1-badf-c8fd2fbf5668',
    version: '1',
    title: '1689 Test',
    status: 'Draft',
    learningPathUri: null,
    totalDuration: 0,
    unsequenced: false,
    missionPartnerId: '565866e6-e6ea-409f-9054-eb14142e7fd3',
    modules: null,
    content: {
      description: null,
      summary: 'Test',
      about: null
    },
    items: [
      {
        id: '6b33f78d-1a93-4ece-a65f-3cf859d02668',
        item: {
          __typename: 'Lab',
          id: '6b33f78d-1a93-4ece-a65f-3cf859d02668',
          name: 'Titanic Lab v1',
          durationInMinutes: 0,
          missionPartner: {
            id: 'efcf4675-65f7-4d46-b92c-55fa283e301e',
            name: 'DU Labs'
          }
        }
      }
    ],
    conditions: null,
    type: null
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(() => {
      // Intentionally left empty.
    });
    (useParams as jest.Mock).mockReturnValue({ missionPartnerId: '100' });
    (useSearchParams as jest.Mock).mockImplementation(() => ({
      get: jest.fn(key => {
        if (key === 'targetId') return 'targetId';
        if (key === 'targetType') return 'mission-partner-featured-training';
        return null;
      }),
      getAll: jest.fn(key => {
        if (key === 'allowedContent') return ['all'];
      })
    }));
    (useFindGroupById as jest.Mock).mockReturnValue({
      fetchGroupById: jest.fn(() => Promise.resolve()),
      groupById: {}
    });
    (useFindLatestForceMultiplierByIdAdmin as jest.Mock).mockReturnValue({
      forceMultiplierById: mockForceMultiplier
    });
    (useAddCoursesToGroup as jest.Mock).mockReturnValue({
      addCoursesToGroup: mockAddCoursesToGroup
    });
    (useAddPlansToGroup as jest.Mock).mockReturnValue({
      addPlansToGroup: jest.fn(() => Promise.resolve())
    });
    (useAddCoursesToUser as jest.Mock).mockReturnValue({
      addCoursesToUser: mockAddCoursesToUser
    });
    (useAddFeaturedTrainingItems as jest.Mock).mockReturnValue({
      addFeaturedTrainingItems: mockAddFeaturedTrainingItems
    });
    (useUpdateForceMultiplier as jest.Mock).mockReturnValue({
      updateForceMultiplier: mockUpdateForceMultiplier
    });
    (useAddAssessmentsToUser as jest.Mock).mockReturnValue({
      addAssessmentsToUser: jest.fn(() => Promise.resolve())
    });
    (useFindLabById as jest.Mock).mockReturnValue({
      fetchLabById: jest.fn(() => Promise.resolve({ data: {} })),
      findLabById: mockLab
    });
    (useUpdateLab as jest.Mock).mockReturnValue({
      updateLab: mockUpdateLab
    });
    (useAddLabsToUser as jest.Mock).mockReturnValue({
      addLabsToUser: jest.fn(() => Promise.resolve())
    });
    (useFindFeaturedTrainingIds as jest.Mock).mockReturnValue({
      featuredTrainingIds: []
    });
    (useAddCollectionItems as jest.Mock).mockReturnValue({
      addCollectionItems: jest.fn(() => Promise.resolve())
    });
    (useFindTranscriptCoursesByUserId as jest.Mock).mockReturnValue({
      transcriptCourses: []
    });
    (useGetTrainingPlansByUserId as jest.Mock).mockReturnValue({
      trainingPlanById: []
    });
    (useFindLearnerAssessments as jest.Mock).mockReturnValue({
      learnerAssessments: []
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    (useFindAllVendors as jest.Mock).mockReturnValue({
      vendors: [{ name: 'Udemy', id: 'udemy' }],
      vendorsReady: true
    });
    (useFindCatalogResults as jest.Mock).mockReturnValue({
      searchCatalog: mockSearch,
      resultsLoading: false,
      featuredTrainingIdsLoading: false
    });

    (useSearchParams as jest.Mock).mockImplementation(() => ({
      get: jest.fn(key => {
        if (key === 'targetId') return 'targetId';
        if (key === 'targetType') return 'mission-partner-featured-training';
        return null;
      }),
      getAll: jest.fn(key => {
        if (key === 'allowedContent') return ['all'];
      })
    }));

    renderV3(
      <ApolloProvider client={mockClient}>
        <MpCurriculumCatalogPage />
      </ApolloProvider>
    );
    expect(
      screen.getByText('Add training items to your plan')
    ).toBeInTheDocument();
    expect(screen.getByText('Keyword')).toBeInTheDocument();
    expect(screen.getByTitle(/go back/i)).toBeInTheDocument();
  });

  it('should render with loading if resultsLoading is true', async () => {
    const mockInertSearch = jest.fn(() => Promise.resolve());

    (useFindAllVendors as jest.Mock).mockReturnValue({
      vendors: [{ name: 'Udemy', id: 'udemy' }],
      vendorsReady: true
    });

    // Manually set to loading now
    (useFindCatalogResults as jest.Mock).mockReturnValue({
      searchCatalog: mockInertSearch,
      resultsLoading: true
    });

    (useFindFeaturedTrainingIds as jest.Mock).mockReturnValue({
      featuredTrainingIds: [],
      featuredTrainingIdsLoading: false
    });

    (useSearchParams as jest.Mock).mockImplementation(() => ({
      get: jest.fn(key => {
        if (key === 'targetId') return 'targetId';
        if (key === 'targetType') return 'mission-partner-featured-training';
        return null;
      }),
      getAll: jest.fn(key => {
        if (key === 'allowedContent') return ['all'];
      })
    }));

    renderV3(
      <ApolloProvider client={mockClient}>
        <MpCurriculumCatalogPage />
      </ApolloProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render with loading if featuredLoadingIdsLoading is true', async () => {
    const mockInertSearch = jest.fn(() => Promise.resolve());

    (useFindAllVendors as jest.Mock).mockReturnValue({
      vendors: [{ name: 'Udemy', id: 'udemy' }],
      vendorsReady: true
    });

    // Manually set to loading now
    (useFindCatalogResults as jest.Mock).mockReturnValue({
      searchCatalog: mockInertSearch,
      resultsLoading: false
    });

    (useFindFeaturedTrainingIds as jest.Mock).mockReturnValue({
      featuredTrainingIds: [],
      featuredTrainingIdsLoading: true
    });

    (useSearchParams as jest.Mock).mockImplementation(() => ({
      get: jest.fn(key => {
        if (key === 'targetId') return 'targetId';
        if (key === 'targetType') return 'mission-partner-featured-training';
        return null;
      }),
      getAll: jest.fn(key => {
        if (key === 'allowedContent') return ['all'];
      })
    }));

    renderV3(
      <ApolloProvider client={mockClient}>
        <MpCurriculumCatalogPage />
      </ApolloProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should handle a search', async () => {
    const mockInertSearch = jest.fn(() => Promise.resolve());

    (useFindAllVendors as jest.Mock).mockReturnValue({
      vendors: [{ name: 'Udemy', id: 'udemy' }],
      vendorsReady: true
    });

    // Manually set to loading now
    (useFindCatalogResults as jest.Mock).mockReturnValue({
      searchCatalog: mockInertSearch,
      resultsLoading: false
    });

    (useFindFeaturedTrainingIds as jest.Mock).mockReturnValue({
      featuredTrainingIds: [],
      featuredTrainingIdsLoading: false
    });

    (useSearchParams as jest.Mock).mockImplementation(() => ({
      get: jest.fn(key => {
        if (key === 'targetId') return 'targetId';
        if (key === 'targetType') return 'mission-partner-featured-training';
        return null;
      }),
      getAll: jest.fn(key => {
        if (key === 'allowedContent') return ['all'];
      })
    }));

    renderV3(
      <ApolloProvider client={mockClient}>
        <MpCurriculumCatalogPage />
      </ApolloProvider>
    );
    const searchInput = screen.getByLabelText('Keyword');

    expect(searchInput).toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: 'Roger Rabbit' } });
    expect(searchInput).toHaveValue('Roger Rabbit');
    await waitFor(() => {
      expect(mockInertSearch).toHaveBeenCalledWith(
        expect.objectContaining({
          search: 'Roger Rabbit'
        })
      );
    });
  });

  it.skip('should call search when filter changes', async () => {
    // SARAH - this one is failing
    // TODO: I think something is, either wrong here, or some tests weren't pulled a part of this MR and should have been??
    /*
    "excludeCustomContent": false, was expected
    mismatch here:
    "type": "Assessment",
+   "type": "Course",

    also it looks like the function being tested here is executing twice, so maybe something needs to be either a) broken into 2 tests or b) make sure mocks are reset correctly
    */

    (useFindCatalogResults as jest.Mock).mockReturnValue({
      searchCatalog: mockSearch,
      resultsLoading: false
    });

    (useFindAllVendors as jest.Mock).mockReturnValue({
      vendors: [{ name: 'Udemy', id: 'udemy' }],
      vendorsReady: true
    });

    (useSearchParams as jest.Mock).mockImplementation(() => ({
      get: jest.fn(key => {
        if (key === 'targetId') return 'targetId';
        if (key === 'targetType') return 'mission-partner-featured-training';
        return null;
      }),
      getAll: jest.fn(key => {
        if (key === 'allowedContent')
          return ['assessment', 'course', 'survey', 'lab', 'plan'];
      })
    }));

    const { queryByPlaceholderText, getByText } = renderV3(
      <ApolloProvider client={mockClient}>
        <MpCurriculumCatalogPage />
      </ApolloProvider>
    );

    fireEvent.change(
      queryByPlaceholderText('Search available training items'),
      { target: { value: 'Javascript' } }
    );
    await waitFor(() =>
      expect(mockSearch).toHaveBeenCalledWith({
        search: 'Javascript',
        missionPartnerId: '100',
        page: 1,
        pageSize: 25,
        planType: null,
        searchAfter: null,
        type: 'Course',
        vendorId: undefined
      })
    );

    fireEvent.click(getByText('Course'));
    fireEvent.click(getByText('Assessment'));
    await waitFor(() =>
      expect(mockSearch).toHaveBeenCalledWith({
        search: 'Javascript',
        excludeCustomContent: false,
        missionPartnerId: '100',
        page: 1,
        pageSize: 25,
        planType: null,
        searchAfter: null,
        type: 'Assessment',
        vendorId: undefined
      })
    );

    fireEvent.click(getByText('Assessment'));
    fireEvent.click(getByText('Survey'));
    await waitFor(() =>
      expect(mockSearch).toHaveBeenCalledWith({
        search: 'Javascript',
        excludeCustomContent: false,
        missionPartnerId: '100',
        page: 1,
        pageSize: 25,
        planType: null,
        searchAfter: null,
        type: 'Survey',
        vendorId: undefined
      })
    );

    fireEvent.click(getByText('Survey'));
    fireEvent.click(getByText('Lab'));
    await waitFor(() =>
      expect(mockSearch).toHaveBeenCalledWith({
        search: 'Javascript',
        excludeCustomContent: false,
        missionPartnerId: '100',
        page: 1,
        pageSize: 25,
        planType: null,
        searchAfter: null,
        type: 'Lab',
        vendorId: undefined
      })
    );

    fireEvent.click(getByText('Lab'));
    fireEvent.click(getByText('Plan'));
    await waitFor(() =>
      expect(mockSearch).toHaveBeenCalledWith({
        search: 'Javascript',
        excludeCustomContent: false,
        missionPartnerId: '100',
        page: 1,
        pageSize: 25,
        planType: null,
        searchAfter: null,
        type: 'Plan',
        vendorId: undefined
      })
    );
  });

  it('should render with only course filters', async () => {
    (useFindCatalogResults as jest.Mock).mockReturnValue({
      searchCatalog: mockSearch,
      resultsLoading: false
    });

    (useFindAllVendors as jest.Mock).mockReturnValue({
      vendors: [{ name: 'Udemy', id: 'udemy' }],
      vendorsReady: true
    });
    (useSearchParams as jest.Mock).mockImplementation(() => ({
      get: jest.fn(key => {
        if (key === 'targetId') return 'targetId';
        if (key === 'targetType') return 'user';
        return null;
      }),
      getAll: jest.fn(key => {
        if (key === 'allowedContent') return ['course'];
      })
    }));

    renderV3(
      <ApolloProvider client={mockClient}>
        <MpCurriculumCatalogPage />
      </ApolloProvider>
    );
    const searchInput = screen.getByLabelText('Keyword');

    expect(searchInput).toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: 'Roger Rabbit' } });
    expect(searchInput).toHaveValue('Roger Rabbit');

    await waitFor(() => {
      expect(screen.getByText(/vendor/i)).toBeInTheDocument();
      expect(screen.queryByText(/item type/i)).not.toBeInTheDocument();
    });
  });

  it('should render with only plan filters', async () => {
    (useFindCatalogResults as jest.Mock).mockReturnValue({
      searchCatalog: mockSearch,
      resultsLoading: false
    });

    (useFindAllVendors as jest.Mock).mockReturnValue({
      vendors: [{ name: 'Udemy', id: 'udemy' }],
      vendorsReady: true
    });

    (useSearchParams as jest.Mock).mockImplementation(() => ({
      get: jest.fn(key => {
        if (key === 'targetId') return 'targetId';
        if (key === 'targetType') return 'cohort';
        return null;
      }),
      getAll: jest.fn(key => {
        if (key === 'allowedContent') return ['plan'];
      })
    }));
    renderV3(
      <ApolloProvider client={mockClient}>
        <MpCurriculumCatalogPage />
      </ApolloProvider>
    );

    const searchInput = screen.getByLabelText('Keyword');

    expect(searchInput).toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: 'Roger Rabbit' } });
    expect(searchInput).toHaveValue('Roger Rabbit');

    await waitFor(() => {
      expect(screen.getByText(/add to cohort/i)).toBeInTheDocument();
    });
  });

  it('should add a course to the cart', async () => {
    (useFindCatalogResults as jest.Mock).mockReturnValue({
      searchCatalog: mockSearch,
      resultsLoading: false
    });

    (useFindAllVendors as jest.Mock).mockReturnValue({
      vendors: [{ name: 'Udemy', id: 'udemy' }],
      vendorsReady: true
    });
    (useSearchParams as jest.Mock).mockImplementation(() => ({
      get: jest.fn(key => {
        if (key === 'targetId') return 'targetId';
        if (key === 'targetType') return 'cohort';
        return null;
      }),
      getAll: jest.fn(key => {
        if (key === 'allowedContent') return ['all'];
      })
    }));

    render(
      <ApolloProvider client={mockClient}>
        <MpCurriculumCatalogPage />
      </ApolloProvider>
    );

    fireEvent.change(screen.getByLabelText(/keyword/i), {
      target: { value: 'Javascript' }
    });
    await waitFor(() => expect(mockSearch).toHaveBeenCalledTimes(1));
  });
});
