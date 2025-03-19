import { routeGenerators } from '@/utils/getRouteUrl';
import { css } from '@cerberus/styled-system/css';
import { Flex } from '@cerberus/styled-system/jsx';
import { button } from '@cerberus/styled-system/recipes';
import Link from 'next/link';

export default async function CreateCurriculumPageLayout({
  params,
  children
}: {
  params: Promise<{ missionPartnerId: string }>;
  children: React.ReactNode;
}) {
  const { missionPartnerId } = await params;

  return (
    <Flex direction="column" minH="100vh">
      <Flex
        flex="1"
        w={['3/4', '1/2']}
        margin="0 auto"
        padding="lg"
        justifyContent="center"
      >
        {children}
      </Flex>

      <footer
        className={css({
          w: 'full',
          bg: 'gray.100',
          p: '1.25rem 4rem',
          mt: 'auto',
          background: 'page.surface.100',
          borderTop: '1px solid',
          borderColor: 'page.border.100',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end'
        })}
      >
        <Link
          href={routeGenerators.Curriculum({ missionPartnerId })}
          className={button({
            size: 'md',
            usage: 'outlined',
            shape: 'rounded'
          })}
        >
          Cancel
        </Link>
      </footer>
    </Flex>
  );
}
