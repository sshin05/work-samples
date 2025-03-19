import { renderV3, screen } from '@@/test-utils';
import { KsatDetailsPage } from './KsatDetailsPage';

jest.mock('@/api/dcwf/ksat/useGetKsat', () => ({
  useGetKsat: () => ({
    ksat: {
      code: 'TestCode3A',
      description: 'Test Description Here'
    },
    ksatLoading: false
  })
}));

jest.mock('@/utils/getRouteUrl', () => ({
  getRouteUrl: () => '/route',
  routeGenerators: {
    Dcwf: () => '/dcwf'
  }
}));

jest.mock(
  '@/app/sys/dcwf/components/DcwfPage/components/DcwfActionMenu',
  () => ({
    DcwfActionMenu: () => <div>DcwfActionMenu content</div>
  })
);

jest.mock('../KsatTabs/KsatTabs', () => ({
  KsatTabs: () => <div>KsatTabs content</div>
}));

jest.mock('../EditKsatModal/EditKsatModal', () => ({
  EditKsatModal: () => <div>EditKsatModal content</div>
}));

describe('KsatDetailsPage', () => {
  it('should render', () => {
    renderV3(<KsatDetailsPage ksatId="123" />);

    expect(screen.getByText(/TestCode3A/i)).toBeInTheDocument();
    expect(screen.getByText('Test Description Here')).toBeInTheDocument();
  });
});
