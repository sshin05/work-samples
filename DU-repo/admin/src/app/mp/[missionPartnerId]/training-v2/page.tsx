import type { Blocks } from '@digital-u/services/block/types';
import { findBlocks } from '@digital-u/services/block/find-blocks';
import { Add, ExpandAll } from '@carbon/icons-react';
import { Flex, Grid, GridItem } from '@cerberus/styled-system/jsx';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { PageHeader } from '@/components_new/typography/PageHeader';
import ContentArea from '@/components_new/layout/ContentArea';
import { Section } from './components/Section/';
import { SectionTitle } from './components/SectionTitle/';
import { ItemsSection } from './components/ItemsSection/';
import { css } from '@cerberus/styled-system/css';
import Link from 'next/link';
import { routeGenerators } from '@/utils/getRouteUrl';

const Page = async ({
  params
}: {
  params: Promise<{ missionPartnerId: string }>;
}) => {
  const { missionPartnerId } = await params;

  const planBlocks = await findBlocks({
    filter: { type: 'plan', missionPartnerId, isRoot: true },
    pageSize: 6
  });

  const blocksWithoutPlans = await findBlocks({
    filter: { missionPartnerId, isRoot: true, exclude: ['plan'] },
    pageSize: 1000
  });

  return (
    <MainContentVStack>
      <PageHeader>Custom Training</PageHeader>

      {/* Plan blocks section */}
      <ContentArea>
        <Flex flexDirection="column" gap="md">
          <SectionTitle
            title="Plans"
            total={planBlocks.total}
            addHref={routeGenerators.CurriculumCreateByType({
              missionPartnerId,
              type: 'plan'
            })}
          />
          {planBlocks.records.length > 0 ? (
            <Grid columns={3} gap="md">
              {planBlocks.records.map(block => (
                // This is just a place holder, exact design will need to be implemented
                // in a later ticket.
                <GridItem
                  key={block.id}
                  className={css({
                    background: 'page.surface.100',
                    borderRadius: 'lg',
                    padding: 'md',
                    border: '1px solid',
                    borderColor: 'page.border.100'
                  })}
                >
                  <Link
                    href={routeGenerators.CurriculumViewFirstItem({
                      missionPartnerId,
                      blockId: block.id
                    })}
                  >
                    {block.title}
                  </Link>
                </GridItem>
              ))}
            </Grid>
          ) : (
            <Section
              icon={({ size }: { size: number }) => <ExpandAll size={size} />}
              header="Your program does not have any training plans."
              body="Once there are plans added, they'll show up here. Or get started by making one now."
              cta="Create a new plan"
              href={routeGenerators.CurriculumCreateByType({
                missionPartnerId,
                type: 'plan'
              })}
            />
          )}
        </Flex>
      </ContentArea>

      {/* Items table */}
      <ContentArea>
        <Flex flexDirection="column" gap="md">
          <SectionTitle
            title="Items"
            total={blocksWithoutPlans.total}
            addHref={routeGenerators.CurriculumCreate({
              missionPartnerId
            })}
          />
          {blocksWithoutPlans.records.length > 0 ? (
            <ItemsSection data={blocksWithoutPlans.records as Blocks[]} />
          ) : (
            <Section
              icon={({ size }: { size: number }) => <Add size={size} />}
              header="You have not created any custom training items."
              body="Once there are custom training items added, they’ll show up here. Or get started by making one now."
              cta="Create a new training"
              href={routeGenerators.CurriculumCreate({
                missionPartnerId
              })}
            />
          )}
        </Flex>
      </ContentArea>
    </MainContentVStack>
  );
};

export default Page;
