import { ApolloProvider } from '@apollo/client';
import { createMockClient } from 'mock-apollo-client';
import { renderV3, screen, userEvent, waitFor } from '@@/test-utils';
import {
  useExportQuizExams,
  useFindQuizAndExamsBySearch
} from '@/api/mission-partner';
import QuizzesExamsTab from './QuizzesExamsTab';
import type { MissionPartnerMinDetails } from '@/api/codegen/graphql';

jest.mock('@/api/mission-partner');

const mockClient = createMockClient();

const quizExams = [
  {
    itemId: 'id-1',
    itemName: 'name-1',
    itemType: 'type-1',
    missionPartnerId: 'mp-id-1',
    started: 1,
    completed: 2,
    total: 3
  }
];

describe('<QuizzesExamsTab />', () => {
  const defaultProps = {
    missionPartnerMinDetails: { id: '1234' } as MissionPartnerMinDetails,
    isLoading: false
  };
  beforeEach(() => {
    (useFindQuizAndExamsBySearch as jest.Mock).mockReturnValue({
      quizExams
    });
    (useExportQuizExams as jest.Mock).mockReturnValue({
      id: '1234'
    });
  });

  it('should render', () => {
    renderV3(
      <ApolloProvider client={mockClient}>
        <QuizzesExamsTab {...defaultProps} />
      </ApolloProvider>
    );

    const [name, type, totalInProgress, totalCompleted, downloadResults] =
      screen.getAllByRole('columnheader');
    expect(name).toHaveTextContent('Name');
    expect(type).toHaveTextContent('Type');
    expect(totalInProgress).toHaveTextContent('Total assigned');
    expect(totalCompleted).toHaveTextContent('Total completed');
    expect(downloadResults).toHaveTextContent('');

    const [, , row2] = screen.getAllByRole('row');
    expect(row2).toHaveTextContent('name-1type-112Download');
  });

  it('should render with 0 results', () => {
    (useFindQuizAndExamsBySearch as jest.Mock).mockReturnValue({
      quizExams: []
    });
    renderV3(
      <ApolloProvider client={mockClient}>
        <QuizzesExamsTab {...defaultProps} />
      </ApolloProvider>
    );

    const [name, type, totalInProgress, totalCompleted, downloadResults] =
      screen.getAllByRole('columnheader');

    expect(name).toHaveTextContent('Name');
    expect(type).toHaveTextContent('Type');
    expect(totalInProgress).toHaveTextContent('Total assigned');
    expect(totalCompleted).toHaveTextContent('Total completed');
    expect(downloadResults).toHaveTextContent('');

    expect(
      screen.getByText(
        'When a learner has completed a quiz/exam, their grade will be reported here.'
      )
    ).toBeInTheDocument();
  });

  it('should export quiz and exams', () => {
    (useExportQuizExams as jest.Mock).mockReturnValue({
      exportQuizExams: jest.fn()
    });
    renderV3(
      <ApolloProvider client={mockClient}>
        <QuizzesExamsTab {...defaultProps} />
      </ApolloProvider>
    );

    const exportButton = screen.getByRole('cell', { name: 'Download' });
    userEvent.click(exportButton);

    waitFor(() => {
      expect(useExportQuizExams().exportQuizExams).toHaveBeenCalled();
    });
  });
});
