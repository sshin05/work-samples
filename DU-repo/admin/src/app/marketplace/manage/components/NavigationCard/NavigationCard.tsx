import { Button } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { flex, hstack } from '@cerberus/styled-system/patterns';
import Link from 'next/link';

export type NavigationCardProps = {
  title: string;
  description: string;
  url: string;
};

export const NavigationCard = ({
  title,
  description,
  url
}: NavigationCardProps) => {
  return (
    <div
      className={css({
        bg: 'page.surface.200',
        px: '6',
        py: '8',
        borderRadius: 'sm'
      })}
    >
      <div className={flex()}>
        <div
          className={flex({ direction: 'column', height: 'full', gap: '4' })}
        >
          <h3
            className={css({
              textStyle: 'h4',
              letterSpacing: '0.01em',
              wordBreak: 'normal',
              whiteSpace: 'normal',
              overflowWrap: 'break-word',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              verticalAlign: 'middle',
              lineClamp: '2'
            })}
          >
            {title}
          </h3>

          <p
            className={css({
              lineClamp: '3',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            })}
          >
            {description}
          </p>
        </div>

        <div
          className={hstack({
            gap: '4',
            ml: 'auto',
            marginTop: 'auto'
          })}
        >
          <Link href={url}>
            <Button
              disabled={false}
              palette="action"
              shape="sharp"
              usage="filled"
            >
              Go to {title}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
