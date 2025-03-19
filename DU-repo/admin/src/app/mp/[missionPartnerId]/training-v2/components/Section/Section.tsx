import { Flex } from '@cerberus/styled-system/jsx';
import { Avatar } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { button } from 'styled-system/recipes';
import Link from 'next/link';

import type { JSX } from "react";

type SectionProps = {
  icon: ({ size }: { size: number }) => JSX.Element;
  header: string;
  body: string;
  cta: string;
  href: string;
};

export const Section = ({ icon, header, body, cta, href }: SectionProps) => {
  return (
    <Flex
      className={css({
        h: '360px',
        w: 'full',
        background: 'page.surface.100'
      })}
      alignItems="center"
      justifyContent="center"
      direction="column"
      gap="sm"
    >
      <Avatar
        gradient="charon-light"
        size="lg"
        icon={icon({ size: 24 })}
        ariaLabel=""
        src=""
        className={css({
          marginBottom: 'xl'
        })}
      />

      <Flex direction="column" gap="sm" maxW="3/4">
        <h5
          className={css({
            textStyle: 'heading-md',
            textAlign: 'center'
          })}
        >
          {header}
        </h5>
        <p className={css({ textStyle: 'body-md', textAlign: 'center' })}>
          {body}
        </p>
      </Flex>

      <Link
        className={button({ shape: 'rounded', usage: 'outlined' })}
        href={href}
      >
        {cta} {icon({ size: 16 })}
      </Link>
    </Flex>
  );
};
