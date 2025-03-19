import { Flex, Grid, GridItem, VStack } from '@cerberus/styled-system/jsx';
import { css } from '@cerberus/styled-system/css';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { InformationSquare, UserSpeaker } from '@carbon/icons-react';
import { Avatar } from '@cerberus/react';
import ContentArea from '@/components_new/layout/ContentArea';

const Loading = () => {
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
          <div
            className={css({ textStyle: 'heading-xs' })}
            aria-busy="true"
            aria-label="Loading"
          >
            Add custom training content
          </div>
          <div
            className={css({ textStyle: 'body-sm' })}
            aria-busy="true"
            aria-label="Loading"
          >
            What sort of content do you want to create?
          </div>
        </VStack>
      </Flex>
      <ContentArea>
        <Grid columns={2}>
          {Array.from({ length: 4 }).map((_, index) => (
            <GridItem key={index}>
              <div
                className={css({
                  w: 'full',
                  borderRadius: 'lg',
                  paddingTop: '2.5rem',
                  paddingBottom: '2.5rem',
                  paddingLeft: 'lg',
                  paddingRight: 'lg',
                  gap: 'md',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: 'fit'
                })}
                aria-busy="true"
                aria-label="Loading create options"
              >
                <Avatar
                  gradient="charon-light"
                  size="md"
                  icon={<UserSpeaker size={24} />}
                  ariaLabel=""
                  src=""
                />
                <h5
                  className={css({
                    textStyle: 'heading-xs',
                    color: 'action.text.200'
                  })}
                >
                  Name
                </h5>
                <p
                  className={css({
                    textStyle: 'body-sm',
                    color: 'page.text.initial'
                  })}
                >
                  Description
                </p>
              </div>
            </GridItem>
          ))}
        </Grid>
      </ContentArea>
    </MainContentVStack>
  );
};

export default Loading;
