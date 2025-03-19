import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { createMockClient } from 'mock-apollo-client';
import { renderV3, screen, waitFor, fireEvent } from '@@/test-utils';
import { useRemoveFeaturedTrainingItems } from '@/api/mission-partner';
import FeaturedTrainingTab from '../FeaturedTrainingTab/FeaturedTrainingTab';
import { routeGenerators, getRouteUrl } from '@/utils/getRouteUrl';
import { abbreviatedDayDate } from '@/utils/date/abbreviatedDayDate';
import { useIsDuAdmin } from '@/hooks/useCurrentSession/useCurrentSession';

const mockPush = jest.fn();
const mockToggle = jest.fn();
const mockHandleChange = jest.fn();
const mockNotify = jest.fn();
jest.mock('@/hooks/useCurrentSession/useCurrentSession', () => ({
  useIsDuAdmin: jest.fn()
}));

jest.mock('@cerberus/react', () => ({
  useNotificationCenter: jest.fn(() => ({
    notify: mockNotify
  })),
  useConfirmModal: jest.fn(() => ({
    show: jest.fn().mockReturnValue(true)
  })),
  trapFocus: jest.fn(),
  NotificationCenter: ({ children }) => <div>{children}</div>,
  Modal: ({ children }) => <div>{children}</div>,
  Tabs: ({ children }) => <div>{children}</div>,
  TabsList: ({ children }) => <div>{children}</div>,
  Tab: ({ children }) => <div>{children}</div>,
  TabPanel: ({ children }) => <div>{children}</div>,
  Button: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  Input: ({ value = '', onChange }) => (
    <input value={value} onChange={onChange} />
  ),
  Field: ({ children }) => <div>{children}</div>,
  Label: ({ children }) => <div>{children}</div>,
  IconButton: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  Table: ({ children }) => <table>{children}</table>,
  Tag: ({ children }) => <div>{children}</div>,
  Td: ({ children }) => <td>{children}</td>,
  Tr: ({ children }) => <tr>{children}</tr>,
  Th: ({ children }) => <th>{children}</th>,
  Thead: ({ children }) => <thead>{children}</thead>,
  Tbody: ({ children }) => <tbody>{children}</tbody>,
  Select: ({ children }) => <select>{children}</select>,
  Option: ({ children }) => <option>{children}</option>,
  ConfirmModal: ({ children }) => <div>{children}</div>,
  Menu: ({ children }) => <div>{children}</div>,
  MenuItem: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  MenuTrigger: ({ children }) => <div>{children}</div>,
  MenuContent: ({ children }) => <div>{children}</div>,
  MenuSeparator: ({ children }) => <div>{children}</div>,
  Toggle: ({ children }) => <div>{children}</div>,
  Checkbox: ({ children, onChange }) => (
    <input type="checkbox" onChange={onChange}>
      {children}
    </input>
  )
}));

jest.mock('@cerberus/icons', () => ({
  Search: () => 'Search',
  Edit: () => 'Edit',
  TrashCan: () => 'Delete',
  Add: () => <div>Add</div>,
  ArrowsVertical: () => 'ArrowsVertical',
  SortAscending: () => 'SortAscending',
  SortDescending: () => 'SortDescending'
}));

jest.mock('@/components_new/form', () => ({
  TextInput: ({ children }) => <input>{children}</input>
}));

jest.mock('@/api/mission-partner/useToggleRequiredFeaturedTraining', () => ({
  useToggleRequiredFeaturedTraining: jest.fn(() => ({
    toggleRequiredFeaturedTraining: mockToggle,
    toggleRequiredFeaturedTrainingLoading: false,
    toggleRequiredFeaturedTrainingError: null
  }))
}));

jest.mock('./ToggleCell/ToggleCell', () => ({
  ToggleCell: ({ original, callback }) => (
    <button onClick={() => callback(original, true)}>Toggle Cell </button>
  )
}));

jest.mock('./LearnersStatusCell/LearnersStatusCell', () => ({
  __esModule: true,
  LearnersStatusCell: () => <div>LearnersStatusCell</div>
}));

jest.mock('./hooks/useToggle', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    checked: true,
    handleChange: mockHandleChange
  }))
}));

jest.mock('../Collections', () => ({
  CollectionsTable: jest.fn(() => <div>Mock CollectionsTable</div>)
}));

jest.mock('@/components_new/table/components/NoDataMessage', () => ({
  NoDataMessage: ({ buttonText, cta, message }) => (
    <div data-testid="mock-no-data-message">
      <button onClick={cta}>{buttonText}</button>
      <p>{message}</p>
    </div>
  )
}));

