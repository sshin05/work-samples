import { Flex, Grid, GridItem } from '@cerberus/styled-system/jsx';
import { css } from '@cerberus/styled-system/css';
import ContentArea from '@/components_new/layout/ContentArea';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { PageHeader } from '@/components_new/typography/PageHeader';
import { SectionTitle } from './components/SectionTitle/';
import { ItemsSection } from './components/ItemsSection/';

const Loading = () => {
  return (
    <MainContentVStack>
      <PageHeader>Custom Training</PageHeader>

      {/* Plan blocks skeleton */}
      <ContentArea>
        <Flex flexDirection="column" gap="md">
          <SectionTitle title="Plans" loading />
          <Grid columns={3} gap="md">
            {Array.from({ length: 3 }).map((_, index) => (
              <GridItem key={index}>
                <div
                  className={css({
                    w: 'full',
                    minH: '120px'
                  })}
                  aria-busy="true"
                  aria-label="Loading plan"
                >
                  <span>Loading plan</span>
                </div>
              </GridItem>
            ))}
          </Grid>
        </Flex>
      </ContentArea>

      {/* Items table skeleton */}
      <ContentArea>
        <Flex flexDirection="column" gap="md">
          <SectionTitle title="Items" loading />
          <ItemsSection loading />
        </Flex>
      </ContentArea>
    </MainContentVStack>
  );
};

export default Loading;
