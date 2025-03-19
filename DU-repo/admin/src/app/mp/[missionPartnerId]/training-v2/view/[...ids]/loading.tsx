import {
  Admonition,
  AdmonitionDescription,
  AdmonitionHeading
} from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { Flex } from '@cerberus/styled-system/jsx';

export default function Loading() {
  return (
    <>
      <Admonition
        palette="page"
        usage="outlined"
        className={css({
          h: 'fit-content',
          w: 'full',
          marginBottom: '2.5rem'
        })}
      >
        <div aria-busy="true" aria-label="Loading title">
          <AdmonitionHeading>Start with a lesson</AdmonitionHeading>
          <AdmonitionDescription>
            Get started quickly with a lesson.
          </AdmonitionDescription>
        </div>
      </Admonition>

      <Flex flexDirection="column" gap="md">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            aria-busy="true"
            aria-label="Loading child"
            className={css({ w: 'full' })}
          >
            <Admonition
              palette="page"
              usage="outlined"
              className={css({
                h: 'fit-content',
                w: 'full',
                marginBottom: '2.5rem'
              })}
            />
          </div>
        ))}
      </Flex>
    </>
  );
}
