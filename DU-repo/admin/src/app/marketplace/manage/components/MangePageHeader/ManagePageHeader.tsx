import { css } from '@cerberus/styled-system/css';
import { flex } from '@cerberus/styled-system/patterns';
import { GuiManagement } from '@cerberus/icons';
import { Breadcrumbs } from '@/app/marketplace/components/Breadcrumbs/Breadcrumbs';
import type { BreadcrumbPath } from '@/app/marketplace/components/Breadcrumbs/Breadcrumbs.types';

type ManagePageHeaderProps = {
  breadcrumbs: BreadcrumbPath[];
  title: string;
  subtitle?: string;
  description: string;
};

const ManagePageHeader = ({
  breadcrumbs,
  title,
  subtitle,
  description
}: ManagePageHeaderProps) => {
  return (
    <div
      role="banner"
      className={css({
        h: '396px'
      })}
    >
      <div
        className={css({
          h: 'full',
          w: 'full',
          pos: 'relative'
        })}
      >
        <div
          className={css({
            h: 'full',
            background: `
            url(/admin/images/topo.webp) lightgray 50% / cover no-repeat`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            margin: '0'
          })}
        >
          {/* Background Overlay */}
          <div
            className={css({
              w: 'full',
              h: 'full',
              position: 'absolute',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  'radial-gradient(circle at 41% 29%, #14120f, #4f3e29)',
                opacity: 0.8
              }
            })}
          />
          <div
            className={css({
              p: '16',
              maxW: '8xl',
              m: '0 auto',
              position: 'relative',
              zIndex: 1
            })}
          >
            <Breadcrumbs breadcrumbs={breadcrumbs} loading={false} />
            <div
              className={flex({
                mt: '5',
                pt: '3',
                alignItems: 'start',
                maxW: '4xl'
              })}
            >
              <div className={css({ pl: '4' })}>
                <GuiManagement width="72px" height="72px" />
              </div>
              <div className={css({ ml: '9' })}>
                <h1
                  className={css({
                    textStyle: 'h1',
                    lineClamp: '1',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight: '',
                    fontSize: '3xl'
                  })}
                >
                  {title}
                </h1>

                {subtitle && (
                  <p
                    className={css({
                      mb: '3',
                      textStyle: 'label-sm',
                      color: 'page.text.200'
                    })}
                  >
                    {subtitle}
                  </p>
                )}

                <p className={css({})}>{description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePageHeader;
