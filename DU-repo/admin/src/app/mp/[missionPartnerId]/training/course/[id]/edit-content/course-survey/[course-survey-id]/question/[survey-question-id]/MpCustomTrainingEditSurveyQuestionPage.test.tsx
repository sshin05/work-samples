import { ApolloProvider } from '@apollo/client';
import { createMockClient } from 'mock-apollo-client';
import { renderV3, screen, fireEvent, waitFor } from '@@/test-utils';
import {
  useFindHostedCourseById,
  useUpdateHostedCourse,
  useFindHostedCourseItem,
  useUpdateHostedCourseItem
} from '@/api/hosted-course';
import EditCourseSurveyQuestionPage from './page';
import { useParams, useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useParams: jest.fn(),
  useForm: jest.fn()
}));

jest.mock('@/api/hosted-course');

describe('Course Survey Question', () => {
  const mockRouterPush = jest.fn();
  const mockRouterBack = jest.fn();
  const mockToast = jest.fn();
  const mockUpdateHostedCourse = jest.fn(async () => Promise.resolve());
  const mockFetchHostedCourseById = jest.fn(async () => Promise.resolve());
  const mockFetchHostedCourseItem = jest.fn(async () => Promise.resolve());
  const mockUpdateHostedCourseItems = jest.fn(async () => Promise.resolve());
  const mockClient = createMockClient();

  jest.mock('@digital-u/digital-ui', () => ({
    ...jest.requireActual('@digital-u/digital-ui'),
    useToast: jest.fn(() => [undefined, mockToast])
  }));

  let data = {
    id: '',
    item: {
      id: '',
      title: '',
      type: '',
      questions: [
        {
          id: '',
          durationInSeconds: 0,
          title: '',
          choices: [],
          subject: '',
          type: ''
        }
      ]
    },
    status: ''
  };

  beforeEach(() => {
    data = {
      id: 'testID',
      item: {
        id: 'testCourseSurvey',
        title: 'New Course Survey',
        type: 'Survey',
        questions: [
          {
            id: 'testQuestionId',
            durationInSeconds: 15,
            choices: [],
            title: 'TestPrompt',
            subject: '',
            type: 'Five Star Rating'
          }
        ]
      },
      status: 'Published'
    };
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: mockRouterPush,
      back: mockRouterBack
    }));

    (useFindHostedCourseById as jest.Mock).mockImplementation(() => ({
      hostedCourseById: data,
      hostedCourseByIdError: null,
      hostedCourseByIdLoading: false,
      fetchHostedCourseById: mockFetchHostedCourseById
    }));

    (useUpdateHostedCourse as jest.Mock).mockImplementation(() => ({
      updateHostedCourse: mockUpdateHostedCourse
    }));

    (useFindHostedCourseItem as jest.Mock).mockImplementation(() => ({
      hostedCourseItemData: data,
      findHostedCourseItemError: null,
      findHostedCourseItemLoading: false,
      fetchHostedCourseItem: mockFetchHostedCourseItem
    }));
    (useUpdateHostedCourseItem as jest.Mock).mockImplementation(() => ({
      updateHostedCourseItem: mockUpdateHostedCourseItems
    }));
  });

  afterEach(() => jest.clearAllMocks());

  it('should render in a default state', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    data.item.questions = [];
    renderV3(
      <ApolloProvider client={mockClient}>
        <EditCourseSurveyQuestionPage />
      </ApolloProvider>
    );

    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('Question Type*')).toBeInTheDocument();
    expect(screen.getByText('< BACK')).toBeInTheDocument();
  });

  it('should render with given data', () => {
    (useParams as jest.Mock).mockReturnValue({
      id: '1',
      'survey-question-id': 'testQuestionId'
    });
    renderV3(
      <ApolloProvider client={mockClient}>
        <EditCourseSurveyQuestionPage />
      </ApolloProvider>
    );

    const question = screen.getByLabelText('Question Type*');
    fireEvent.change(question, { target: { value: 'Free Text' } });
    fireEvent.change(screen.getByLabelText('Question*'), {
      target: { value: 'TestPrompt' }
    });

    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('Question Type*')).toBeInTheDocument();

    expect(screen.getByText('TestPrompt')).toBeInTheDocument();
    expect(screen.getByText('< BACK')).toBeInTheDocument();
  });

  it('should save five star rating questions', async () => {
    (useParams as jest.Mock).mockReturnValue({
      id: '1',
      'survey-question-id': 'testQuestionId'
    });

    renderV3(
      <ApolloProvider client={mockClient}>
        <EditCourseSurveyQuestionPage />
      </ApolloProvider>
    );

    const question = screen.getByLabelText('Question Type*');
    fireEvent.change(question, { target: { value: 'Five Star Rating' } });

    // but this one is 5-star-rating question;  was using testid before
    fireEvent.change(screen.getByLabelText('Question*'), {
      target: { value: 'fizzbuzz' }
    });
    expect(screen.getByText('Save')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      expect(mockUpdateHostedCourseItems).toHaveBeenCalled();
    });
  });

  it('should not save with empty question', async () => {
    data.item.questions[0].title = '';
    renderV3(
      <ApolloProvider client={mockClient}>
        <EditCourseSurveyQuestionPage />
      </ApolloProvider>
    );

    expect(screen.getByText('Save')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Save'));
    await waitFor(() => {
      expect(mockUpdateHostedCourseItems).not.toHaveBeenCalled();
    });
  });

  it('should not save with empty data ', async () => {
    data.item.questions[0].id = 'GAH';
    renderV3(
      <ApolloProvider client={mockClient}>
        <EditCourseSurveyQuestionPage />
      </ApolloProvider>
    );

    expect(screen.getByText('Save')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Save'));
    await waitFor(() => {
      expect(mockUpdateHostedCourseItems).not.toHaveBeenCalled();
    });
  });

  it('should not save with empty question ', async () => {
    data.item.questions[0].title = '';
    renderV3(
      <ApolloProvider client={mockClient}>
        <EditCourseSurveyQuestionPage />
      </ApolloProvider>
    );

    expect(screen.getByText('Save')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Save'));
    await waitFor(() => {
      expect(mockUpdateHostedCourseItems).not.toHaveBeenCalled();
    });
  });

  it('should not let you save unless you fill out all choices', async () => {
    renderV3(
      <ApolloProvider client={mockClient}>
        <EditCourseSurveyQuestionPage />
      </ApolloProvider>
    );

    expect(screen.getByText('Save')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Save'));
    await waitFor(() => {
      expect(mockUpdateHostedCourseItems).not.toHaveBeenCalled();
    });
  });

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // the tests below are tightly coupled to this being in this location.
  // mock declarations should be "customizable" per test.
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  jest.mock('react-hook-form', () => ({
    ...jest.requireActual('react-hook-form'),
    useForm: jest.fn(() => ({
      control: {},
      formState: { isSubmitting: false },
      handleSubmit: jest.fn()
    })),
    Controller: ({ render }) => (
      <div>{render({ field: { onChange: jest.fn(), value: '' } })}</div>
    )
  }));

  // TODO: unskip
  it.skip('should let you save when you input all choices', async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    renderV3(
      <ApolloProvider client={mockClient}>
        <EditCourseSurveyQuestionPage />
      </ApolloProvider>
    );

    const question = screen.getByLabelText('Question Type*');
    fireEvent.change(question, { target: { value: 'Multiple Choice' } });

    fireEvent.change(screen.getByTestId('input-question-multiple-choice'), {
      target: { value: 'fizzbuzz' }
    });

    expect(screen.getByText('Save')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Save'));
    await waitFor(() => {
      expect(mockUpdateHostedCourseItems).toHaveBeenCalled();
    });
  });

  it('should let you save NPS questions', async () => {
    (useParams as jest.Mock).mockReturnValue({
      id: '1',
      'survey-question-id': 'testQuestionId'
    });

    data.item.questions[0].type = 'NPS';
    data.item.questions[0].title = 'Prompt!';

    renderV3(
      <ApolloProvider client={mockClient}>
        <EditCourseSurveyQuestionPage />
      </ApolloProvider>
    );

    const question = screen.getByLabelText('Question Type*');
    fireEvent.change(question, { target: { value: 'NPS' } });

    const textInput = screen.getByLabelText('Subject*');
    fireEvent.change(textInput, {
      target: { value: 'fizzbuzz' }
    });

    const saveButton = screen.getByText('Save');
    expect(saveButton).toBeInTheDocument();
    fireEvent.click(saveButton);
    await waitFor(() => {
      expect(mockUpdateHostedCourseItems).toHaveBeenCalled();
    });
  });

  it('should let you save free response questions', async () => {
    (useParams as jest.Mock).mockReturnValue({
      id: '1',
      'survey-question-id': 'testQuestionId'
    });

    renderV3(
      <ApolloProvider client={mockClient}>
        <EditCourseSurveyQuestionPage />
      </ApolloProvider>
    );
    const question = screen.getByLabelText('Question Type*');
    fireEvent.change(question, { target: { value: 'Free Text' } });

    const freeTextInput = screen.getByLabelText('Question*');
    fireEvent.change(freeTextInput, {
      target: { value: 'Test' }
    });

    expect(screen.getByText('Save')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Save'));
    await waitFor(async () => {
      expect(mockUpdateHostedCourseItems).toHaveBeenCalled();
    });
  });
});
