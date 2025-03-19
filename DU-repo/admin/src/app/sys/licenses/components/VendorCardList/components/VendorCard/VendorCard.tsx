import { RingProgressBar } from '../RingProgressBar';
import { ClickableTile } from '../ClickableTile';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { vstack, hstack } from 'styled-system/patterns';
import { css } from '@cerberus/styled-system/css';

interface Vendor {
  id: string;
  name: string;
  provisioned?: number | boolean;
  assigned?: number | boolean;
}

interface VendorCardProps {
  vendor: Vendor;
}

export const VendorCard = ({ vendor }: VendorCardProps) => {
  const { id, name, provisioned, assigned } = vendor;

  const available = (provisioned as number) - (assigned as number);

  const percentage =
    provisioned === -1
      ? 25
      : provisioned === 0
        ? 0
        : Math.floor(
            Math.abs(100 * (available / (provisioned as number)) - 100)
          );

  const numberToCommas = (value: number) => value.toLocaleString('en-US');

  return (
    <ClickableTile href={getRouteUrl(routeGenerators.ManageLicense({ id }))}>
      <div className={hstack({ gap: 1 })}>
        <RingProgressBar
          percentage={percentage}
          provisionedLicenses={provisioned as number}
        />
        <div className={vstack({ justifyContent: 'center' })}>
          <h6>{name}</h6>

          {provisioned === -1 ? (
            <>
              <p> Enterprise License</p>
              <p>{numberToCommas(assigned as number)} assigned</p>
              <p>Unlimited available</p>
            </>
          ) : (
            <table>
              <tbody>
                <tr>
                  <td style={{ paddingRight: '5px' }}>
                    <p>{`${numberToCommas(provisioned as number)} `}</p>
                  </td>
                  <td>
                    <p>provisioned</p>
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingRight: '5px' }}>
                    <p>{numberToCommas(assigned as number)}</p>
                  </td>
                  <td>
                    <p> assigned</p>
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingRight: '5px' }}>
                    <p className={css({ fontWeight: 'semiBold' })}>
                      {numberToCommas(available)}
                    </p>
                  </td>
                  <td>
                    <p className={css({ fontWeight: 'semiBold' })}>available</p>
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </ClickableTile>
  );
};
