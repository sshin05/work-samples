import { css } from '@cerberus/styled-system/css';
import { useRouteParams } from '@/hooks/useRouteParams';
import { Breadcrumbs } from '../../../Breadcrumbs/Breadcrumbs';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';

export const OrderDetailPageHeading = ({ referenceId }) => {
  const { missionPartnerId } = useRouteParams();

  const breadcrumbs = [
    {
      text: 'Orders',
      href: getRouteUrl(routeGenerators.MarketplaceOrders({ missionPartnerId }))
    },
    {
      text: referenceId
    }
  ];

  return (
    <div>
      <div className={css({ w: '50%' })}>
        <div className={css({ mb: '6' })}>
          <Breadcrumbs breadcrumbs={breadcrumbs} loading={false} />
        </div>

        <h4
          className={css({
            textStyle: 'h4',
            color: 'page.text.300',
            mb: '6'
          })}
        >
          Order Detail
        </h4>
      </div>
    </div>
  );
};
