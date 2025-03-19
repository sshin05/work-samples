'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRouteParams } from '@/hooks/useRouteParams';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { CurriculumSearch, ItemCardList } from '@/components/shopping-cart';
import { OrderSummary } from '@/components/shopping-cart/OrderSummary/OrderSummary';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { ArrowLeft } from '@cerberus/icons';
import {
  Button,
  Field,
  IconButton,
  Label,
  Option,
  Select,
  useNotificationCenter
} from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { useFindCatalogResults } from '@/api/catalog';
import { useFindLatestForceMultiplierByIdAdmin } from '@/api/force-multipliers';
import { useFindFeaturedTrainingIds } from '@/api/mission-partner';
import { useFindLabById } from '@/api/lab';
import HostedContentPreviewContainer from '@/components/manage-mission-partners/custom-training/HostedContentPreviewContainer';
import { useUserRoles } from '@/hooks/useCurrentSession/useCurrentSession';
import type { FindCatalogResultsQueryVariables } from '@/api/codegen/graphql';
import {
  useFilteredCurriculumData,
  useHandleFilterChange,
  useVendorList,
  useItemTypeList,
  usePlanTypeList,
  useHandleSubmitCart
} from '@/app/mp/[missionPartnerId]/curriculum-catalog/hooks';

