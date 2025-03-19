import { button } from '@cerberus/styled-system/recipes';
import { css } from '@cerberus/styled-system/css';
import { Flex } from '@cerberus/styled-system/jsx';
import { OverflowMenuVertical, Save } from '@carbon/icons-react';
import { SidebarSkeleton } from './[...ids]/components/SidebarSkeleton';
import { Button } from '@cerberus/react';

const Loading = () => {
  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        position="sticky"
        top={0}
        zIndex={1000}
        bg="page.surface.initial"
        height="80px"
        borderBottom="1px solid"
        borderColor="page.border.initial"
        paddingX="md"
        paddingY="sm"
      >
        <div
          className={`${button({
            usage: 'ghost',
            shape: 'rounded',
            size: 'md'
          })} ${css({
            border: '1px solid',
            borderColor: 'page.border.100',
            borderRadius: 'md'
          })}`}
          aria-busy="true"
          aria-label="Save button loading"
        >
          Save and close <Save size={16} />
        </div>
        <Flex gap="md" alignItems="center">
          <div
            aria-busy="true"
            aria-label="Loading title"
            className={css({ w: 'full' })}
          >
            <h1 className={css({ textStyle: 'heading-xs' })}>Loading title</h1>
          </div>
          <div
            aria-busy="true"
            aria-label="Autosaved just now"
            className={css({ w: 'full' })}
          >
            <span className={css({ textStyle: 'label-sm' })}>
              Loading auto save information
            </span>
          </div>
        </Flex>

        <Button size="sm" usage="ghost" disabled>
          <OverflowMenuVertical size={16} />
        </Button>
      </Flex>

      <Flex>
        <SidebarSkeleton />

        <Flex padding="xl" w="full" direction="column">
          <div
            aria-busy="true"
            aria-label="Loading content"
            className={css({ w: 'full' })}
          >
            <span>Loading content</span>
          </div>
        </Flex>
      </Flex>
    </>
  );
};

export default Loading;
