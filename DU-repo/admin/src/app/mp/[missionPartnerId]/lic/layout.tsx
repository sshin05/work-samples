import { PageHeader } from '@/components_new/typography/PageHeader';
import { MP_ROOT_PAGE_LABEL } from '@/utils/getRouteUrl/routeConstants';
import type { Metadata } from 'next';

/**
 * See metadata documentation in CONTRIBUTING.md:
 * [Metadata Section](../../../../../CONTRIBUTING.md)
 */
export const metadata: Metadata = {
  title: {
    template: `%s | Manage Licenses | ${MP_ROOT_PAGE_LABEL}`,
    default: 'Manage Licenses'
  }
};

const LicensesLayout = props => {
  return (
    <>
      <PageHeader>Manage Licenses</PageHeader>
      {props.children}
    </>
  );
};

export default LicensesLayout;
