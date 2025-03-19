import { createRef, useEffect, useState } from 'react';
import { CaretDown } from '@carbon/icons-react';
import {
  Flex,
  Button,
  Text,
  colors,
  spacing,
  useToast
} from '@digital-u/digital-ui';
import { useFindCatalogResults } from '@/api/catalog';
import { useFindAllVendors } from '@/api/vendor';
import {
  CurriculumSearch,
  ItemCardList,
  useCartListRef
} from '../shopping-cart';
import { DropDown } from '@/components_new/deprecated/DropDown';
import HostedContentPreviewContainer from '../manage-mission-partners/custom-training/HostedContentPreviewContainer';
import { useUserRoles } from '@/hooks/useCurrentSession/useCurrentSession';
import {
  StyledCurriculumContainer,
  StyledCurriculumResultsContainer,
  StyledSearchLoadingContainer
} from './AddCurriculumModal.styles';
import {
  Modal,
  Portal,
  trapFocus,
  type UseModalReturnValue
} from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';

interface AddCurriculumModalPropTypes {
  onSubmitCart: (data) => void; // Promise<void>; thinking this will be an async method.  But not 100% sure yet.
  onClose: () => void;
  targetId?: string;
  targetType?: string;
  missionPartnerId?: string;
  allowedContent?: string[]; // is now ALWAYS an array, not sometimes string (as is the case for route variables)
  callbackPath?: string;
  excludeCustomContent?: boolean;
  existingCurriculum?: Record<string, unknown>;
  addCurriculumModal: UseModalReturnValue;
}

