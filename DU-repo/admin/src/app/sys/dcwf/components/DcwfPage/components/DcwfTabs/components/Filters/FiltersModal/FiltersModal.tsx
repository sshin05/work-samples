import { CustomModal } from '@/components_new/modals/CustomModal';
import { type UseModalReturnValue, Button, Tag } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { DomainDropdownSearch, type Domain } from './DomainDropdownSearch';
import { useEffect, useState } from 'react';
import { canPaginate } from '@/utils/data/canPaginate';
import { useFindDomains } from '@/api/dcwf/domain/useFindDomains';
import { KsatType, type SortByMostRelevant } from '@/api/codegen/graphql';

interface FiltersModalProps {
  type: 'ksat' | 'jobRole' | 'learningObjective';
  filtersModal: UseModalReturnValue;
  filters: {
    ksatTypes: KsatType[];
    domains: Domain[];
  };
  onApplyFilters: (filters: {
    ksatTypes: KsatType[];
    domains: Domain[];
  }) => void;
  resetFilters: () => void;
}

const ksatTypes: KsatType[] = [
  KsatType.Knowledge,
  KsatType.Skill,
  KsatType.Ability,
  KsatType.Task
];
const PAGE_SIZE = 10;

type SelectableTagProps = {
  label: string;
  isSelected: boolean;
  onClick: () => void;
};

export const SelectableTag = ({
  label,
  isSelected,
  onClick
}: SelectableTagProps) => {
  return (
    <div onClick={onClick} style={{ cursor: 'pointer' }}>
      <Tag
        {...(isSelected
          ? {
              onClick,
              className: css({
                color: 'action.text.inverse',
                h: '32px',
                '& button': {
                  h: '32px',
                  w: '32px'
                }
              })
            }
          : {
              usage: 'outlined',
              className: css({
                h: '32px',
                borderColor: 'action.border.initial',
                color: 'action.text.static',
                _hover: {
                  bgColor: 'action.ghost.hover'
                }
              })
            })}
      >
        {label}
      </Tag>
    </div>
  );
};

export const FiltersModal = ({
  type,
  filtersModal,
  filters,
  onApplyFilters,
  resetFilters
}: FiltersModalProps) => {
  const [selectedKsatTypes, setSelectedKsatTypes] = useState<KsatType[]>(
    filters.ksatTypes
  );
  const [selectedDomains, setSelectedDomains] = useState<Domain[]>(
    filters.domains
  );
  const [domains, setDomains] = useState<Domain[]>([]);
  const [findDomainsPageNumber, setFindDomainsPageNumber] = useState(1);
  const { domains: newDomains, domainsTotal } = useFindDomains({
    pageSize: PAGE_SIZE,
    pageNumber: findDomainsPageNumber,
    sortByMostRelevant: type as SortByMostRelevant
  });
  const isMoreDomains = canPaginate(
    findDomainsPageNumber,
    PAGE_SIZE,
    domainsTotal
  );

  useEffect(() => {
    if (newDomains?.length) {
      setDomains(prevDomains => {
        // Filter out duplicates in case domain is already selected from dropdown
        const existingDomainIds = new Set(prevDomains.map(d => d.id));
        const uniqueNewDomains = newDomains.filter(
          domain => !existingDomainIds.has(domain.id)
        );
        return [...prevDomains, ...uniqueNewDomains];
      });
    }
  }, [newDomains, findDomainsPageNumber]);

  useEffect(() => {
    setSelectedKsatTypes(filters.ksatTypes);
    setSelectedDomains(filters.domains);
  }, [filters]);

  const handleSubmitFilters = () => {
    onApplyFilters({ ksatTypes: selectedKsatTypes, domains: selectedDomains });
    filtersModal.close();
  };

  const onClose = () => {
    filtersModal.close();
  };

  const handleFetchMoreDomains = () => {
    setFindDomainsPageNumber(findDomainsPageNumber + 1);
  };

  return (
    <CustomModal
      customModal={filtersModal}
      title="Filter"
      onClose={onClose}
      modalStyles={css({ minW: '30vw' })}
    >
      <div
        className={vstack({
          gap: '8',
          alignItems: 'flex-start',
          w: 'full',
          h: 'full'
        })}
      >
        <div className={vstack({ gap: '2', px: '8' })}>
          <label
            htmlFor="ksatType"
            className={css({
              display: 'flex',
              alignSelf: 'flex-start',
              textStyle: 'label-md'
            })}
          >
            KSAT Type
          </label>
          <div className={hstack({ gap: '8' })}>
            {ksatTypes.map(type => {
              const isSelected = selectedKsatTypes.includes(type);
              return (
                <SelectableTag
                  key={type}
                  label={type}
                  isSelected={isSelected}
                  onClick={() =>
                    isSelected
                      ? setSelectedKsatTypes(
                          selectedKsatTypes.filter(value => value !== type)
                        )
                      : setSelectedKsatTypes([...selectedKsatTypes, type])
                  }
                />
              );
            })}
          </div>
        </div>

        <div className={vstack({ gap: '2', px: '8', w: 'full' })}>
          <DomainDropdownSearch
            selectedDomains={selectedDomains}
            selectDomain={domain => {
              setSelectedDomains([...selectedDomains, domain]);
              setDomains(prevDomains => {
                if (
                  prevDomains.some(prevDomain => prevDomain.id === domain.id)
                ) {
                  return prevDomains;
                }
                return [domain, ...prevDomains];
              });
            }}
          />

          <div
            className={css({
              maxH: '200px',
              overflowY: 'auto',
              w: 'full',
              display: 'flex',
              flexWrap: 'wrap',
              columnGap: '3',
              rowGap: '4',
              p: '1'
            })}
          >
            {domains.map(domain => {
              const isSelected = selectedDomains
                .map(domain => domain.id)
                .includes(domain.id);
              return (
                <SelectableTag
                  key={domain.id}
                  label={domain.name}
                  isSelected={isSelected}
                  onClick={() =>
                    isSelected
                      ? setSelectedDomains(
                          selectedDomains.filter(
                            value => value.id !== domain.id
                          )
                        )
                      : setSelectedDomains([...selectedDomains, domain])
                  }
                />
              );
            })}
          </div>

          {isMoreDomains && (
            <div
              onClick={handleFetchMoreDomains}
              className={css({
                cursor: 'pointer',
                textStyle: 'label-sm',
                mt: '4',
                _hover: {
                  textDecoration: 'underline'
                }
              })}
            >
              +10 more
            </div>
          )}
        </div>

        <div
          className={hstack({
            gap: '4',
            mt: 'auto'
          })}
        >
          <Button
            onClick={handleSubmitFilters}
            type="submit"
            palette="action"
            shape="rounded"
          >
            View Items
          </Button>
          <Button
            type="button"
            palette="action"
            shape="rounded"
            usage="outlined"
            onClick={resetFilters} // This only resets the form state, not the parent state
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </CustomModal>
  );
};
