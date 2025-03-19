import { getRouteUrl } from '@/utils/getRouteUrl';
import { container, flex } from '@cerberus/styled-system/patterns';
import ManagePageHeader from './components/MangePageHeader/ManagePageHeader';
import {
  type NavigationCardProps,
  NavigationCard
} from './components/NavigationCard/NavigationCard';

const BASE_URL = '/marketplace/manage';
const navItems: NavigationCardProps[] = [
  {
    title: 'Cohorts',
    description: 'Customize cohorts',
    url: `${BASE_URL}/cohorts`
  },
  {
    title: 'Tokens',
    description: 'Adjust tokens',
    url: `${BASE_URL}/tokens/adjust`
  },
  {
    title: 'Orders',
    description: 'Review, manage, and process orders',
    url: `${BASE_URL}/orders`
  },
  {
    title: 'Vendors',
    description: 'Add & edit vendors',
    url: `${BASE_URL}/vendors`
  }
];

const ManageMarketplacePage = () => {
  const breadcrumbs = [
    {
      text: 'Admin Portal',
      href: getRouteUrl('/')
    },
    {
      text: 'Manage'
    }
  ];

  return (
    <>
      <ManagePageHeader
        breadcrumbs={breadcrumbs}
        title="Manage Marketplace"
        subtitle="Deliver training at the speed of the mission."
        description="Add Vendors, adjust Tokens, process orders, and customize cohorts."
      />
      <div className={container()}>
        <div
          className={flex({
            flexDirection: 'column',
            gap: 6,
            p: 16
          })}
        >
          {navItems.map(navItem => (
            <NavigationCard key={navItem.title} {...navItem} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ManageMarketplacePage;