const AddCurriculumModal = ({
  onSubmitCart,
  onClose,
  allowedContent = ['course', 'plan', 'assessment'],
  excludeCustomContent = false,
  missionPartnerId = 'dasdsd',
  existingCurriculum,
  addCurriculumModal
}: AddCurriculumModalPropTypes) => {
  const { isDuAdmin } = useUserRoles();

  // Queries
  // We use the target type to make sure that we only fetch the data we need
  const { searchCatalog, resultsLoading } = useFindCatalogResults();
  const { vendors, vendorsReady } = useFindAllVendors();

  // Refs
  const cartListRef = createRef();
  const isItemCardListScrollable = useCartListRef(cartListRef);

  // State
  const [loadedItems, setLoadedItems] = useState([]);
  const checkingOut = false; // todo: refactor this component; this is evidently a copy of `manage-mission-partners/[missionPartnerId]/curriculum-catalog/index`
  const [firstTimeSearch, setFirstTimeSearch] = useState(true);
  const [total, setTotal] = useState(0); // We use this to prevent flash on load more
  const [vendorDropDownOpen, setVendorDropDownOpen] = useState(false);
  const [itemTypeDropDownOpen, setItemTypeDropDownOpen] = useState(false);
  const [planTypeDropDownOpen, setPlanTypeDropDownOpen] = useState(false);
  const [searchAfter, setSearchAfter] = useState(null);
  const [showPreviewFor, setShowPreviewFor] = useState(null);
  const [, setToast] = useToast();
  const [cart, setCart] = useState([]);
  const handleKeyDownOnModal = trapFocus(addCurriculumModal.modalRef);

  // Set up filter
  const isAllSourcesSelected = allowedContent[0] === 'all';
  const firstSourceCapitalized =
    allowedContent[0].charAt(0).toUpperCase() + allowedContent[0].slice(1);
  const defaultItemFilter = allowedContent.includes('course')
    ? 'Course'
    : firstSourceCapitalized;
  const userFriendlySourceLabel =
    isAllSourcesSelected || allowedContent.length > 1
      ? 'Items'
      : `${firstSourceCapitalized + 's'}`;

  const [filter, setFilter] = useState({
    search: '',
    vendor: null,
    type: isAllSourcesSelected ? null : defaultItemFilter,
    page: 1,
    // TODO: Revert to pageSize 10 when backend search can handle sorting
    pageSize: 25,
    planType: null,
    lastFilterPropChanged: null
  });

  // Computed
  const vendorList = [
    {
      title: 'Any',
      onClick: () => handleFilterChange('vendor', null)
    },
    ...(vendors
      ?.map(vendor => ({
        title: vendor.name,
        onClick: () => {
          handleFilterChange('vendor', vendor);
        }
      }))
      .sort((first, second) => (first.title < second.title ? -1 : 1)) || [])
  ];

  const itemTypeList = [
    {
      title: 'All',
      onClick: () => handleFilterChange('type', null)
    },
    {
      // Assessments and Courses
      title: 'Curriculum',
      onClick: () => handleFilterChange('type', 'Curriculum')
    },
    {
      title: 'Assessment',
      onClick: () => handleFilterChange('type', 'Assessment')
    },
    {
      title: 'Course',
      onClick: () => handleFilterChange('type', 'Course')
    },
    {
      title: 'Survey',
      onClick: () => handleFilterChange('type', 'Survey')
    },
    {
      title: 'Plan',
      onClick: () => handleFilterChange('type', 'Plan')
    },
    {
      title: 'Lab',
      onClick: () => handleFilterChange('type', 'Lab')
    }
  ].filter(({ title }) =>
    isAllSourcesSelected ? true : allowedContent.includes(title.toLowerCase())
  );

  const planTypeList = [
    {
      title: 'All',
      onClick: () => handleFilterChange('planType', null)
    },
    {
      title: 'Learning Path',
      onClick: () => handleFilterChange('planType', 'LearningPath')
    },
    {
      title: 'Force Multiplier',
      onClick: () => handleFilterChange('planType', 'ForceMultiplier')
    },
    {
      title: 'Skill',
      onClick: () => handleFilterChange('planType', 'Skill')
    }
  ];

  // Methods
  const handleFilterChange = async (key, value) => {
    if (key !== 'page') {
      setLoadedItems([]);
      setSearchAfter(null);
    }

    if (firstTimeSearch && itemTypeDropDownOpen) {
      setFirstTimeSearch(previousStatus => !previousStatus);
    }

    // If the user switches from a non-plan to a plan
    // we need to clear the vendor filter
    if (key === 'type' && value === 'Plan' && filter?.vendor) {
      setFilter(previousFilter => ({
        ...previousFilter,
        vendor: null
      }));
    }

    // If the user switches from a plan to a non-plan
    // we need to clear the planType filter
    if (key === 'type' && value !== 'Plan' && filter?.planType) {
      setFilter(previousFilter => ({
        ...previousFilter,
        planType: null
      }));
    }

    if (key === 'type' && value === 'Lab') {
      setFilter(previousFilter => ({
        ...previousFilter,
        type: 'Lab'
      }));
    }

    setFilter(previousFilter => {
      // Need to set us back to the first page if the user
      // changes any filter other than the page
      if (previousFilter.page !== 1 && key !== 'page') {
        return {
          ...previousFilter,
          lastFilterPropChanged: key,
          [key]: value,
          page: 1
        };
      }

      return { ...previousFilter, lastFilterPropChanged: key, [key]: value };
    });
  };

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

  // this currently doesn't need to be async because the save handler is on a different modal for this first implementation
  // closing the modal will be handled outside of this component
  const handleSubmitCart = async () => {
    onSubmitCart(cart);
  };

  // Lifecycle
  useEffect(() => {
    if (!filter.search) {
      return;
    }

    searchCatalog({
      search: filter.search,
      vendorId: filter.vendor?.id,
      type: filter.type,
      page: filter.page,
      pageSize: filter.pageSize,
      planType: filter.planType,
      excludeCustomContent,
      missionPartnerId: isDuAdmin ? undefined : missionPartnerId,
      searchAfter
    })
      .then(response => {
        if (!response) return;

        const { findCatalogResults } = response.data;

        // Reset dropdowns to prevent hijacking users
        // cursor after load
        setItemTypeDropDownOpen(false);
        setVendorDropDownOpen(false);
        setPlanTypeDropDownOpen(false);

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
        setToast({
          kind: 'error',
          title: 'Error',
          subtitle: 'There was an error loading the catalog items.'
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, isDuAdmin]);

  return (
    <Portal>
      <Modal
        className={css({ w: 'full' })}
        onKeyDown={handleKeyDownOnModal}
        ref={addCurriculumModal.modalRef}
      >
        <StyledCurriculumContainer>
          <Flex
            direction="column"
            gap={spacing[8]}
            style={{
              background: colors.background.admin,
              padding: `${spacing[8]} ${spacing[14]}`,
              maxHeight: '100vh',
              overflow: 'auto'
            }}
          >
            <Button
              kind="text"
              size="sm"
              disabled={checkingOut}
              onClick={onClose}
            >
              <Text variant="dark" style={{ color: `${colors.purple[800]}` }}>
                &lt; Back To Assign Training
              </Text>
            </Button>
            <Text size="h3" fontWeight="bold">
              Select Training {userFriendlySourceLabel}
            </Text>
            <CurriculumSearch
              onSearch={handleQueryChange}
              disabled={checkingOut}
            />

            {/* Filters */}
            {((filter.search && total >= 0) || loadedItems.length > 0) && (
              <Flex gap={spacing[4]}>
                <Text size="p" fontWeight="medium">
                  {total} Results Found
                </Text>

                {/* Item Type dropdown */}
                {itemTypeList.length > 1 && (
                  <Flex alignItems="flex-end" gap={spacing[1]}>
                    <Text size="p" fontWeight="medium">
                      Item Type:
                    </Text>
                    <Text
                      size="p"
                      fontWeight="medium"
                      style={{
                        textDecoration: 'underline',
                        cursor: 'pointer'
                      }}
                      onClick={() =>
                        setItemTypeDropDownOpen(
                          previousStatus => !previousStatus
                        )
                      }
                    >
                      {filter.type || 'All'}
                    </Text>
                    <DropDown
                      icon={<CaretDown />}
                      links={itemTypeList}
                      open={itemTypeDropDownOpen}
                    />
                  </Flex>
                )}

                {/* Vendor Dropdown */}
                {/* Only shown if we are searching for courses or assessments */}
                {vendorsReady &&
                  ['Course', 'Assessment'].includes(filter.type) && (
                    <Flex alignItems="flex-end" gap={spacing[1]}>
                      <Text size="p" fontWeight="medium">
                        Vendor:
                      </Text>
                      <Text
                        size="p"
                        fontWeight="medium"
                        style={{
                          textDecoration: 'underline',
                          cursor: 'pointer'
                        }}
                        onClick={() =>
                          setVendorDropDownOpen(
                            previousStatus => !previousStatus
                          )
                        }
                      >
                        {filter.vendor?.name || 'Any'}
                      </Text>
                      <DropDown
                        icon={<CaretDown />}
                        links={vendorList}
                        open={vendorDropDownOpen}
                      />
                    </Flex>
                  )}

                {/* Plan Type Dropdown */}
                {/* Only shown if we are searching for plans */}
                {['Plan', 'LearningPath', 'Skill', 'ForceMultiplier'].includes(
                  filter.type
                ) && (
                  <Flex alignItems="flex-end" gap={spacing[1]}>
                    <Text size="p" fontWeight="medium">
                      Plan Type:
                    </Text>
                    <Text
                      size="p"
                      fontWeight="medium"
                      style={{
                        textDecoration: 'underline',
                        cursor: 'pointer'
                      }}
                      onClick={() =>
                        setPlanTypeDropDownOpen(
                          previousStatus => !previousStatus
                        )
                      }
                    >
                      {filter?.planType?.replace(/([A-Z])/g, ' $1').trim() ||
                        'Any'}
                    </Text>
                    <DropDown
                      icon={<CaretDown />}
                      links={planTypeList}
                      open={planTypeDropDownOpen}
                    />
                  </Flex>
                )}
              </Flex>
            )}

            {/* No results */}
            {total === 0 && filter.search && !resultsLoading && (
              <Text size="p" fontWeight="medium">
                No Results Found
              </Text>
            )}

            {/* TODO: Skeleton Loading */}
            {resultsLoading && loadedItems.length === 0 && (
              <StyledSearchLoadingContainer>
                <Text
                  size="h4"
                  variant="light"
                  fontWeight="medium"
                  style={{ color: colors.galaxy[900] }}
                >
                  Loading...
                </Text>
              </StyledSearchLoadingContainer>
            )}

            {/* Results */}
            <StyledCurriculumResultsContainer>
              <ItemCardList
                // @ts-expect-error - types are terrible in this component
                checkingOut={checkingOut}
                existingCurriculum={existingCurriculum}
                items={loadedItems}
                cart={cart}
                onAddToCart={handleAddToCart}
                setShowPreviewFor={setShowPreviewFor}
              />
              {/* Load More */}
              {filter.search &&
                loadedItems?.length !== 0 &&
                loadedItems?.length < total &&
                !resultsLoading && (
                  <Button
                    style={{ alignSelf: 'center', marginTop: spacing[4] }}
                    kind="pill-primary"
                    onClick={handleLoadMore}
                  >
                    Load More
                  </Button>
                )}
            </StyledCurriculumResultsContainer>
          </Flex>

          {/* Default cart state */}
          {cart.length === 0 && (
            <Flex
              alignItems="center"
              justifyContent="center"
              style={{
                padding: spacing[4],
                maxHeight: '100dvh',
                overflow: 'auto',
                position: 'relative',
                backgroundColor: colors.white
              }}
            >
              <Text
                size="h4"
                variant="light"
                fontWeight="medium"
                style={{ color: colors.galaxy[900] }}
              >
                No Items Added
              </Text>
            </Flex>
          )}

          {/* Items in Cart */}
          {cart.length > 0 && (
            <Flex
              direction="column"
              gap={spacing[4]}
              style={{
                padding: `${spacing[4]}`,
                maxHeight: '100vh',
                overflow: 'auto',
                position: 'relative',
                backgroundColor: colors.gray[0]
              }}
            >
              <Text size="p" fontWeight="medium">
                {cart.length} item{cart.length > 1 ? 's' : ''} selected
              </Text>
              <ItemCardList
                ref={cartListRef}
                // @ts-expect-error - types are not good in this component
                items={cart}
                onRemoveFromCart={handleRemoveFromCart}
                checkingOut={checkingOut}
              />
              <Flex
                style={{
                  position: 'fixed', // So it stays down on scroll
                  right: 0,
                  bottom: 0,
                  width: '33.33%', // To match grid
                  background: colors.gray[0],
                  padding: `${spacing[6]} ${spacing[4]}`,
                  boxShadow: isItemCardListScrollable
                    ? `0px -1px 4px rgba(0, 0, 0, 0.25)`
                    : ''
                }}
              >
                <Button
                  disabled={checkingOut}
                  loading={checkingOut}
                  loadingText="Add to Training Criteria"
                  onClick={handleSubmitCart}
                  kind="pill-primary"
                  fullWidth
                >
                  Add To Training Criteria
                </Button>
              </Flex>
            </Flex>
          )}

          {showPreviewFor !== null && (
            <HostedContentPreviewContainer
              item={showPreviewFor}
              onClose={() => {
                setShowPreviewFor(null);
              }}
            />
          )}
        </StyledCurriculumContainer>
      </Modal>
    </Portal>
  );
};

export default AddCurriculumModal;
