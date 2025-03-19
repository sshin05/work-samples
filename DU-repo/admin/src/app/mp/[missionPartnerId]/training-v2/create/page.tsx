import { blockTypeMetadata } from '@digital-u/services/block/types';
import { InformationSquare } from '@carbon/icons-react';
import { Avatar } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { Flex, Grid, VStack } from '@cerberus/styled-system/jsx';
import ContentArea from '@/components_new/layout/ContentArea';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { CreateCard } from './components/CreateCard';
import { createBlock } from '../actions/create-block';

const CreateCurriculumPage = async ({
  params,
  searchParams
}: {
  params: Promise<{ missionPartnerId: string }>;
  searchParams: Promise<{ type?: string }>;
}) => {
  const { missionPartnerId } = await params;
  const { type } = await searchParams;

  if (type === 'plan')
    return createBlock({
      missionPartnerId,
      type: 'plan',
      name: 'Plan',
      isRoot: true
    });

  const rootBlocks = blockTypeMetadata.filter(block => block.root);

  return (
    <MainContentVStack>
      <Flex
        alignSelf="center"
        justifyContent="baseline"
        alignItems="center"
        gap="xl"
        background="page.surface.initial"
        padding="lg"
        border="1px solid"
        borderColor="page.border.100"
        borderRadius="sm"
        w="full"
      >
        <Avatar
          gradient="charon-light"
          size="sm"
          icon={<InformationSquare size={16} />}
          ariaLabel=""
          src=""
        />
        <VStack alignItems="baseline" gap="sm">
          <h4 className={css({ textStyle: 'heading-xs' })}>
            Add custom training content
          </h4>
          <p className={css({ textStyle: 'body-sm' })}>
            What sort of content do you want to create?
          </p>
        </VStack>
      </Flex>
      <ContentArea>
        <form>
          <Grid columns={2}>
            {rootBlocks.map(blockMetadata => (
              <CreateCard
                key={blockMetadata.id}
                missionPartnerId={missionPartnerId}
                blockMetadata={blockMetadata}
              />
            ))}
          </Grid>
        </form>
      </ContentArea>
    </MainContentVStack>
  );
};

export default CreateCurriculumPage;
