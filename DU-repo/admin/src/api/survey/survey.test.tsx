import { render, screen, fireEvent } from '@@/test-utils';
import { useMutation, useQuery } from '@apollo/client';
import { useCreateSurvey } from './useCreateSurvey';
import { useFindSurveyById } from './useFindSurveyById';
import { useUpdateSurvey } from './useUpdateSurvey';
import { usePublishSurvey } from './usePublishSurvey';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(),
  useMutation: jest.fn()
}));

describe('useFindSurveyById', () => {
  const SurveyComponent = () => {
    const { surveyById, fetchSurveyById } =
      useFindSurveyById('missionPartnerId');
    const { createSurvey } = useCreateSurvey();
    const { updateSurvey } = useUpdateSurvey();
    const { publishSurvey } = usePublishSurvey();

    createSurvey({ missionPartnerId: 'missionPartnerId', name: 'name' });
    updateSurvey({ id: 'id' });
    publishSurvey('id');

    return (
      <>
        <p>{surveyById.id}</p>
        <button type="button" onClick={() => fetchSurveyById('id')}>
          Fetch Survey
        </button>
      </>
    );
  };
  it('should use hook without error', () => {
    const mockRefetch = jest.fn();
    const data = {};

    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: false,
      data: {
        findSurveyById: { id: 'testId' }
      },
      refetch: mockRefetch
    });

    (useMutation as jest.Mock).mockReturnValue([
      () => {
        // Intentionally left empty.
      },
      { loading: false, error: false, data }
    ]);

    render(<SurveyComponent />);
    expect(screen.getByText('testId')).toBeInTheDocument();

    const button = screen.getByText('Fetch Survey');
    fireEvent.click(button);
    expect(mockRefetch).toHaveBeenCalled();
  });
});
