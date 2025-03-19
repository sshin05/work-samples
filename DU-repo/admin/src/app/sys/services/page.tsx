'use client';
import { css } from '@cerberus/styled-system/css';
import { vstack, hstack } from '@cerberus/styled-system/patterns';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { PageHeader } from '@/components_new/typography/PageHeader';
import { CheckmarkFilled, CloseFilled, HelpFilled } from '@cerberus/icons';
import { useGetServiceHealth } from '@/api/services/useGetServiceHealth';

import type { JSX } from 'react';

const ServicesPage = () => {
  const { services, serviceHealthLoading } = useGetServiceHealth();

  interface StatusContent {
    icon?: JSX.Element;
    text: JSX.Element;
  }

  const getStatusContent = (status: string): StatusContent => {
    if (serviceHealthLoading) {
      return {
        icon: null,
        text: (
          <span
            className={css({
              minWidth: '60px',
              textAlign: 'left',
              textStyle: 'body-sm',
              color: 'page.text.initial'
            })}
          >
            Loading...
          </span>
        )
      };
    }

    switch (status) {
      case 'RUNNING':
        return {
          icon: (
            <CheckmarkFilled
              className={css({
                color: 'success.border.initial',
                w: '5',
                h: '5'
              })}
            />
          ),
          text: (
            <span
              className={css({
                minWidth: '60px',
                textAlign: 'left',
                textStyle: 'body-sm',
                color: 'page.text.initial'
              })}
            >
              Running
            </span>
          )
        };
      case 'ERROR':
        return {
          icon: (
            <CloseFilled
              className={css({ color: 'danger.bg.initial', w: '5', h: '5' })}
            />
          ),
          text: (
            <span
              className={css({
                minWidth: '60px',
                textAlign: 'left',
                textStyle: 'body-sm',
                color: 'page.text.initial'
              })}
            >
              Error
            </span>
          )
        };
      case 'UNAVAILABLE':
        return {
          icon: (
            <HelpFilled
              className={css({ color: 'warning.surface.200', w: '5', h: '5' })}
            />
          ),
          text: (
            <span
              className={css({
                color: 'warning.surface.200',
                minWidth: '60px',
                textAlign: 'left'
              })}
            >
              Unavailable
            </span>
          )
        };
      default:
        return {
          icon: null,
          text: (
            <span
              className={css({
                minWidth: '60px',
                textAlign: 'left'
              })}
            >
              Unknown
            </span>
          )
        };
    }
  };

  return (
    <MainContentVStack>
      <PageHeader>Services</PageHeader>
      <div className={vstack({ gap: '0', w: 'full' })}>
        <div
          className={css({
            w: 'full',
            h: '1px',
            bg: 'page.border.100',
            mt: '10'
          })}
        />
        {services.map((service, index) => {
          const statusContent = getStatusContent(service.status);

          return (
            <div
              key={service.name}
              className={hstack({
                bg:
                  index % 2 === 1 ? 'page.surface.initial' : 'page.surface.100',
                w: 'full',
                p: '2',
                justifyContent: 'space-between',
                borderBottomWidth: '1px',
                borderColor: 'page.border.100'
              })}
            >
              <span
                className={css({
                  textStyle: 'body-sm',
                  color: 'page.text.initial'
                })}
              >
                {service.name}
              </span>
              <div
                className={hstack({
                  gap: '2',
                  w: '120px',
                  justifyContent: 'center',
                  alignItems: 'center'
                })}
              >
                {statusContent.icon}
                {statusContent.text}
              </div>
            </div>
          );
        })}
      </div>
    </MainContentVStack>
  );
};

export default ServicesPage;
