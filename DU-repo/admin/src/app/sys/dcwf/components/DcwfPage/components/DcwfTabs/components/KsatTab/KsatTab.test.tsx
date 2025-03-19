import { renderV3, screen } from '@@/test-utils';
import { KsatTab } from './KsatTab';

jest.mock('./components/EnterKsatModal', () => ({
  EnterKsatModal: () => <div>EnterKsatModal</div>
}));
jest.mock('../Filters/FiltersModal/FiltersModal', () => ({
  FiltersModal: () => <div>FiltersModal</div>
}));

const mockKsatData = {
  findKsats: {
    data: [
      {
        id: '00000000-0000-0000-0000-000000000000',
        description: 'Test Description',
        domain: {
          id: '00000000-0000-0000-0000-000000000000',
          name: 'Test Domain'
        }
      }
    ],
    total: 1
  }
};

jest.mock('@/api/dcwf/ksat/useFindKsats', () => ({
  useFindKsats: () => ({
    data: mockKsatData,
    isLoading: false,
    isError: false
  })
}));

describe('KsatTab', () => {
  it('should render', () => {
    renderV3(<KsatTab />);

    const [code, description, type, domain, view] =
      screen.getAllByRole('columnheader');

    expect(code).toHaveTextContent('KSAT Code');
    expect(description).toHaveTextContent('Description');
    expect(type).toHaveTextContent('Type');
    expect(domain).toHaveTextContent('Domain');
    expect(view).toHaveTextContent('');
    expect(screen.getByText('EnterKsatModal')).toBeInTheDocument();
  });
});