const mockMp = {
  id: '1234',
  name: 'Test MP',
  featuredTraining: [
    {
      type: 'COURSE',
      courseId: 'cloudacademy#00ad5631-15b7-4a63-9dbc-aef0405a0a6e',
      title: 'React - Components and JSX',
      dateAdded: '2023-04-14T15:51:05.434Z',
      required: false
    },
    {
      type: 'ASSESSMENT',
      assessmentId: 'cloudacademy#00ad5631-15b7-4a63-9dbc-aef0405a0a5e',
      title: 'React - Testing',
      dateAdded: '2023-04-15T15:51:05.434Z',
      required: false
    },
    {
      type: 'TRAINING_PLAN',
      planSourceId: 'd08b4ec6-ad44-46e3-934b-50a2b77327b6',
      planType: 'Force Multiplier',
      planVersion: '2',
      title: 'Training Plan - Pre-Exam Version Test',
      dateAdded: '2023-04-15T15:51:05.434Z',
      required: false
    }
  ]
};

let mockClient;

jest.mock('@/api/mission-partner');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    push: mockPush
  }))
}));

beforeEach(() => {
  jest.clearAllMocks();
  mockClient = createMockClient();
  (useIsDuAdmin as jest.Mock).mockReturnValue({ isDuAdmin: true });

  (useRemoveFeaturedTrainingItems as jest.Mock).mockReturnValue({
    removeFeaturedTrainingItems: jest.fn().mockResolvedValue(Promise.resolve())
  });
});
describe('<FeaturedTrainingTab />', () => {
  describe('component rendering', () => {
    it('should render', () => {
      renderV3(
        <ApolloProvider client={mockClient}>
          <FeaturedTrainingTab
            isPortalManager={undefined}
            missionPartner={mockMp}
            missionPartnerLoading={false}
          />
        </ApolloProvider>
      );
      expect(screen.getByText('Item name')).toBeInTheDocument();
      expect(screen.getByText('Type')).toBeInTheDocument();
      expect(screen.getByText('Date added')).toBeInTheDocument();
      expect(
        screen.getByText('React - Components and JSX')
      ).toBeInTheDocument();
      expect(screen.getByText('Course')).toBeInTheDocument();
      expect(
        screen.getByRole('cell', {
          name: abbreviatedDayDate(mockMp.featuredTraining[0].dateAdded)
        })
      ).toBeInTheDocument();
    });

    it('should render a no results state', () => {
      renderV3(
        <ApolloProvider client={mockClient}>
          <FeaturedTrainingTab
            isPortalManager={undefined}
            missionPartner={[]}
            missionPartnerLoading={false}
          />
        </ApolloProvider>
      );
      expect(
        screen.getByText(
          'Once featured training has been added, it will appear here.'
        )
      ).toBeInTheDocument();
      expect(screen.getByTestId('mock-no-data-message')).toBeInTheDocument();
    });
  });

  describe('Component buttons and toggle', () => {
    it('should call mockPush when the add button is clicked', () => {
      renderV3(
        <ApolloProvider client={mockClient}>
          <FeaturedTrainingTab
            isPortalManager={undefined}
            missionPartner={mockMp}
            missionPartnerLoading={false}
          />
        </ApolloProvider>
      );
      screen.getByText('Training item').click();
      expect(mockPush).toHaveBeenCalledWith(
        getRouteUrl(
          routeGenerators.CurriculumCatalog({
            missionPartnerId: mockMp.id
          }),
          {
            targetId: mockMp.id,
            targetType: 'mission-partner-featured-training',
            allowedContent: ['course', 'assessment', 'plan', 'lab'],
            missionPartnerId: mockMp.id,
            excludeCustomContent: true,
            callbackPath: getRouteUrl(
              routeGenerators.MissionPartnerTrainingHub({
                missionPartnerId: mockMp.id
              })
            )
          }
        )
      );
    });

    it('should call mockToggle when switch is toggled', async () => {
      renderV3(
        <ApolloProvider client={mockClient}>
          <FeaturedTrainingTab
            isPortalManager={undefined}
            missionPartner={mockMp}
            missionPartnerLoading={false}
          />
        </ApolloProvider>
      );
      const toggleElement = screen.getAllByText('Toggle Cell')[0];
      fireEvent.click(toggleElement);

      await waitFor(() => {
        expect(mockToggle).toHaveBeenCalledWith(
          expect.objectContaining({
            courseId: 'cloudacademy#00ad5631-15b7-4a63-9dbc-aef0405a0a6e'
          }),
          '1234'
        );
      });
    });
  });

  describe('Roles and rendering', () => {
    it('should show featured training for admins', () => {
      renderV3(
        <ApolloProvider client={mockClient}>
          <FeaturedTrainingTab
            isPortalManager={undefined}
            missionPartner={mockMp}
            missionPartnerLoading={false}
          />
        </ApolloProvider>
      );

      expect(screen.getByText('Training item')).toBeInTheDocument();
    });
    it('should show featured training for portal managers', () => {
      renderV3(
        <ApolloProvider client={mockClient}>
          <FeaturedTrainingTab
            isPortalManager={true}
            missionPartner={mockMp}
            missionPartnerLoading={false}
          />
        </ApolloProvider>
      );

      expect(screen.getByText('Training item')).toBeInTheDocument();
    });
    it('should not show featured training for users without admin or portal manager', () => {
      (useIsDuAdmin as jest.Mock).mockReturnValue({ isDuAdmin: false });
      renderV3(
        <ApolloProvider client={mockClient}>
          <FeaturedTrainingTab
            isPortalManager={false}
            missionPartner={mockMp}
            missionPartnerLoading={false}
          />
        </ApolloProvider>
      );
      screen.debug();

      expect(screen.queryByText('Training')).not.toBeInTheDocument();
    });
  });

  describe('Searchbar functions', () => {
    it('click the edit button', () => {
      renderV3(
        <ApolloProvider client={mockClient}>
          <FeaturedTrainingTab
            isPortalManager={undefined}
            missionPartner={mockMp}
            missionPartnerLoading={false}
          />
        </ApolloProvider>
      );
      const filterButton = screen.getAllByRole('button', {
        name: /Edit/i
      })[0];
      fireEvent.click(filterButton);

      fireEvent.click(screen.getAllByRole('checkbox')[0]);

      expect(screen.getByText('1 item selected')).toBeInTheDocument();

      fireEvent.click(screen.getAllByRole('checkbox')[0]);

      expect(screen.queryByText('1 item selected')).not.toBeInTheDocument();
    });

    it('check all the training items', () => {
      renderV3(
        <ApolloProvider client={mockClient}>
          <FeaturedTrainingTab
            isPortalManager={undefined}
            missionPartner={mockMp}
            missionPartnerLoading={false}
          />
        </ApolloProvider>
      );

      const filterButton = screen.getAllByRole('button', {
        name: /Edit/i
      })[0];
      fireEvent.click(filterButton);
      fireEvent.click(screen.getAllByRole('checkbox')[0]);
      fireEvent.click(screen.getAllByRole('checkbox')[1]);
      fireEvent.click(screen.getAllByRole('checkbox')[2]);

      expect(screen.getByText('3 items selected')).toBeInTheDocument();

      fireEvent.click(screen.getByText('Cancel'));

      expect(screen.queryByText('3 items selected')).not.toBeInTheDocument();
    });

    it('fail to remove all the traning items', async () => {
      (useRemoveFeaturedTrainingItems as jest.Mock).mockReturnValue({
        removeFeaturedTrainingItems: jest
          .fn()
          .mockRejectedValueOnce(new Error('Error')),
        removeFeaturedTrainingItemsLoading: false,
        removeFeaturedTrainingItemsError: false,
        removeFeaturedTrainingItemsData: ['12345', '123456', '999999']
      });
      renderV3(
        <ApolloProvider client={mockClient}>
          <FeaturedTrainingTab
            isPortalManager={undefined}
            missionPartner={mockMp}
            missionPartnerLoading={false}
          />
        </ApolloProvider>
      );

      const filterButton = screen.getAllByRole('button', {
        name: /Edit/i
      })[0];
      fireEvent.click(filterButton);
      fireEvent.click(screen.getAllByRole('checkbox')[0]);
      fireEvent.click(screen.getAllByRole('checkbox')[1]);
      fireEvent.click(screen.getAllByRole('checkbox')[2]);

      expect(screen.getByText('3 items selected')).toBeInTheDocument();

      fireEvent.click(screen.getByText('Remove'));

      await waitFor(() => {
        expect(mockNotify).toHaveBeenCalledWith(
          expect.objectContaining({ heading: 'Error' })
        );
      });
    });

    it('succesfully remove all the training items', async () => {
      (useRemoveFeaturedTrainingItems as jest.Mock).mockReturnValue({
        removeFeaturedTrainingItems: jest.fn().mockResolvedValue({}),
        removeFeaturedTrainingItemsLoading: false,
        removeFeaturedTrainingItemsError: false,
        removeFeaturedTrainingItemsData: ['12345', '123456', '999999']
      });
      renderV3(
        <ApolloProvider client={mockClient}>
          <FeaturedTrainingTab
            isPortalManager={undefined}
            missionPartner={mockMp}
            missionPartnerLoading={false}
          />
        </ApolloProvider>
      );

      const filterButton = screen.getAllByRole('button', {
        name: /Edit/i
      })[0];
      fireEvent.click(filterButton);
      fireEvent.click(screen.getAllByRole('checkbox')[0]);
      fireEvent.click(screen.getAllByRole('checkbox')[1]);
      fireEvent.click(screen.getAllByRole('checkbox')[2]);
      fireEvent.click(screen.getByText('Remove'));

      await waitFor(() => {
        expect(mockNotify).toHaveBeenCalledWith(
          expect.objectContaining({ heading: 'Success' })
        );
      });
    });
  });
});
