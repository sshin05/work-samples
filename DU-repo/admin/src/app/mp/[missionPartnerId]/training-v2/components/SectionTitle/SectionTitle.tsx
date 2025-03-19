import Link from 'next/link';
import { Add } from '@carbon/icons-react';
import { css } from '@cerberus/styled-system/css';
import { Flex } from '@cerberus/styled-system/jsx';
import { button } from 'styled-system/recipes';

export const SectionTitle = ({
  title,
  addHref,
  total,
  loading = false
}: {
  title: string;
  addHref?: string;
  total?: number;
  loading?: boolean;
}) => {
  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Flex alignItems="end" gap="md">
        <h4
          className={css({
            textStyle: 'heading-md',
            lineHeight: 'none'
          })}
        >
          {title}
        </h4>
        {loading ? (
          <div
            aria-busy="true"
            aria-label="Loading total"
            className={css({ w: 'full' })}
          >
            <span>Loading total</span>
          </div>
        ) : (
          <span
            className={css({
              textStyle: 'label-sm'
            })}
          >
            {total} total
          </span>
        )}
      </Flex>
      <div className={css({ flexGrow: 1 })} />

      {total > 0 && addHref && (
        <Link
          className={button({ shape: 'rounded', size: 'sm' })}
          href={addHref}
        >
          Add <Add size={16} />
        </Link>
      )}
    </Flex>
  );
};
