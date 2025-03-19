import { Avatar } from '@cerberus/react';
import { Search } from '@cerberus/icons';
import { css } from '@cerberus/styled-system/css';
import { vstack } from '@cerberus/styled-system/patterns';

export const callToAction = (
  hasFiltersApplied: boolean,
  noDataMessage: React.ReactNode,
  globalFilter?: string,
  searchTerm?: string,
  isServerSide?: boolean
) => {
  if (!isServerSide) {
    if (hasFiltersApplied && globalFilter) {
      return (
        <div className={vstack({ gap: 4 })}>
          <Avatar
            gradient="charon-light"
            ariaLabel=""
            size="md"
            src=""
            icon={
              <span
                className={css({
                  display: 'inline-block',
                  w: '1/2'
                })}
              >
                <Search size="lg" />
              </span>
            }
          />
          <p>
            No results returned. Please try amending your search and/or filter
            criteria.
          </p>
        </div>
      );
    }
    if (hasFiltersApplied) {
      return (
        <div className={vstack({ gap: 4 })}>
          <Avatar
            gradient="charon-light"
            ariaLabel=""
            size="md"
            src=""
            icon={
              <span
                className={css({
                  display: 'inline-block',
                  w: '1/2'
                })}
              >
                <Search size="lg" />
              </span>
            }
          />
          <p>
            Your filter criteria did not return any results. Please try amending
            your filter criteria.
          </p>
        </div>
      );
    }
    if (globalFilter) {
      return (
        <div className={vstack({ gap: 4 })}>
          <Avatar
            gradient="charon-light"
            ariaLabel=""
            size="md"
            src=""
            icon={
              <span
                className={css({
                  display: 'inline-block',
                  w: '1/2'
                })}
              >
                <Search size="lg" />
              </span>
            }
          />
          <p>
            No results found for{' '}
            <span className={css({ fontWeight: 'bold' })}>{globalFilter}</span>.
            Please amend your search.
          </p>
        </div>
      );
    }
    if (searchTerm) {
      return (
        <div className={vstack({ gap: 4 })}>
          <Avatar
            gradient="charon-light"
            ariaLabel=""
            size="md"
            src=""
            icon={
              <span
                className={css({
                  display: 'inline-block',
                  w: '1/2'
                })}
              >
                <Search size="lg" />
              </span>
            }
          />
          <p>
            No results found for{' '}
            <span style={{ fontWeight: 'bold' }}>{searchTerm}</span>. Please
            amend your search.
          </p>
        </div>
      );
    }
    return noDataMessage;
  } else {
    if (hasFiltersApplied && searchTerm) {
      return (
        <div className={vstack({ gap: 4 })}>
          <Avatar
            gradient="charon-light"
            ariaLabel=""
            size="md"
            src=""
            icon={
              <span
                className={css({
                  display: 'inline-block',
                  w: '1/2'
                })}
              >
                <Search size="lg" />
              </span>
            }
          />
          <p>
            No results returned. Please try amending your search and/or filter
            criteria.
          </p>
        </div>
      );
    }
    if (hasFiltersApplied) {
      return (
        <div className={vstack({ gap: 4 })}>
          <Avatar
            gradient="charon-light"
            ariaLabel=""
            size="md"
            src=""
            icon={
              <span
                className={css({
                  display: 'inline-block',
                  w: '1/2'
                })}
              >
                <Search size="lg" />
              </span>
            }
          />
          <p>
            Your filter criteria did not return any results. Please try amending
            your filter criteria.
          </p>
        </div>
      );
    }
    if (searchTerm) {
      return (
        <div className={vstack({ gap: 4 })}>
          <Avatar
            gradient="charon-light"
            ariaLabel=""
            size="md"
            src=""
            icon={
              <span
                className={css({
                  display: 'inline-block',
                  w: '1/2'
                })}
              >
                <Search size="lg" />
              </span>
            }
          />
          <p>
            No results found for{' '}
            <span style={{ fontWeight: 'bold' }}>{searchTerm}</span>. Please
            amend your search.
          </p>
        </div>
      );
    }
    return noDataMessage;
  }
};