export const MpCurriculumCatalogPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const targetId = searchParams.get('targetId');
  const targetType = searchParams.get('targetType');
  const allowedContent = searchParams.getAll('allowedContent');
  const excludeCustomContent =
    searchParams.get('excludeCustomContent') === 'true';
  const encodedCallbackPath = searchParams.get('callbackPath');
  const callbackPath = encodedCallbackPath;
  const moduleIndexParam = searchParams.get('moduleIndex');
  const moduleIndex = moduleIndexParam ? parseInt(moduleIndexParam) : undefined;
  const collectionId = searchParams.get('collectionId') || null;
  const { missionPartnerId } = useRouteParams();

  const { isDuAdmin } = useUserRoles();

  // Queries
  // We use the target type to make sure that we only fetch the data we need
  const { searchCatalog, resultsLoading } = useFindCatalogResults();

  const { forceMultiplierById } = useFindLatestForceMultiplierByIdAdmin(
    targetType === 'force-multiplier' ? targetId : undefined
  );
  const { findLabById } = useFindLabById(
    targetType === 'lab' ? targetId : undefined
  );
  const { featuredTrainingIds, featuredTrainingIdsLoading } =
    useFindFeaturedTrainingIds(missionPartnerId);

  // State
  const [loadedItems, setLoadedItems] = useState([]);
  const [firstTimeSearch, setFirstTimeSearch] = useState(true);
  const [total, setTotal] = useState(0); // We use this to prevent flash on load more
  const [showPreviewFor, setShowPreviewFor] = useState(null);

  const { notify } = useNotificationCenter();

  // Set up filter
  const isAllSourcesSelected = allowedContent[0] === 'all';
  const firstSourceCapitalized =
    allowedContent[0].charAt(0).toUpperCase() + allowedContent[0].slice(1);
  const defaultItemFilter = allowedContent.includes('course')
    ? 'Course'
    : firstSourceCapitalized;
  const userFriendlySourceLabel =
    isAllSourcesSelected || allowedContent.length > 1
      ? 'training items'
      : `${firstSourceCapitalized + 's'}`;

  const [cart, setCart] = useState([]);

  const { filteredCurriculumData } = useFilteredCurriculumData({
    targetType,
    targetId,
    missionPartnerId,
    forceMultiplierById,
    findLabById
  });

  const { handleFilterChange, searchAfter, setSearchAfter, filter } =
    useHandleFilterChange({
      setFirstTimeSearch,
      setLoadedItems,
      isAllSourcesSelected,
      firstTimeSearch,
      defaultItemFilter
    });

  // Computed
  const { vendorsReady, vendorList } = useVendorList({ handleFilterChange });

  const { itemTypeList } = useItemTypeList({
    handleFilterChange,
    isAllSourcesSelected,
    allowedContent
  });

  const planTypeList = usePlanTypeList({ handleFilterChange });

  // Methods

  const handleQueryChange = search => {
    // Prevent duplicate calls
    if (search !== filter.search && !resultsLoading && !checkingOut) {
      handleFilterChange('search', search);
    }
  };

  const handleLoadMore = () => handleFilterChange('page', filter.page + 1);

  const handleAddToCart = item =>
    setCart(previousCart => [...previousCart, item]);

  const handleRemoveFromCart = item => {
    setCart(previousCart => {
      const index = previousCart.findIndex(
        previousItem => previousItem.id === item.id
      );
      return [
        ...previousCart.slice(0, index),
        ...previousCart.slice(index + 1)
      ];
    });
  };

  const { handleSubmitCart, checkingOut } = useHandleSubmitCart({
    cart,
    collectionId,
    forceMultiplierById,
    findLabById,
    callbackPath,
    moduleIndex,
    missionPartnerId,
    targetId,
    targetType,
    userFriendlySourceLabel
  });

  // Lifecycle
  useEffect(() => {
    if (!filter.search) {
      return;
    }

    // Build the search parameters
    const searchParams: FindCatalogResultsQueryVariables = {
      search: filter.search,
      vendorId: filter.vendor?.id,
      type: filter.type,
      page: filter.page,
      pageSize: filter.pageSize,
      planType: filter.planType,
      missionPartnerId: isDuAdmin ? undefined : missionPartnerId,
      searchAfter
    };

    // Pass 'excludeCustomContent' when the type is not 'Lab' and 'excludeCustomContent' is true
    if (filter.type !== 'Lab' && excludeCustomContent) {
      searchParams.excludeCustomContent = true;
    }
    // Do not include 'excludeCustomContent' when searching for labs
    searchCatalog(searchParams)
      .then(response => {
        if (!response) return;

        const { findCatalogResults } = response.data;

        // Only append new items if we are loading more
        if (filter.lastFilterPropChanged === 'page') {
          setLoadedItems(previousItems => [
            ...previousItems,
            ...findCatalogResults.hits
          ]);
        } else {
          // otherwise, replace the items
          setLoadedItems([...findCatalogResults.hits]);
        }

        setSearchAfter(findCatalogResults?.searchAfter);
        setTotal(findCatalogResults?.total);
      })
      .catch(() =>
        notify({
          palette: 'danger',
          heading: 'Error',
          description: 'There was an error loading the catalog items.'
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, isDuAdmin]);

  return (
    <div
      className={vstack({
        gap: '4',
        alignItems: 'stretch',
        h: 'full'
      })}
    >
      {/* HeaderComponent */}
      <div className={hstack()}>
        <IconButton
          palette="action"
          usage="ghost"
          ariaLabel="go back"
          title="go back"
          className={css({
            _hover: { bg: 'transparent' }
          })}
          onClick={() => {
            router.push(
              encodedCallbackPath
                ? callbackPath
                : getRouteUrl(
                    routeGenerators.CustomTrainingPlan({
                      missionPartnerId: missionPartnerId,
                      planId: targetId
                    })
                  )
            );
          }}
        >
          <ArrowLeft />
        </IconButton>
        <h5
          className={css({
            textStyle: 'h5'
          })}
        >
          Add training items to your plan
        </h5>
      </div>

      {/* ContentComponent */}
      <div
        className={hstack({
          gap: '8',
          h: 'full',
          minHeight: 0,
          alignItems: 'flex-start'
        })}
      >
        <div className={vstack({ width: '2/3', h: 'full' })}>
          {/* Filters */}
          <div
            className={hstack({
              gap: '4',
              alignItems: 'start',
              mb: 8,
              w: 'full'
            })}
          >
            <CurriculumSearch
              onSearch={handleQueryChange}
              disabled={checkingOut}
            />
            {((filter.search && total >= 0) || loadedItems.length > 0) && (
              <>
                {/* Item Type dropdown */}
                {/* Make shared component..? */}
                {itemTypeList.length > 1 && (
                  <div
                    className={vstack({
                      gap: '0',
                      width: 'full'
                    })}
                  >
                    <Field>
                      <Label htmlFor="itemType" size="sm">
                        Item Type
                      </Label>
                      <Select
                        id="itemType"
                        size="md"
                        defaultValue={[defaultItemFilter]}
                        onChange={event => {
                          const itemType = itemTypeList.find(
                            itemType => itemType.title === event.target.value
                          );
                          itemType.onClick();
                        }}
                      >
                        {itemTypeList.map(({ title }, index) => (
                          <Option key={index} value={title}>
                            {title}
                          </Option>
                        ))}
                      </Select>
                    </Field>
                  </div>
                )}

                {/* Vendor Dropdown */}
                {/* Only shown if we are searching for courses or assessments */}
                {vendorsReady &&
                  ['Course', 'Assessment'].includes(filter.type) && (
                    <div
                      className={vstack({
                        gap: '0',
                        width: 'full'
                      })}
                    >
                      <Field>
                        <Label htmlFor="vendor" size="sm">
                          Vendor
                        </Label>
                        <Select
                          id="vendor"
                          size="md"
                          onChange={event => {
                            const vendorItem = vendorList.find(
                              vendor => vendor.title === event.target.value
                            );
                            vendorItem.onClick();
                          }}
                        >
                          {vendorList.map((vendor, index) => (
                            <Option key={index} value={vendor.title}>
                              {vendor.title}
                            </Option>
                          ))}
                          {/* {vendorList.map(({ title }) => (
                            <Option key={title} value={title}>
                              {title}
                            </Option>
                          ))} */}
                        </Select>
                      </Field>
                    </div>
                  )}

                {/* Plan Type Dropdown */}
                {/* Only shown if we are searching for plans */}
                {['Plan', 'LearningPath', 'Skill', 'ForceMultiplier'].includes(
                  filter.type
                ) && (
                  <div
                    className={vstack({
                      gap: '0',
                      width: 'full'
                    })}
                  >
                    <Field disabled={false} invalid={false} readOnly={false}>
                      <Label htmlFor="planType" size="sm">
                        Plan Type
                      </Label>
                      <Select
                        id="planType"
                        size="md"
                        onChange={event => {
                          const planType = planTypeList.find(
                            planType => planType.title === event.target.value
                          );
                          planType.onClick();
                        }}
                      >
                        {planTypeList.map(({ title }, index) => (
                          <Option key={index} value={title}>
                            {title}
                          </Option>
                        ))}
                      </Select>
                    </Field>
                  </div>
                )}
              </>
            )}
          </div>

          {/* No results */}
          {total === 0 && filter.search && !resultsLoading && (
            <p
              className={css({
                textStyle: 'body-md',
                color: 'page.text.initial'
              })}
            >
              No results found
            </p>
          )}

          {/* Loading */}
          {((resultsLoading && loadedItems.length === 0) ||
            featuredTrainingIdsLoading) && (
            <div
              className={vstack({
                gap: '4',
                alignItems: 'center',
                justifyContent: 'center'
              })}
            >
              <p
                className={css({
                  textStyle: 'h4',
                  color: 'page.text.initial'
                })}
              >
                Loading...
              </p>
            </div>
          )}

          {/* Results */}
          <div
            className={vstack({
              gap: '4',
              overflow: 'auto',
              w: 'full'
            })}
          >
            <ItemCardList
              // @ts-expect-error -  Property 'existingCurriculum' does not exist on type 'IntrinsicAttributes & RefAttributes<any>'.ts(2322)
              existingCurriculum={filteredCurriculumData}
              items={loadedItems}
              cart={cart}
              onAddToCart={handleAddToCart}
              checkingOut={checkingOut}
              setShowPreviewFor={setShowPreviewFor}
              featuredTrainingIds={featuredTrainingIds}
            />

            {/* Load More */}
            {filter.search &&
              loadedItems?.length !== 0 &&
              loadedItems?.length < total &&
              !resultsLoading && (
                <Button
                  palette="action"
                  usage="ghost"
                  shape="rounded"
                  onClick={handleLoadMore}
                >
                  Load More
                </Button>
              )}
          </div>
        </div>

        {/* Items in Cart */}
        <div
          className={css({
            display: 'flex',
            h: 'full',
            w: '1/3'
          })}
        >
          <OrderSummary
            cart={cart}
            targetType={targetType}
            checkingOut={checkingOut}
            handleSubmitCart={handleSubmitCart}
            handleRemoveFromCart={handleRemoveFromCart}
          />
        </div>
      </div>

      {showPreviewFor !== null && (
        <HostedContentPreviewContainer
          item={showPreviewFor}
          onClose={() => {
            setShowPreviewFor(null);
          }}
        />
      )}
    </div>
  );
};
