import { renderV3, screen } from '@@/test-utils';
import { VendorCardList } from '.';

jest.mock('@cerberus/react', () => ({
  NotificationCenter: ({ children }) => <div>{children}</div>
}));

jest.mock('./components/VendorCard', () => ({
  VendorCard: ({ vendor }) => <div>{vendor.name}</div>
}));

jest.mock('./components/AddNewVendorCard', () => ({
  AddNewVendorCard: () => <div>Add New Vendor Card</div>
}));

const vendors = [
  {
    id: 'udemy',
    name: 'Udemy',
    provisioned: 500,
    assigned: 2
  },
  {
    id: 'udeacity',
    name: 'Udacity',
    provisioned: -1,
    assigned: 0
  }
];

describe('Vendor Card List', () => {
  it('should render a vendor card list', () => {
    renderV3(<VendorCardList vendors={vendors} />);
    expect(screen.getByText('Udemy')).toBeInTheDocument();
    expect(screen.getByText('Udacity')).toBeInTheDocument();
  });
});
