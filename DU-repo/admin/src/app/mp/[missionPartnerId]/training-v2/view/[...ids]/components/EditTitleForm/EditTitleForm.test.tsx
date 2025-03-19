import { renderV3, screen } from '@@/test-utils';
import { EditTitleForm } from './EditTitleForm';

jest.mock(
  '@/app/mp/[missionPartnerId]/training-v2/actions/update-block',
  () => ({
    updateBlockTitleAndDescriptionAction: jest.fn()
  })
);

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useActionState: jest.fn(() => [null, jest.fn()])
}));

jest.mock('../EditTitleModalActions/EditTitleModalActions', () => ({
  EditTitleModalActions: jest.fn(() => <div>EditTitleModalActions</div>)
}));

describe('EditTitleForm', () => {
  it('should render', () => {
    renderV3(
      <EditTitleForm
        // @ts-expect-error minimum required props
        currentBlock={{ id: '1', title: 'Test', description: 'test' }}
      />
    );

    expect(screen.getByText('Name your curriculum')).toBeInTheDocument();
  });

  describe('when form has an error', () => {
    const useActionStateMock = jest.requireMock('react').useActionState;

    beforeEach(() => {
      useActionStateMock.mockReturnValue([
        { message: 'An error occured', error: 'Error' },
        jest.fn()
      ]);
    });

    it('should render', () => {
      renderV3(
        <EditTitleForm
          // @ts-expect-error minimum required props
          currentBlock={{ id: '1', title: 'Test', description: 'test' }}
        />
      );

      expect(screen.getByText(/Error/i)).toBeInTheDocument();
    });
  });
});
