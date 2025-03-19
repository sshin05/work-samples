'use client';
import Link from 'next/link';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { Button } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { PageHeader } from '@/components_new/typography/PageHeader';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { usePathname } from 'next/navigation';
import { getMissionPartnerIdFromUrl } from '@/utils/getMissionPartnerIdFromUrl';

const NotFound404Page = () => {
  const pathname = usePathname();
  const missionPartnerId = getMissionPartnerIdFromUrl(pathname);

  const homeRedirectPath = missionPartnerId
    ? getRouteUrl(routeGenerators.MissionPartnerDashboard({ missionPartnerId }))
    : getRouteUrl(routeGenerators.AdminHome());

  return (
    <MainContentVStack>
      <div
        className={vstack({
          maxW: 'md',
          m: [0, 'auto'],
          h: '70vh',
          justifyContent: 'center'
        })}
      >
        <PageHeader
          className={css({
            textStyle: 'h2',
            bg: `linear-gradient(225deg, #9F66D3 0%, #4C0091 100%)`,
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          })}
        >
          Page not found
        </PageHeader>
        <div className={vstack({ alignItems: 'flex-start', mt: 3 })}>
          <p>
            The page address you entered doesn’t exist or is incorrect. Some
            solutions are to:
          </p>
          <ul className={css({ listStyle: 'initial', pl: 6, mb: 10 })}>
            <li>Double check the URL you entered</li>
            <li>Go back to the previous page</li>
            <li>Go back to the home page</li>
          </ul>
          <div className={hstack({ justifyContent: 'center', w: 'full' })}>
            <Link href={homeRedirectPath}>
              <Button
                usage="outlined"
                shape="rounded"
                className={css({ w: '20rem' })}
              >
                Go back home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainContentVStack>
  );
};

export default NotFound404Page;
