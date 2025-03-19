import { hstack, flex } from '@cerberus/styled-system/patterns';
import type { ProductDetailContentBodyProps } from './ProductDetailContentBody.types';
import { css } from '@cerberus/styled-system/css';
import { Show } from '@cerberus/react';
import Image from 'next/image';

export const ProductDetailContentBody = ({
  loading,
  product
}: ProductDetailContentBodyProps) => {
  const hasImage = Boolean(product?.imagePath);
  const contentStyles =
    hasImage || loading ? { flexBasis: '50%' } : { flexBasis: '100%' };

  return (
    <main>
      <div
        className={hstack({
          py: '14',
          px: '16',
          maxW: '8xl',
          mx: 'auto',
          height: '100%',
          alignItems: 'flex-start'
        })}
      >
        <div
          className={flex({
            justifyContent: 'space-between',
            gap: '8',
            width: '100%'
          })}
        >
          <div className={css(contentStyles)}>
            <div
              className={css({
                minH: '3px',
                w: '44px',
                bgColor: 'action.bg.initial',
                mb: '6'
              })}
            ></div>
            <div
              aria-busy={loading}
              className={css({
                minHeight: '24px',
                '& h1': { textStyle: 'heading-xl', mb: '6' },
                '& h2': { textStyle: 'heading-lg', mb: '6' },
                '& h3': { textStyle: 'heading-md', mb: '6' },
                '& h4': { textStyle: 'heading-sm', mb: '6' },
                '& h5': { textStyle: 'heading-xs', mb: '6' },
                '& h6': { textStyle: 'heading-2xs', mb: '6' },
                '& p': { textStyle: 'body', mb: '8' },
                '& ol': { mb: '6', listStyleType: 'decimal', pl: '8' },
                '& ul': { mb: '6', listStyleType: 'disc', pl: '8' },
                '& li': { mb: '2' }
              })}
              dangerouslySetInnerHTML={{ __html: product?.description }}
            ></div>
          </div>

          <Show when={hasImage}>
            <div
              className={css({
                position: 'relative',
                height: '690px',
                flexBasis: '40%'
              })}
            >
              <Image
                src={product?.imagePath}
                alt="Vendor brand image"
                style={{ objectFit: 'cover' }}
                fill
              />
            </div>
          </Show>
        </div>
      </div>
    </main>
  );
};
