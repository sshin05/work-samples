import { css } from '@cerberus/styled-system/css';
import { Flex } from '@cerberus/styled-system/jsx';
import { Button } from '@cerberus/react';
import { Filter } from '@carbon/icons-react';
import { Search } from '../Search';

export const SidebarSkeleton = () => {
  return (
    <Flex
      background="page.surface.initial"
      position="sticky"
      top={0}
      left={0}
      width="1/3"
      height="calc(100vh - 80px)"
      borderRight="1px solid"
      borderColor="page.border.100"
      paddingY="xl"
      paddingX="lg"
      direction="column"
      gap="md"
    >
      <h2 className={css({ textStyle: 'heading-2xs' })}>Curriculum Contents</h2>
      <Flex gap="sm">
        <Search disabled />
        <Button usage="ghost" disabled>
          <Filter size={16} />
        </Button>
      </Flex>

      <div
        aria-busy="true"
        aria-label="Loading sidebar"
        className={css({ w: 'full' })}
      >
        <span>Loading sidebar</span>
      </div>
    </Flex>
  );
};
