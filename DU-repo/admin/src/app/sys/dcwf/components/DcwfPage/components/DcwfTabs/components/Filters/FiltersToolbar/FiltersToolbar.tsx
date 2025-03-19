import { type KsatType, type Domain } from '@/api/codegen/graphql';
import { hstack } from '@cerberus/styled-system/patterns';
import { SelectableTag } from '../FiltersModal/FiltersModal';
import { css } from '@cerberus/styled-system/css';

type FiltersToolbarProps = {
  selectedKsatTypes: KsatType[];
  selectedDomains: Domain[];
  onKsatTypeClick: (ksatType: KsatType) => void;
  onDomainClick: (domain: Domain) => void;
  onClearAllFilters: () => void;
};

export const FiltersToolbar = ({
  selectedKsatTypes,
  selectedDomains,
  onKsatTypeClick,
  onDomainClick,
  onClearAllFilters
}: FiltersToolbarProps) => {
  const hasFilters = selectedKsatTypes.length > 0 || selectedDomains.length > 0;

  return (
    hasFilters && (
      <div
        className={hstack({
          w: 'full',
          alignItems: 'flex-start',
          gap: 4,
          mt: hasFilters ? '1' : '0'
        })}
      >
        <span
          className={css({
            alignSelf: 'center',
            textStyle: 'label-md'
          })}
        >
          Filtered by
        </span>

        <div
          className={hstack({
            flexWrap: 'wrap',
            columnGap: '3',
            rowGap: '4',
            p: '1'
          })}
        >
          {selectedKsatTypes.map(type => (
            <SelectableTag
              key={`filtered-by-${type}`}
              label={type}
              isSelected
              onClick={() => {
                onKsatTypeClick(type);
              }}
            />
          ))}
          {selectedDomains.map(domain => (
            <SelectableTag
              key={`filtered-by-${domain.id}`}
              label={domain.name}
              isSelected
              onClick={() => {
                onDomainClick(domain);
              }}
            />
          ))}

          <div
            onClick={onClearAllFilters}
            className={css({
              cursor: 'pointer',
              textDecoration: 'underline',
              textStyle: 'label-sm',
              alignSelf: 'center',
              color: 'action.navigation.initial'
            })}
          >
            Clear all
          </div>
        </div>
      </div>
    )
  );
};
