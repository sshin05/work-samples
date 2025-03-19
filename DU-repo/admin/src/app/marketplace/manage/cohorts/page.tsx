'use client';

import { container } from '@cerberus/styled-system/patterns';
import { Show } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { sqlFindCohorts } from '@/app/api/cohorts';
import { useSQLQuery } from '@/app/api';
import { MarketplaceCardsContainer } from '@/app/marketplace/components/MarketplaceCardsContainer/MarketplaceCardsContainer';
import { CohortCard } from '@/app/marketplace/components/CohortCard/CohortCard';
import { getRouteUrl } from '@/utils/getRouteUrl';
import ManagePageHeader from '../components/MangePageHeader/ManagePageHeader';

const ManageCohorts = () => {
  const breadcrumbs = [
    {
      text: 'Admin Portal',
      href: getRouteUrl('/')
    },
    {
      text: 'Manage Marketplace',
      href: getRouteUrl('/marketplace/manage')
    },
    {
      text: 'Cohorts'
    }
  ];

  const {
    data: cohorts,
    query: _findCohorts,
    loading: cohortsLoading,
    error: cohortError
  } = useSQLQuery(sqlFindCohorts, {});

  return (
    <div>
      <ManagePageHeader
        breadcrumbs={breadcrumbs}
        title="Cohorts"
        subtitle="Deliver training at the speed of the mission."
        description="Customize Cohorts"
      />
      <div className={container({ mt: 16 })}>
        <ul
          className={css({
            textStyle: 'body-md'
          })}
        >
          {cohortsLoading && <p>Loading...</p>}
          {!cohortsLoading && cohorts?.records?.length === 0 && (
            <p>No cohorts found.</p>
          )}
          <br />

          <MarketplaceCardsContainer>
            {cohorts?.records?.map((cohort, index) => (
              <CohortCard
                cohort={cohort}
                key={index}
                // buttons={[
                //   {
                //     title: 'Edit',
                //     palette: 'action',
                //     onClick: () => {
                //       setVendorToEdit(vendor);
                //       show();
                //     }
                //   },
                //   {
                //     title: 'Delete',
                //     palette: 'danger',
                //     onClick: () => {
                //       handleDelete(vendor);
                //     }
                //   }
                // ]}
              />
            ))}
          </MarketplaceCardsContainer>

          {cohorts?.records ? (
            <p>
              Showing {cohorts?.records?.length} Vendor
              {cohorts?.records?.length !== 1 ? 's' : ''}
            </p>
          ) : null}
        </ul>
        {/* <Button
          onClick={() => {
            setVendorToEdit(null);
            show();
          }}
        >
          Create New Vendor
        </Button>
        &nbsp;
        <Button
          onClick={() => {
            const uploadRoute = getRouteUrl(
              routeGenerators.ManageMarketplaceVendorUpload()
            );
            router.push(uploadRoute);
          }}
        >
          Upload Vendors
        </Button>
        &nbsp;
        <Button
          onClick={() => {
            // could be marked as forceFetch:true
            findMarketplaceVendors({ filter: { isArchived: false } });
          }}
        >
          Reload Vendors
        </Button> */}
      </div>

      <Show when={cohortError != null}>
        <div className={css({ color: 'danger.text.initial' })}>
          {cohortError}
        </div>
      </Show>
    </div>
  );
};

export default ManageCohorts;
