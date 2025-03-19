/* eslint-disable arrow-body-style */
import React from 'react';
import { type VendorOptions, Text } from '@digital-u/digital-ui';
import { startCase, toLower } from 'lodash';
import { TrainingVendorRow } from './TrainingVendorRow';
import { Button } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { vstack, hstack } from '@cerberus/styled-system/patterns';

interface ExamTrainingCardProps {
  formattedType?: string;
  title?: string;
  buttonTitle?: string;
  buttonOnClick?: () => void;
  duration?: string;
  vendors?: VendorOptions[];
}

const ExamTrainingCard = ({
  formattedType,
  title,
  buttonTitle = 'Start',
  duration,
  vendors,
  buttonOnClick
}: ExamTrainingCardProps) => {
  const showVendorRow = duration || vendors?.length > 0;
  const titleCaseTitle = startCase(toLower(title || ''));

  return (
    <div
      className={vstack({
        w: 148,
        h: 44
      })}
    >
      <div
        className={hstack({
          gap: 2
        })}
      >
        <Text size="subheading" fontWeight="regular">
          <span style={{ fontWeight: 600 }}>{formattedType}: </span>
          {titleCaseTitle}
        </Text>
        {showVendorRow && (
          <TrainingVendorRow duration="30 minutes" vendors={vendors} />
        )}
      </div>
      {buttonOnClick && (
        <Button
          className={css({
            alignItems: 'center',
            gap: 24,
            p: 4
          })}
          palette="action"
          shape="sharp"
          usage="filled"
          onClick={buttonOnClick}
        >
          {buttonTitle}
        </Button>
      )}
    </div>
  );
};

export default ExamTrainingCard;
