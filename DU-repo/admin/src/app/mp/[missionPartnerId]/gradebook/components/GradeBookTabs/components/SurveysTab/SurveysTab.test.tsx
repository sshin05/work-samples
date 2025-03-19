import { ApolloProvider } from '@apollo/client';
import { createMockClient } from 'mock-apollo-client';
import { renderV3, screen, userEvent, waitFor } from '@@/test-utils';
import {
  useFindSurveysBySearch,
  useExportSurveys
} from '@/api/mission-partner';
import SurveysTab from './SurveysTab';
import type { MissionPartnerMinDetails } from '@/api/codegen/graphql';

jest.mock('@/api/mission-partner');

const mockClient = createMockClient();

const surveys = [
  {
    hostedSurveyName: 'name-1',
    started: 1,
    completed: 2,
    downloadResults: 'Download'
  }
];

describe('<SurveysTab />', () => {
  const defaultProps = {
    missionPartnerMinDetails: {
      id: '1234'
    } as MissionPartnerMinDetails
  };

  beforeEach(() => {
    (useFindSurveysBySearch as jest.Mock).mockReturnValue({
      surveys
    });
    (useExportSurveys as jest.Mock).mockReturnValue({
      id: '1234'
    });
  });

  it('should render', () => {
    renderV3(
      <ApolloProvider client={mockClient}>
        <SurveysTab {...defaultProps} />
      </ApolloProvider>
    );

    const [name, totalInProgress, totalCompleted, downloadResults] =
      screen.getAllByRole('columnheader');
    expect(name).toHaveTextContent('Name');
    expect(totalInProgress).toHaveTextContent('Total assigned');
    expect(totalCompleted).toHaveTextContent('Total completed');
    expect(downloadResults).toHaveTextContent('');
    expect(screen.getByText('Download')).toBeInTheDocument();

    const [, , row2] = screen.getAllByRole('row');
    expect(row2).toHaveTextContent('Download');
  });

  it('should render with 0 results', () => {
    (useFindSurveysBySearch as jest.Mock).mockReturnValue({
      surveys: []
    });
    renderV3(
      <ApolloProvider client={mockClient}>
        <SurveysTab {...defaultProps} />
      </ApolloProvider>
    );

    const [name, totalInProgress, totalCompleted, downloadResults] =
      screen.getAllByRole('columnheader');

    expect(name).toHaveTextContent('Name');
    expect(totalInProgress).toHaveTextContent('Total assigned');
    expect(totalCompleted).toHaveTextContent('Total completed');
    expect(downloadResults).toHaveTextContent('');

    expect(
      screen.getByText(
        'When a learner has completed a survey, the results will be reported here.'
      )
    ).toBeInTheDocument();
  });

  it('should export surveys', () => {
    (useExportSurveys as jest.Mock).mockReturnValue({
      exportSurveys: jest.fn()
    });
    renderV3(
      <ApolloProvider client={mockClient}>
        <SurveysTab {...defaultProps} />
      </ApolloProvider>
    );

    const exportButton = screen.getByRole('cell', { name: 'Download' });
    userEvent.click(exportButton);

    waitFor(() => {
      expect(useExportSurveys().exportSurveys).toHaveBeenCalled();
    });
  });
});
