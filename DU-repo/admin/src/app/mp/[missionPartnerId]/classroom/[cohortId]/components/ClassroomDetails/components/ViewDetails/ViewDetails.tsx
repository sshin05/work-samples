import { Edit, Link } from '@cerberus/icons';
import { IconButton, Tag } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { flex } from '@cerberus/styled-system/patterns';
import { DetailCardHeader } from '../DetailCardHeader/DetailCardHeader';
import { DetailCardBody } from '../DetailCardBody/DetailCardBody';
import type { CohortData } from '../../../../cohort.types';
import { DetailSection } from './components/DetailSection';
import { DateDetails } from './components/DateDetails/DateDisplay';

const ICON_SIZE = 16;

type ViewDetailsProps = {
  cohort: CohortData;
  onEdit: () => void;
};

export const ViewDetails = ({ cohort, onEdit }: ViewDetailsProps) => {
  const getLocationDisplay = () => {
    if (!cohort.location) {
      return 'Location is pending.';
    }

    return cohort.location;
  };

  const getDateDetails = () => {
    if (!cohort.meetingDetails) {
      return 'Date details are pending.';
    }

    return cohort.meetingDetails;
  };

  const hasAttachedReportingInstructions = false; // cohort.libraryItems.length > 0;

  return (
    <>
      <DetailCardHeader>
        {hasAttachedReportingInstructions && (
          <Tag shape="square" usage="outlined" gradient="nyx-light">
            <Link size={ICON_SIZE} />
            File Attached
          </Tag>
        )}

        <IconButton
          ariaLabel="Edit Reporting Details"
          size="lg"
          palette="action"
          usage="ghost"
          onClick={onEdit}
          className={css({
            alignSelf: 'start',
            ml: 'auto',
            cursor: 'pointer',
            flexShrink: 0
          })}
        >
          <Edit size={ICON_SIZE} />
        </IconButton>
      </DetailCardHeader>

      <DetailCardBody>
        <div className={flex({ w: 'full' })}>
          <div
            className={css({
              flex: '0 0 50%',
              gap: 4,
              display: 'flex',
              flexDirection: 'column'
            })}
          >
            <DateDetails cohort={cohort} />

            <DetailSection sectionTitle="Date Details">
              {getDateDetails()}
            </DetailSection>

            <DetailSection sectionTitle="Location">
              {getLocationDisplay()}
            </DetailSection>
          </div>

          <div className={css({ flex: '0 0 50%' })}>
            <DetailSection sectionTitle="Additional Information">
              {cohort.meetingDetails}
            </DetailSection>
          </div>
        </div>
      </DetailCardBody>
    </>
  );
};
