import { ApolloProvider } from '@apollo/client';
import { render, screen, userEvent, fireEvent, waitFor } from '@@/test-utils';
import { EditQuestion } from './EditQuestion';
import { useRouter, useParams } from 'next/navigation';
import { createMockClient } from 'mock-apollo-client';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn()
}));

describe('EditQuestion', () => {
  const mockClient = createMockClient();
  const mockOnSave = jest.fn().mockResolvedValue(null);
  const mockPush = jest.fn();
  const mockQuestions = [
    {
      title: 'Question 1',
      type: 'Multiple Choice',
      choices: [
        { choice: 'This is the first answer', isCorrect: true },
        { choice: 'This is the second answer', isCorrect: false }
      ]
    }
  ];
  const goBackRoute = '/questions';

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush
    });

    (useParams as jest.Mock).mockReturnValue({
      id: '0',
      missionPartnerId: '0',
      contentId: '0'
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    render(
      <ApolloProvider client={mockClient}>
        <EditQuestion
          questionId="0"
          questionIndex={0}
          questions={mockQuestions}
          onSave={mockOnSave}
          goBackRoute={goBackRoute}
        />
      </ApolloProvider>
    );

    expect(screen.getByText('Question 1')).toBeInTheDocument();
    expect(
      screen.getByDisplayValue('This is the first answer')
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue('This is the second answer')
    ).toBeInTheDocument();
  });

  it('should update and save the question', async () => {
    render(
      <ApolloProvider client={mockClient}>
        <EditQuestion
          questionId="0"
          questionIndex={0}
          questions={mockQuestions}
          onSave={mockOnSave}
          goBackRoute={goBackRoute}
        />
      </ApolloProvider>
    );

    const titleInput = screen.getByDisplayValue('Question 1');
    userEvent.type(titleInput, 'Updated Title');

    await waitFor(() => {
      expect(
        screen.getByDisplayValue('Question 1Updated Title')
      ).toBeInTheDocument();
    });

    const textInput1 = screen.getByDisplayValue('This is the first answer');
    userEvent.paste(textInput1, 'PASTED_TEXT');

    await waitFor(() => {
      expect(
        screen.getByDisplayValue('This is the first answerPASTED_TEXT')
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Save'));

    expect(mockOnSave).toHaveBeenCalledWith([
      {
        id: '0',
        title: 'Question 1Updated Title',
        type: 'Multiple Choice',
        choices: [
          { choice: 'This is the first answerPASTED_TEXT', isCorrect: true },
          { choice: 'This is the second answer', isCorrect: false }
        ]
      }
    ]);
  });

  it('should navigate back', () => {
    render(
      <ApolloProvider client={mockClient}>
        <EditQuestion
          questionId="0"
          questionIndex={0}
          questions={mockQuestions}
          onSave={mockOnSave}
          goBackRoute={goBackRoute}
        />
      </ApolloProvider>
    );

    fireEvent.click(screen.getByText(/go back/i));
    expect(mockPush).toHaveBeenCalledWith(
      '/questions?contentId=0&missionPartnerId=0&courseId=0'
    );
  });
});
