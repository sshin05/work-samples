import Link from 'next/link';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getBlock } from '@digital-u/services/block/get-block';
import { OverflowMenuVertical, Save } from '@carbon/icons-react';
import { Button, Tag } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { Flex } from '@cerberus/styled-system/jsx';
import { button } from '@cerberus/styled-system/recipes';
import { routeGenerators } from '@/utils/getRouteUrl';
import { Sidebar } from './components/Sidebar/';
import { SidebarSkeleton } from './components/SidebarSkeleton/';

export default async function ViewLayout({
  params,
  children
}: {
  params: Promise<{ missionPartnerId: string; ids: string[] }>;
  children: React.ReactNode;
}) {
  const { missionPartnerId, ids } = await params;

  const rootBlockId = ids[0];
  const rootBlock = await getBlock({
    id: rootBlockId,
    assert: false
  });

  if (!rootBlock) return notFound();

  const currentBlockId = ids.at(-1);

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
        <Link
          href={routeGenerators.Curriculum({ missionPartnerId })}
          className={`${button({
            usage: 'ghost',
            shape: 'rounded',
            size: 'md'
          })} ${css({
            border: '1px solid',
            borderColor: 'page.border.100',
            borderRadius: 'md'
          })}`}
        >
          Save and close <Save size={16} />
        </Link>
        <Flex gap="md" alignItems="center">
          <h1 className={css({ textStyle: 'heading-xs' })}>
            {rootBlock.title}
          </h1>
          {rootBlock.version !== null && <Tag>V{rootBlock.version}</Tag>}
          <span className={css({ textStyle: 'label-sm' })}>
            Autosaved just now
          </span>
        </Flex>

        <Button size="sm" usage="ghost">
          <OverflowMenuVertical size={16} />
        </Button>
      </Flex>

      <Flex>
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar rootBlock={rootBlock} currentBlockId={currentBlockId} />
        </Suspense>
        <Flex padding="xl" w="full" direction="column" gap="md">
          {children}
        </Flex>
      </Flex>
    </>
  );
}
