import { renderV3, screen } from '@@/test-utils';
import { EditTitleModal } from './EditTitleModal';

jest.mock('../EditTitleForm/', () => ({
  EditTitleForm: jest.fn(() => <div>EditTitleForm</div>)
}));

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useSearchParams: jest.fn(() => ({
    get: jest.fn()
  }))
}));

describe('EditTitleModal', () => {
  const useSearchParamsMock =
    jest.requireMock('next/navigation').useSearchParams;

  beforeEach(() => {
    useSearchParamsMock.mockReturnValue({
      get: jest.fn()
    });
  });

  it('should render', () => {
    renderV3(
      <EditTitleModal
        // @ts-expect-error minimum required props
        currentBlock={{ id: '1', title: 'Test', description: 'test' }}
      />
    );

    expect(screen.getByText('EditTitleForm')).toBeInTheDocument();
  });
});
