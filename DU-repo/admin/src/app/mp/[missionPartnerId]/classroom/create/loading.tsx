import { ClassroomBackground } from '../components/MpClassroomPage/components/ClassroomBackground/ClassroomBackground';
import { css } from '@cerberus/styled-system/css';
import { Button } from '@cerberus/react';

import { flex } from '@cerberus/styled-system/patterns';

const CreateCohortLoadingView = () => {
  return (
    <div
      className={css({
        display: 'flex',
        h: '100vh'
      })}
    >
      <ClassroomBackground />

      <nav
        className={css({
          width: '248px',
          backgroundColor: 'page.surface.100',
          pt: 8,
          mb: '98px', // account for fixed footer height, ensure all elements in nav visible when scrolling
          px: 6,
          boxShadow: '-2px 0px 16px 0px rgba(0, 0, 0, 0.05)',
          overflow: 'auto',
          minHeight: '100%'
        })}
      >
        <Button
          aria-busy
          disabled
          palette="action"
          shape="sharp"
          usage="outlined"
          size="sm"
          className={css({
            borderRadius: 'lg',
            border: '1px solid',
            borderColor: 'page.border.100',
            mb: 12
          })}
        >
          Save and close
        </Button>

        <div
          aria-busy
          className={css({
            minH: '20px',
            minW: '200px'
          })}
        ></div>
      </nav>
      <div className={css({ flex: 1, my: 16 })}>
        <main className={css({ maxW: '700px', m: '0 auto' })}>
          <div
            aria-busy
            className={flex({
              bgColor: 'page.surface.100',
              border: '1px solid',
              borderColor: 'page.border.100',
              borderRadius: 'md',
              alignItems: 'center',
              p: 6
            })}
          ></div>
          <div
            aria-busy
            className={css({
              mt: 16,
              maxW: '520px',
              m: '0 auto',
              minH: '440px'
            })}
          ></div>
        </main>
      </div>
      <footer
        className={css({
          width: '100%',
          py: 5,
          px: 16,
          backgroundColor: 'page.surface.100',
          borderTop: '1px solid',
          borderColor: 'page.border.100',
          textAlign: 'right',
          position: 'absolute',
          bottom: 0,
          left: 0,
          zIndex: 1
        })}
      >
        <Button
          aria-busy
          disabled
          palette="action"
          shape="rounded"
          usage="outlined"
          size="sm"
          className={css({ mr: 4 })}
        >
          Cancel
        </Button>
        <Button aria-busy disabled>
          Next
        </Button>
      </footer>
    </div>
  );
};

export default CreateCohortLoadingView;
