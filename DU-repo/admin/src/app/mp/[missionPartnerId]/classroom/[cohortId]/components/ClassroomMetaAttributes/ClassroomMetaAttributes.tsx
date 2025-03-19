'use client';
import type { sqlGetMissionPartnerById } from '@/app/api/mission-partner';
import ImageFetcher from '@/app/marketplace/components/ImageFetcher/ImageFetcher';
import {
  Badge,
  CategoryNewEach,
  Education,
  Timer,
  User
} from '@cerberus/icons';
import { css } from '@cerberus/styled-system/css';
import { hstack } from '@cerberus/styled-system/patterns';
import type { ReactNode } from 'react';
import type { CohortData } from '../../cohort.types';

const ICON_SIZE = 16;

const StyledSeparator = () => (
  <span className={css({ color: 'cerberus.neutral.10' })}>|</span>
);

const StyledMeta = ({ icon, text }: { icon: ReactNode; text: string }) => (
  <div className={hstack({ gap: '2' })}>
    <span className={css({ color: 'cerberus.brand.60' })}>{icon}</span>
    <span className={css({ textStyle: 'body-md' })}>{text}</span>
  </div>
);

export const ClassroomMetaAttributes = ({
  missionPartner,
  cohort
}: {
  missionPartner: Awaited<
    ReturnType<typeof sqlGetMissionPartnerById>
  >['_serviceData'];
  cohort: CohortData;
}) => {
  return (
    <div className={hstack({ gap: '4', flexWrap: 'wrap' })}>
      <StyledMeta
        icon={
          <ImageFetcher
            src={missionPartner?.logoUrl}
            fallbackSrc="/admin/images/digitalu-logo.svg"
            alt=""
            width={20}
            height={20}
          />
        }
        text={missionPartner?.name}
      />

      {cohort.evaluationType ? (
        <>
          <StyledSeparator />
          <StyledMeta
            icon={<Education size={ICON_SIZE} />}
            text={cohort.evaluationType}
          />
        </>
      ) : null}

      {/* /// @TODO(Lyle): How will we get the clearance? */}
      <StyledSeparator />
      <StyledMeta icon={<Badge size={ICON_SIZE} />} text="TS/SCI" />

      {cohort.environment ? (
        <>
          <StyledSeparator />
          <StyledMeta
            icon={<User size={ICON_SIZE} />}
            text={cohort.environment}
          />
        </>
      ) : null}

      {/* /// @TODO(Lyle): How will we calculate the duration? Is this server side or FE concern? */}
      <StyledSeparator />
      <StyledMeta icon={<Timer size={ICON_SIZE} />} text="1 Week" />

      {/* /// @TODO(Lyle): Where is the cohort category coming from? */}
      <StyledSeparator />
      <StyledMeta
        icon={<CategoryNewEach size={ICON_SIZE} />}
        text="Full Spectrum Cyber"
      />
    </div>
  );
};
